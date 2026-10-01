import { NextRequest, NextResponse } from "next/server";
import { mockDatabase, EventRecord } from "../../../lib/mock-database";
import Groq from "groq-sdk";

// Provide a dummy key during build time to prevent Groq from crashing Next.js static analysis
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "dummy_key_for_build" });

// ── EXPANDED TAXONOMY ──────────────────────────────────────────
// Covers all 12 episodes' vocabulary for synonym expansion.
const TAXONOMY: Record<string, string[]> = {
    building: ["building", "buildings", "architecture", "architectural", "city building", "urban building", "structure", "cityscape", "facade", "skyscraper"],
    cafe: ["cafe", "café", "coffee shop", "coffeehouse", "coffee", "latte", "espresso", "barista"],
    restaurant: ["restaurant", "dinner", "dining", "eatery", "food", "meal", "supper"],
    beach: ["beach", "coast", "coastal", "seaside", "shore", "ocean", "sand", "waves"],
    medicine: ["medicine", "medication", "pill", "pills", "tablet", "tablets", "drug", "pharmacy"],
    hotel: ["hotel", "room", "hotel room", "accommodation", "resort", "motel", "lodging", "check-in"],
    airport: ["airport", "terminal", "departure", "arrival", "flight", "plane", "airplane", "luggage", "boarding"],
    mountain: ["mountain", "mountains", "hiking", "trail", "nature", "forest", "viewpoint", "summit", "peak", "scenic", "vista"],
    study: ["study", "studying", "campus", "library", "classroom", "books", "laptop", "college", "school", "class", "university", "learning", "education"],
    car: ["car", "road", "taxi", "highway", "drive", "ride", "transport", "vehicle", "driving"],
    party: ["party", "celebration", "gathering", "birthday", "cake", "candles", "decorations"],
    wedding: ["wedding", "ceremony", "formal", "reception", "bride", "groom", "vows", "nuptials"],
    picnic: ["picnic", "blanket", "outdoor meal", "park lunch"],
    park: ["park", "garden", "grass", "trees", "nature", "green space", "outdoors"],
    mall: ["mall", "shopping", "shopping center", "store", "retail", "shopping mall", "products"],
    market: ["market", "night market", "stalls", "vendors", "bazaar", "festival"],
    crowd: ["crowd", "gathering", "masses", "people", "throng", "multitude", "festival"],
    friends: ["friends", "group", "people", "social", "gathering", "together"],
    food: ["food", "eating", "meal", "dish", "snack", "cuisine"],
    night: ["night", "evening", "dark", "lights", "nighttime", "nocturnal"],
    museum: ["museum", "gallery", "art", "exhibition", "exhibit", "collection"],
    document: ["document", "documents", "prescription", "paperwork", "paper", "form", "records"],
    sunset: ["sunset", "dusk", "golden hour", "sundown", "twilight"],
    home: ["home", "house", "apartment", "living room", "kitchen", "indoor"],
};

const STOP_WORDS = new Set(["we", "were", "went", "to", "at", "the", "a", "an", "in", "on", "and", "our", "my", "of", "for", "with", "from", "was", "is", "it", "this", "that", "there", "then", "after", "before", "arrived", "visited", "checked", "into", "through", "we're", "we've", "they", "some", "got", "had", "did", "out", "back", "are", "am", "i", "you", "he", "she", "by", "up", "down", "over", "under"]);

function normalizeQuery(input: string): string[] {
    const q = input.toLowerCase().trim();
    const concepts = new Set<string>();
    
    // Remove basic punctuation but preserve accents/unicode
    const cleanQ = q.replace(/[.,?!'";:()[\]]/g, '');
    if (cleanQ && cleanQ.length > 3) concepts.add(cleanQ);

    const tokens = cleanQ.split(/\s+/).filter(t => t.length > 1 && !STOP_WORDS.has(t));
    for (const t of tokens) concepts.add(t);

    // Handle plurals: "cafes" -> "cafe", "buildings" -> "building"
    for (const t of tokens) {
        if (t.endsWith('s') && t.length > 3) concepts.add(t.slice(0, -1));
        if (t.endsWith('es') && t.length > 4) concepts.add(t.slice(0, -2));
        if (t.endsWith('ies') && t.length > 5) concepts.add(t.slice(0, -3) + 'y');
    }

    for (const [key, synonyms] of Object.entries(TAXONOMY)) {
        let matchedKey = false;
        if (tokens.includes(key) || q.includes(key) || tokens.some(t => t.length > 3 && (t.startsWith(key) || key.startsWith(t)))) {
            matchedKey = true;
        }

        const matchedSynonyms = synonyms.filter(s => {
            const sTokens = s.split(/\s+/);
            if (sTokens.length === 1) {
                return tokens.includes(s) || tokens.some(t => t === s || (t.length > 3 && (t.startsWith(s) || s.startsWith(t))));
            }
            return q.includes(s);
        });

        if (matchedKey || matchedSynonyms.length > 0) {
            concepts.add(key);
            matchedSynonyms.forEach(s => concepts.add(s));
            if (matchedKey && tokens.length === 1) {
                synonyms.forEach(s => concepts.add(s));
            }
        }
    }

    return Array.from(concepts).filter(Boolean);
}

// Exact-or-word match helper
function fieldMatch(field: string, concept: string): boolean {
    const f = field.toLowerCase();
    if (f === concept) return true;
    const words = f.split(/[\s,._-]+/);
    return words.includes(concept);
}

function findBestCluster(query: string, allEvents: EventRecord[], preferredEpisodeId?: string): EventRecord | null {
    if (!query) return null;
    const qList = normalizeQuery(query);
    if (qList.length === 0) return null;

    let bestEvent = null;
    let maxScore = 0;

    for (const c of allEvents) {
        if (preferredEpisodeId && c.episodeId !== preferredEpisodeId) continue;
        let score = 0;
        
        qList.forEach(q => {
            if (fieldMatch(c.title, q)) score += 5;
            else if (q.length > 3 && c.title.toLowerCase().includes(q)) score += 3;
            
            if (c.concepts.some((sc: string) => fieldMatch(sc, q))) score += 1;
        });

        if (c.title.toLowerCase().includes(query.toLowerCase().trim())) {
            score += 10;
        }

        if (score > maxScore) {
            maxScore = score;
            bestEvent = c;
        }
    }

    return bestEvent;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { query: uiTarget, before: uiBefore, after: uiAfter, notConstraints: uiNot } = body;

        const structuredQuery = {
            target: uiTarget || "",
            before: uiBefore || "",
            after: uiAfter || "",
            negativeConstraints: uiNot || []
        };

        // Groq NLP parsing for complex natural language queries
        if (process.env.GROQ_API_KEY && (uiTarget && uiTarget.length > 10 && !uiBefore && !uiAfter)) {
            try {
                const completion = await groq.chat.completions.create({
                    messages: [
                        { role: "system", content: "You are a JSON query parser. Extract { target: string, before: string, after: string, negativeConstraints: string[] } from the user's natural language memory query. Handle uncertainty appropriately but format strictly as JSON." },
                        { role: "user", content: uiTarget }
                    ],
                    model: "llama-3.1-8b-instant",
                    response_format: { type: "json_object" }
                });
                const extracted = JSON.parse(completion.choices[0].message.content || "{}");
                if (extracted.target) structuredQuery.target = extracted.target;
                if (extracted.before) structuredQuery.before = extracted.before;
                if (extracted.after) structuredQuery.after = extracted.after;
                if (extracted.negativeConstraints) structuredQuery.negativeConstraints = extracted.negativeConstraints;
            } catch {
                console.error("Groq parsing failed, falling back to raw fields.");
            }
        }

        if (!structuredQuery.target && !structuredQuery.before && !structuredQuery.after && structuredQuery.negativeConstraints.length === 0) {
            return NextResponse.json({ type: "results", message: "Please provide a search clue.", results: [] });
        }

        const { images, events } = mockDatabase;

        // ── BOUNDARY RESOLUTION ──────────────────────────────
        let beforeCluster: EventRecord | null = null;
        let afterCluster: EventRecord | null = null;

        if (structuredQuery.before) {
            beforeCluster = findBestCluster(structuredQuery.before, events);
        }

        if (structuredQuery.after) {
            afterCluster = findBestCluster(structuredQuery.after, events);
        }

        // Enforce same-episode and chronological bounds
        if (beforeCluster && afterCluster) {
            const bTime = new Date(beforeCluster.endTime).getTime();
            const aTime = new Date(afterCluster.startTime).getTime();
            
            if (beforeCluster.episodeId !== afterCluster.episodeId || bTime > aTime) {
                // Try finding a valid 'after' that actually occurs AFTER 'before'
                const altAfter = findBestCluster(structuredQuery.after, events.filter(e => 
                    e.episodeId === beforeCluster!.episodeId && new Date(e.startTime).getTime() > bTime
                ));
                if (altAfter) {
                    afterCluster = altAfter;
                } else {
                    // Try finding a valid 'before' that actually occurs BEFORE 'after'
                    const altBefore = findBestCluster(structuredQuery.before, events.filter(e => 
                        e.episodeId === afterCluster!.episodeId && new Date(e.endTime).getTime() < aTime
                    ));
                    if (altBefore) beforeCluster = altBefore;
                }
            }
        }

        // CRITICAL: If 'before' event is found, the target happened AFTER it -> windowStart = beforeCluster.endTime
        //           If 'after' event is found, the target happened BEFORE it -> windowEnd = afterCluster.startTime
        const windowStart = beforeCluster ? new Date(beforeCluster.endTime).getTime() : 0;
        const windowEnd = afterCluster ? new Date(afterCluster.startTime).getTime() : Infinity;
        const boundedEpisodeId = (beforeCluster && afterCluster && beforeCluster.episodeId === afterCluster.episodeId)
            ? beforeCluster.episodeId : null;

        const hasTarget = structuredQuery.target.trim().length > 0;
        const hasBoundary = !!(beforeCluster || afterCluster);
        const targetConcepts = hasTarget ? normalizeQuery(structuredQuery.target) : [];

        // ── SCORING ──────────────────────────────────────────
        const rankedCandidates = images.map(img => {
            const reasons: string[] = [];
            const conflicts: string[] = [];
            let semanticScore = 0, sceneScore = 0, objectScore = 0, ocrScore = 0;
            let contextScore = 0, boundaryScore = 0, episodeCoherenceScore = 0, penalty = 0;
            let maxScore = 0;

            if (hasTarget) {
                // Match against canonicalConcepts (primary), groundTruthConcepts, description, objects
                let matchedConcept = "";
                const canonicalMatch = targetConcepts.some(c => {
                    const m = img.search.canonicalConcepts.some(cc => fieldMatch(cc, c));
                    if (m) { matchedConcept = img.search.canonicalConcepts.find(cc => fieldMatch(cc, c)) || c; }
                    return m;
                });

                let matchedGt = "";
                const groundTruthMatch = !canonicalMatch && targetConcepts.some(c =>
                    img.groundTruthConcepts.some(gt => {
                        if (fieldMatch(gt, c)) { matchedGt = gt; return true; }
                        return false;
                    })
                );

                let matchedDesc = "";
                const descMatch = !canonicalMatch && !groundTruthMatch && targetConcepts.some(c => {
                    if (img.description && img.description.toLowerCase().split(/\s+/).includes(c)) {
                        matchedDesc = c;
                        return true;
                    }
                    return false;
                });

                let matchedScene = "";
                const sceneMatch = targetConcepts.some(c => {
                    if (img.scene && img.scene.primary && fieldMatch(img.scene.primary, c)) { matchedScene = img.scene.primary; return true; }
                    return img.scene && img.scene.secondary && img.scene.secondary.some(s => {
                        if (fieldMatch(s, c)) { matchedScene = s; return true; }
                        return false;
                    });
                });

                let matchedObject = "";
                const objectMatch = targetConcepts.some(c =>
                    img.objects && img.objects.some(o => {
                        if (fieldMatch(o, c)) { matchedObject = o; return true; }
                        return false;
                    })
                );

                // Scoring
                let semPoints = 0;
                if (canonicalMatch) {
                    semPoints = 1.0;
                    reasons.push(`✓ Confirmed in memory: ${matchedConcept}`);
                } else if (groundTruthMatch) {
                    semPoints = 0.85;
                    reasons.push(`✓ Visual match: ${matchedGt}`);
                } else if (descMatch) {
                    semPoints = 0.6;
                    reasons.push(`✓ Context match: ${matchedDesc}`);
                }

                const scenePoints = sceneMatch ? 1.0 : 0;
                if (sceneMatch) reasons.push(`✓ Scene: ${matchedScene}`);

                const objectPoints = objectMatch ? 1.0 : 0;
                if (objectMatch) reasons.push(`✓ Object: ${matchedObject}`);

                if (hasBoundary) {
                    semanticScore = semPoints * 0.25; maxScore += 0.25;
                    sceneScore = scenePoints * 0.10; maxScore += 0.10;
                    objectScore = objectPoints * 0.10; maxScore += 0.10;
                } else {
                    semanticScore = semPoints * 0.35; maxScore += 0.35;
                    sceneScore = scenePoints * 0.25; maxScore += 0.25;
                    objectScore = objectPoints * 0.20; maxScore += 0.20;
                    contextScore = (canonicalMatch || groundTruthMatch ? 1.0 : 0) * 0.10; maxScore += 0.10;
                    ocrScore = 0; maxScore += 0.10;
                }

                if (hasTarget && semPoints === 0 && scenePoints === 0 && objectPoints === 0) {
                    penalty += 0.8;
                    conflicts.push(`✗ Does not match search target`);
                }
            }

            if (hasBoundary) {
                const imgTime = new Date(img.timestamp.value).getTime();
                if (imgTime >= windowStart && imgTime <= windowEnd) {
                    boundaryScore = 0.25;
                    reasons.push(`✓ Within reconstructed time window`);
                } else {
                    conflicts.push(`✗ Outside chronological boundaries`);
                    penalty += 0.50;
                }
                maxScore += 0.25;

                if (boundedEpisodeId) {
                    if (img.episode.episodeId === boundedEpisodeId) {
                        episodeCoherenceScore = 0.15;
                        reasons.push(`✓ Same episode: ${img.episode.episodeName}`);
                    }
                    maxScore += 0.15;
                }
            }

            // ── NEGATIVE CONSTRAINTS ─────────────────────────
            structuredQuery.negativeConstraints.forEach((constraint: string) => {
                const val = constraint.toLowerCase();
                let conflict = false;

                if ((val.includes("indoor") || val.includes("inside")) && img.environment.indoorOutdoor === "indoor") conflict = true;
                if ((val.includes("outdoor") || val.includes("outside")) && img.environment.indoorOutdoor === "outdoor") conflict = true;
                if (val.includes("night") && img.environment.timeOfDay === "night") conflict = true;
                if (val.includes("day") && ['morning', 'afternoon'].includes(img.environment.timeOfDay)) conflict = true;

                const negativeConcepts = normalizeQuery(val);
                if (negativeConcepts.some(c => img.search.canonicalConcepts.some(cc => fieldMatch(cc, c)))) {
                    conflict = true;
                }

                if (conflict) {
                    penalty += 1.0;
                    conflicts.push(`✗ Conflicts with: Not ${val}`);
                }
            });

            // Dynamic Normalization
            const rawScore = semanticScore + sceneScore + objectScore + ocrScore + contextScore + boundaryScore + episodeCoherenceScore;
            const normalizedScore = maxScore > 0 ? (rawScore / maxScore) : 0;
            const finalScore = normalizedScore - penalty;

            return {
                img,
                score: finalScore,
                reasons,
                conflicts,
                breakdown: { semanticScore, sceneScore, objectScore, ocrScore, contextScore, boundaryScore, episodeCoherenceScore, penalty, normalizedScore, maxScore }
            };
        });

        const sortedCandidates = rankedCandidates.sort((a, b) => b.score - a.score);
        let finalResults = sortedCandidates.filter(c => c.score >= 0.38).slice(0, 12);

        let wrongMemoryMessage = null;
        if (finalResults.length === 0 && sortedCandidates.length > 0) {
            if (hasTarget && hasBoundary) {
                wrongMemoryMessage = "No photo matches every clue. One of the remembered details may be inaccurate. Showing best partial matches.";
                finalResults = sortedCandidates.slice(0, 4);
            } else if (hasTarget) {
                wrongMemoryMessage = `No strong match found for '${structuredQuery.target}'.`;
                finalResults = sortedCandidates.slice(0, 4);
            }
        }

        const formattedResults = finalResults.map((c) => {
            let confidence = "Weak";
            if (c.score >= 0.72) confidence = "Strong";
            else if (c.score >= 0.55) confidence = "Good";
            else if (c.score >= 0.38) confidence = "Possible";

            return {
                // Spread the image record for backward compatibility
                id: c.img.id,
                filename: c.img.filename,
                filepath: c.img.filepath,
                highResUrl: c.img.highResUrl,
                description: c.img.description,
                scene: c.img.scene,
                objects: c.img.objects,
                environment: c.img.environment,
                timestamp: c.img.timestamp.value,
                episode: c.img.episode,
                event: c.img.event,
                visual: c.img.visual,
                search: c.img.search,
                sequence: c.img.sequence,
                matchReasons: c.reasons,
                conflictReasons: c.conflicts,
                confidence,
                semanticCaption: c.reasons[0] || `Match score: ${(c.score * 100).toFixed(0)}%`,
                debugScore: c.score,
                debugBreakdown: c.breakdown
            };
        });

        return NextResponse.json({
            type: "results",
            message: `Memory reconstructed! Found ${formattedResults.length} matches.`,
            wrongMemoryMessage,
            results: formattedResults,
            boundaries: {
                before: beforeCluster ? beforeCluster.title : null,
                after: afterCluster ? afterCluster.title : null
            },
            debug: {
                parsedQuery: structuredQuery,
                windowStart,
                windowEnd,
                datasetVersion: mockDatabase.datasetVersion,
            }
        });

    } catch (error) {
        console.error("Search API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
