// ============================================================
// GROUND-TRUTH DATABASE — memory-demo-v2-720
// ============================================================
// 12 episodes × 6 events × 10 images = 720 total images
//
// Every image has:
//   - deterministic timestamp (no runtime randomness)
//   - rich visual metadata (description, scene, objects, activities)
//   - canonical search concepts + synonyms
//   - event/episode relationships (previous/next links)
//   - sequence indices (imageOrderInEvent, globalSequenceIndex)
//   - indoor/outdoor, timeOfDay, peopleCount, gatheringType
//
// datasetVersion: "memory-demo-v2-720"
// ============================================================

import { getPoolImageUrl } from "./visual-pools";

// ── INTERFACES ─────────────────────────────────────────────────

export interface ImageRecord {
    id: string;
    filename: string;
    filepath: string;
    highResUrl: string;

    visual: {
        description: string;
        primaryScene: string;
        secondaryScenes: string[];
        indoorOutdoor: "indoor" | "outdoor" | "mixed" | "unknown";
        timeOfDay: "morning" | "afternoon" | "evening" | "night" | "unknown";
        peopleCount: number;
        gatheringType: "solo" | "pair" | "friends" | "family" | "class" | "crowd" | "party" | "formal-event" | "public-gathering" | "unknown";
        objects: string[];
        activities: string[];
    };

    search: {
        canonicalConcepts: string[];
        synonyms: string[];
    };

    episode: {
        episodeId: string;
        episodeName: string;
        episodeOrder: number;
    };

    event: {
        eventId: string;
        eventName: string;
        eventOrder: number;
    };

    sequence: {
        imageOrderInEvent: number;
        globalSequenceIndex: number;
    };

    timestamp: {
        value: string;
        source: "demo-curated";
    };

    relationships: {
        previousImageId: string | null;
        nextImageId: string | null;
        previousEventId: string | null;
        nextEventId: string | null;
    };

    quality: {
        groundTruthValidated: boolean;
        visualMetadataMatch: boolean;
    };

    // Legacy compatibility fields (used by existing search route)
    scene: { primary: string; secondary: string[] };
    objects: string[];
    environment: {
        indoorOutdoor: "indoor" | "outdoor" | "mixed" | "unknown";
        timeOfDay: "morning" | "afternoon" | "evening" | "night" | "unknown";
        weather: string;
    };
    semanticConcepts: string[];
    groundTruthConcepts: string[];
    inferredConcepts: { value: string; confidence: number }[];
    description: string;
    // Flat timestamp for backward compat
    timestampFlat: string;
    confidence: { visual: number; metadata: number };
    boundary: {
        previousEventId: string | null;
        nextEventId: string | null;
    };
}

export interface EventRecord {
    eventId: string;
    episodeId: string;
    order: number;
    title: string;
    startTime: string;
    endTime: string;
    concepts: string[];
    previousEventId: string | null;
    nextEventId: string | null;
    imageIds: string[];
}

export interface EpisodeRecord {
    episodeId: string;
    title: string;
    startTime: string;
    endTime: string;
    eventIds: string[];
}

// ── EPISODE DEFINITIONS ────────────────────────────────────────

interface ImageDef {
    desc: string;
    objects: string[];
    activities: string[];
    peopleCount: number;
    gatheringType: ImageRecord["visual"]["gatheringType"];
}

interface EventDef {
    name: string;
    pool: string;          // visual pool key
    primaryScene: string;
    secondaryScenes: string[];
    io: ImageRecord["visual"]["indoorOutdoor"];
    tod: ImageRecord["visual"]["timeOfDay"];
    concepts: string[];
    synonyms: string[];
    startHour: number;
    startMin: number;
    images: ImageDef[];
}

interface EpisodeDef {
    id: string;
    name: string;
    date: string;  // YYYY-MM-DD
    events: EventDef[];
}

const EPISODES: EpisodeDef[] = [
    // ════════════════════════════════════════════════════════════
    // EPISODE 01 — COASTAL / BEACH DAY
    // ════════════════════════════════════════════════════════════
    {
        id: "ep01_coastal", name: "Coastal / Beach Day", date: "2021-03-15",
        events: [
            {
                name: "Hotel Morning", pool: "hotel_room", primaryScene: "hotel", secondaryScenes: ["room", "interior"],
                io: "indoor", tod: "morning", concepts: ["hotel", "room", "morning", "indoor", "accommodation"],
                synonyms: ["hotel room", "resort", "accommodation"], startHour: 9, startMin: 0,
                images: [{ desc: "Hotel room with unmade bed and morning light through curtains", objects: ["bed", "curtains", "window"], activities: ["waking up"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "View from hotel window showing coastal town", objects: ["window", "buildings", "sky"], activities: ["looking out"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Breakfast tray with coffee and toast on hotel table", objects: ["coffee", "toast", "tray", "table"], activities: ["eating", "breakfast"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Packed bags sitting by hotel room door", objects: ["bags", "luggage", "door"], activities: ["packing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Hotel hallway with room numbers on doors", objects: ["hallway", "doors", "carpet"], activities: ["walking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Hotel exterior with entrance awning", objects: ["building", "entrance", "awning"], activities: ["leaving"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Friends gathered in hotel lobby with bags", objects: ["lobby", "bags", "people"], activities: ["waiting", "gathering"], peopleCount: 3, gatheringType: "friends" }
                ]
            },
            {
                name: "Travel to Beach", pool: "car_road", primaryScene: "transport", secondaryScenes: ["car", "road"],
                io: "mixed", tod: "morning", concepts: ["car", "road", "transport", "travel", "driving"],
                synonyms: ["ride", "taxi", "drive", "vehicle"], startHour: 10, startMin: 5,
                images: [{ desc: "Car dashboard view of coastal road ahead", objects: ["dashboard", "road", "windshield"], activities: ["driving"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Taxi on a sunny road with trees", objects: ["taxi", "road", "trees"], activities: ["riding"], peopleCount: 2, gatheringType: "pair" },
                    { desc: "Road stretching toward coastline", objects: ["road", "coast", "sky"], activities: ["driving"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "View through car window of passing scenery", objects: ["window", "scenery", "trees"], activities: ["traveling"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Coastal road winding along cliffs", objects: ["road", "cliffs", "ocean"], activities: ["driving"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Friends in car backseat smiling", objects: ["car interior", "seatbelts"], activities: ["laughing", "traveling"], peopleCount: 3, gatheringType: "friends" },
                    { desc: "Passing scenery of small coastal village", objects: ["village", "houses", "road"], activities: ["passing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Car interior with bags on back seat", objects: ["car", "bags", "seats"], activities: ["traveling"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Roadside view of hills and ocean", objects: ["hills", "ocean", "road"], activities: ["stopping"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Arrival parking area near beach", objects: ["parking", "cars", "sign"], activities: ["arriving", "parking"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
            {
                name: "Beach", pool: "beach", primaryScene: "beach", secondaryScenes: ["ocean", "coast", "sand"],
                io: "outdoor", tod: "afternoon", concepts: ["beach", "ocean", "coast", "sand", "waves", "shore", "seaside", "outdoor"],
                synonyms: ["seaside", "shore", "coast", "coastline"], startHour: 11, startMin: 10,
                images: [{ desc: "Wide sandy beach with waves crashing on shore", objects: ["sand", "waves", "ocean"], activities: ["walking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Ocean waves with horizon in background", objects: ["ocean", "waves", "horizon"], activities: ["watching"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Footprints in wet sand near water edge", objects: ["sand", "footprints", "water"], activities: ["walking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Friends standing together on beach", objects: ["people", "beach", "sky"], activities: ["posing", "standing"], peopleCount: 4, gatheringType: "friends" },
                    { desc: "Waves rolling onto sandy shoreline", objects: ["waves", "sand", "foam"], activities: ["watching"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Beach umbrellas and towels on sand", objects: ["umbrellas", "towels", "sand"], activities: ["relaxing"], peopleCount: 2, gatheringType: "friends" },
                    { desc: "Person walking along waterline at beach", objects: ["person", "water", "sand"], activities: ["walking"], peopleCount: 1, gatheringType: "solo" }
                ]
            },
            {
                name: "Town Walking", pool: "city_street", primaryScene: "town", secondaryScenes: ["street", "shops"],
                io: "outdoor", tod: "afternoon", concepts: ["town", "street", "walking", "shops", "architecture", "outdoor"],
                synonyms: ["village", "pedestrian", "stroll"], startHour: 16, startMin: 0,
                images: [{ desc: "Narrow town street with colorful buildings", objects: ["street", "buildings", "cobblestones"], activities: ["walking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Small shops along pedestrian street", objects: ["shops", "signs", "street"], activities: ["browsing"], peopleCount: 2, gatheringType: "friends" },
                    { desc: "Friends walking through town center", objects: ["people", "street", "buildings"], activities: ["walking", "exploring"], peopleCount: 3, gatheringType: "friends" },
                    { desc: "Architecture detail of old town building", objects: ["building", "facade", "windows"], activities: ["photographing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Shop signs and awnings on local street", objects: ["signs", "awnings", "shops"], activities: ["browsing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Group photo in front of town fountain", objects: ["fountain", "people", "square"], activities: ["posing"], peopleCount: 4, gatheringType: "friends" },
                    { desc: "Local street with people and cafes", objects: ["street", "cafes", "tables"], activities: ["walking"], peopleCount: 3, gatheringType: "public-gathering" },
                    { desc: "Pedestrian area with benches and trees", objects: ["benches", "trees", "path"], activities: ["resting"], peopleCount: 1, gatheringType: "solo" }
                ]
            },
            {
                name: "Indoor Café", pool: "cafe", primaryScene: "cafe", secondaryScenes: ["coffee shop", "restaurant"],
                io: "indoor", tod: "evening", concepts: ["cafe", "coffee", "indoor", "afternoon", "friends", "food"],
                synonyms: ["café", "coffee shop", "coffeehouse"], startHour: 17, startMin: 15,
                images: [{ desc: "Café entrance with sign and outdoor menu board", objects: ["sign", "door", "menu board"], activities: ["entering"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Interior of cozy café with wooden tables", objects: ["tables", "chairs", "counter"], activities: ["sitting"], peopleCount: 2, gatheringType: "friends" },
                    { desc: "Close-up of coffee cup and saucer on table", objects: ["coffee", "cup", "saucer", "table"], activities: ["drinking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Table with pastries and coffee for two", objects: ["table", "pastries", "coffee", "plates"], activities: ["eating", "drinking"], peopleCount: 0, gatheringType: "pair" },
                    { desc: "Friends chatting at café table", objects: ["people", "table", "cups"], activities: ["talking", "drinking"], peopleCount: 3, gatheringType: "friends" },
                    { desc: "Food plate with sandwich and salad at café", objects: ["sandwich", "salad", "plate"], activities: ["eating"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Café menu on wall behind counter", objects: ["menu", "counter", "drinks"], activities: ["ordering"], peopleCount: 1, gatheringType: "solo" }
                ]
            },
            {
                name: "Dinner", pool: "restaurant", primaryScene: "restaurant", secondaryScenes: ["dinner", "dining"],
                io: "indoor", tod: "evening", concepts: ["restaurant", "dinner", "food", "dining", "evening", "indoor"],
                synonyms: ["eatery", "dining", "supper"], startHour: 19, startMin: 0,
                images: [{ desc: "Restaurant exterior with warm lights at evening", objects: ["building", "lights", "sign"], activities: ["arriving"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Dinner table set with plates and glasses", objects: ["table", "plates", "glasses", "candles"], activities: ["dining"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
        ]
    },

    // ════════════════════════════════════════════════════════════
    // EPISODE 02 — CITY / ARCHITECTURE DAY
    // ════════════════════════════════════════════════════════════
    {
        id: "ep02_city", name: "City / Architecture Day", date: "2021-10-11",
        events: [
            {
                name: "Hotel Leaving", pool: "hotel_room", primaryScene: "hotel", secondaryScenes: ["lobby", "morning"],
                io: "indoor", tod: "morning", concepts: ["hotel", "morning", "leaving", "lobby"],
                synonyms: ["accommodation", "check out"], startHour: 8, startMin: 30,
                images: [{ desc: "Hotel room with packed suitcase on bed", objects: ["suitcase", "bed", "room"], activities: ["packing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Hotel lobby with marble floor", objects: ["lobby", "floor", "furniture"], activities: ["waiting"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Elevator doors in hotel hallway", objects: ["elevator", "hallway", "mirror"], activities: ["waiting"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Coffee cup at hotel breakfast area", objects: ["coffee", "cup", "table"], activities: ["drinking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "View from hotel window of city skyline", objects: ["window", "skyline", "buildings"], activities: ["viewing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Hotel entrance with revolving door", objects: ["entrance", "door", "building"], activities: ["exiting"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Friends meeting in hotel lobby", objects: ["people", "lobby", "bags"], activities: ["greeting", "gathering"], peopleCount: 3, gatheringType: "friends" }
                ]
            },
            {
                name: "City Walking", pool: "city_street", primaryScene: "city", secondaryScenes: ["street", "urban"],
                io: "outdoor", tod: "morning", concepts: ["city", "street", "urban", "walking", "outdoor"],
                synonyms: ["city walk", "downtown", "urban exploration"], startHour: 10, startMin: 0,
                images: [{ desc: "Wide city street with tall buildings on both sides", objects: ["street", "buildings", "cars"], activities: ["walking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Pedestrians crossing city intersection", objects: ["crosswalk", "people", "traffic light"], activities: ["crossing"], peopleCount: 5, gatheringType: "public-gathering" },
                    { desc: "City sidewalk with shops and trees", objects: ["sidewalk", "shops", "trees"], activities: ["strolling"], peopleCount: 2, gatheringType: "friends" },
                    { desc: "Urban street corner with traffic", objects: ["corner", "traffic", "buildings"], activities: ["waiting"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Friends walking through city center", objects: ["people", "street", "buildings"], activities: ["walking", "talking"], peopleCount: 3, gatheringType: "friends" },
                    { desc: "City park between buildings", objects: ["park", "benches", "buildings"], activities: ["resting"], peopleCount: 2, gatheringType: "friends" },
                    { desc: "Street vendor cart on city sidewalk", objects: ["cart", "vendor", "sidewalk"], activities: ["browsing"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Looking up at tall buildings from street", objects: ["buildings", "sky", "windows"], activities: ["looking up"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
            {
                name: "Architecture", pool: "buildings", primaryScene: "architecture", secondaryScenes: ["buildings", "urban", "city"],
                io: "outdoor", tod: "afternoon", concepts: ["building", "buildings", "architecture", "city", "urban", "structure", "facade", "skyscraper", "outdoor"],
                synonyms: ["architectural", "city building", "urban building", "cityscape", "landmark"], startHour: 12, startMin: 0,
                images: [{ desc: "Modern glass skyscraper reflecting sky", objects: ["skyscraper", "glass", "sky"], activities: ["photographing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Historic stone building facade with columns", objects: ["building", "columns", "stone"], activities: ["admiring"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Row of different architectural building facades", objects: ["buildings", "facades", "windows"], activities: ["walking past"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Modern and historic buildings side by side", objects: ["buildings", "contrast", "street"], activities: ["comparing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "City skyline showing multiple tall buildings", objects: ["skyline", "buildings", "sky"], activities: ["viewing"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
            {
                name: "Landmark Square", pool: "landmark", primaryScene: "landmark", secondaryScenes: ["square", "monument"],
                io: "outdoor", tod: "afternoon", concepts: ["landmark", "monument", "square", "public", "outdoor"],
                synonyms: ["plaza", "monument", "statue"], startHour: 14, startMin: 30,
                images: [{ desc: "Large public square with fountain in center", objects: ["square", "fountain", "people"], activities: ["sightseeing"], peopleCount: 5, gatheringType: "public-gathering" },
                    { desc: "Monument statue in public square", objects: ["monument", "statue", "pedestal"], activities: ["photographing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Historic landmark building with clock tower", objects: ["tower", "clock", "building"], activities: ["admiring"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Friends posing in front of landmark", objects: ["people", "landmark", "camera"], activities: ["posing", "smiling"], peopleCount: 4, gatheringType: "friends" },
                    { desc: "Wide view of public square with surrounding buildings", objects: ["square", "buildings", "sky"], activities: ["exploring"], peopleCount: 3, gatheringType: "public-gathering" },
                    { desc: "Close-up of carved detail on monument", objects: ["carving", "stone", "detail"], activities: ["photographing"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
            {
                name: "Museum Gallery", pool: "buildings", primaryScene: "museum", secondaryScenes: ["gallery", "exhibition"],
                io: "indoor", tod: "afternoon", concepts: ["museum", "gallery", "art", "exhibition", "indoor", "culture"],
                synonyms: ["art gallery", "exhibit", "collection"], startHour: 16, startMin: 0,
                images: [{ desc: "Museum entrance with glass doors", objects: ["entrance", "doors", "sign"], activities: ["entering"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Gallery room with paintings on walls", objects: ["paintings", "walls", "frames"], activities: ["viewing"], peopleCount: 2, gatheringType: "friends" },
                    { desc: "Sculpture display in museum hall", objects: ["sculpture", "pedestal", "lighting"], activities: ["admiring"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Person looking at large painting", objects: ["painting", "person", "wall"], activities: ["studying"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Museum hallway with arched ceiling", objects: ["hallway", "arches", "ceiling"], activities: ["walking"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
            {
                name: "Evening City Café", pool: "cafe", primaryScene: "cafe", secondaryScenes: ["evening", "city"],
                io: "indoor", tod: "evening", concepts: ["cafe", "coffee", "evening", "city", "indoor"],
                synonyms: ["coffee shop", "coffeehouse"], startHour: 18, startMin: 30,
                images: [{ desc: "City café with large window overlooking street", objects: ["window", "street", "tables"], activities: ["sitting"], peopleCount: 2, gatheringType: "friends" },
                    { desc: "Latte art in coffee cup on marble counter", objects: ["coffee", "cup", "counter"], activities: ["drinking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Evening café atmosphere with warm lights", objects: ["lights", "tables", "people"], activities: ["socializing"], peopleCount: 3, gatheringType: "friends" },
                    { desc: "Cake and coffee on café table", objects: ["cake", "coffee", "plate"], activities: ["eating"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Friends talking over coffee at evening", objects: ["people", "coffee", "table"], activities: ["talking", "drinking"], peopleCount: 3, gatheringType: "friends" },
                    { desc: "Café interior showing bookshelf and seating", objects: ["bookshelf", "seats", "lamps"], activities: ["reading"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Barista making espresso at machine", objects: ["espresso machine", "barista", "counter"], activities: ["making coffee"], peopleCount: 1, gatheringType: "solo" }
                ]
            },
        ]
    },

    // ════════════════════════════════════════════════════════════
    // EPISODE 03 — MEDICAL / MEDICINE DAY
    // ════════════════════════════════════════════════════════════
    {
        id: "ep03_medical", name: "Medical / Medicine Day", date: "2022-02-06",
        events: [
            {
                name: "Home Before Appointment", pool: "home_interior", primaryScene: "home", secondaryScenes: ["morning", "preparation"],
                io: "indoor", tod: "morning", concepts: ["home", "indoor", "morning", "preparation"],
                synonyms: ["house", "apartment"], startHour: 8, startMin: 0,
                images: [{ desc: "Kitchen counter with morning coffee", objects: ["kitchen", "coffee", "counter"], activities: ["preparing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Living room with coat draped over chair", objects: ["chair", "coat", "room"], activities: ["preparing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Phone on table showing appointment reminder", objects: ["phone", "table", "screen"], activities: ["checking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Bathroom mirror with toiletries", objects: ["mirror", "toiletries", "shelf"], activities: ["getting ready"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
            {
                name: "Travel to Clinic", pool: "car_road", primaryScene: "transport", secondaryScenes: ["road", "city"],
                io: "outdoor", tod: "morning", concepts: ["car", "road", "transport", "clinic", "travel"],
                synonyms: ["ride", "drive", "commute"], startHour: 9, startMin: 30,
                images: [{ desc: "Car on city street heading to medical area", objects: ["car", "street", "buildings"], activities: ["driving"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "View of road from passenger window", objects: ["road", "window", "buildings"], activities: ["riding"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Traffic at city intersection", objects: ["traffic", "cars", "lights"], activities: ["waiting"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Parking lot near medical complex", objects: ["parking", "cars", "building"], activities: ["parking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Sidewalk near clinic entrance", objects: ["sidewalk", "entrance", "sign"], activities: ["walking"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Bus stop near hospital area", objects: ["bus stop", "street", "buildings"], activities: ["arriving"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Medical complex visible from street", objects: ["buildings", "street", "sign"], activities: ["approaching"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Road with directional hospital signs", objects: ["road", "signs", "directions"], activities: ["driving"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Crosswalk near medical buildings", objects: ["crosswalk", "buildings", "people"], activities: ["crossing"], peopleCount: 2, gatheringType: "pair" },
                    { desc: "Arrival at clinic building entrance", objects: ["entrance", "building", "door"], activities: ["arriving"], peopleCount: 1, gatheringType: "solo" }
                ]
            },
            {
                name: "Clinic / Doctor", pool: "clinic", primaryScene: "clinic", secondaryScenes: ["doctor", "hospital", "medical"],
                io: "indoor", tod: "morning", concepts: ["clinic", "doctor", "hospital", "medical", "indoor", "health"],
                synonyms: ["doctor's office", "medical center", "health center"], startHour: 10, startMin: 30,
                images: [{ desc: "Clinic waiting room with chairs", objects: ["chairs", "waiting room", "magazines"], activities: ["waiting"], peopleCount: 2, gatheringType: "unknown" },
                    { desc: "Reception desk at medical clinic", objects: ["desk", "reception", "computer"], activities: ["checking in"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Hallway in medical facility", objects: ["hallway", "doors", "floor"], activities: ["walking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Medical examination room", objects: ["examination table", "equipment", "room"], activities: ["waiting"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Doctor's desk with stethoscope", objects: ["desk", "stethoscope", "papers"], activities: ["consulting"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Medical charts on wall", objects: ["charts", "wall", "posters"], activities: ["reading"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Blood pressure monitor on desk", objects: ["monitor", "desk", "equipment"], activities: ["measuring"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Patient information form on clipboard", objects: ["clipboard", "form", "pen"], activities: ["filling out"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Medical office window with blinds", objects: ["window", "blinds", "office"], activities: ["consulting"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
            {
                name: "Prescription Documents", pool: "documents", primaryScene: "documents", secondaryScenes: ["prescription", "medical"],
                io: "indoor", tod: "afternoon", concepts: ["prescription", "document", "medical", "paper", "indoor"],
                synonyms: ["paperwork", "medical documents", "records"], startHour: 12, startMin: 0,
                images: [{ desc: "Prescription paper on desk", objects: ["prescription", "paper", "desk"], activities: ["reading"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Medical report in folder", objects: ["report", "folder", "documents"], activities: ["reviewing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Lab test results printout", objects: ["printout", "results", "paper"], activities: ["reading"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Stack of medical documents", objects: ["documents", "stack", "table"], activities: ["organizing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Insurance form being filled", objects: ["form", "pen", "table"], activities: ["writing"], peopleCount: 1, gatheringType: "solo" },

                    { desc: "Medical card and documents on counter", objects: ["card", "documents", "counter"], activities: ["organizing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Hand holding appointment card", objects: ["card", "hand", "text"], activities: ["holding"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Documents in clear plastic folder", objects: ["folder", "documents", "plastic"], activities: ["carrying"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Desk with organized medical paperwork", objects: ["desk", "paperwork", "pens"], activities: ["reviewing"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
            {
                name: "Pharmacy / Medicine", pool: "medicine", primaryScene: "pharmacy", secondaryScenes: ["medicine", "medication"],
                io: "indoor", tod: "afternoon", concepts: ["pharmacy", "medicine", "medication", "pill", "tablet", "prescription", "indoor"],
                synonyms: ["drugstore", "pills", "tablets", "drug", "medication"], startHour: 13, startMin: 30,
                images: [{ desc: "Pharmacy counter with pharmacist", objects: ["counter", "pharmacist", "shelves"], activities: ["picking up"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Medicine box on pharmacy counter", objects: ["medicine box", "counter", "receipt"], activities: ["purchasing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Tablet strip on table with prescription", objects: ["tablets", "strip", "prescription"], activities: ["checking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Pill bottle with label", objects: ["pill bottle", "label", "table"], activities: ["reading label"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Pharmacy bag with medicine inside", objects: ["bag", "medicine", "receipt"], activities: ["carrying"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Shelf of medicine packaging in pharmacy", objects: ["shelves", "medicine", "packages"], activities: ["browsing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Close-up of medicine packaging with dosage info", objects: ["packaging", "text", "medicine"], activities: ["reading"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Prescription being handed to pharmacist", objects: ["prescription", "hands", "counter"], activities: ["handing over"], peopleCount: 2, gatheringType: "pair" },
                    { desc: "Multiple medicine boxes in pharmacy bag", objects: ["boxes", "bag", "receipt"], activities: ["collecting"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Medicine and water glass on home table", objects: ["medicine", "glass", "water", "table"], activities: ["preparing to take"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
            {
                name: "Home Afterward", pool: "home_interior", primaryScene: "home", secondaryScenes: ["rest", "evening"],
                io: "indoor", tod: "evening", concepts: ["home", "rest", "indoor", "evening", "recovery"],
                synonyms: ["house", "apartment", "resting"], startHour: 16, startMin: 0,
                images: [{ desc: "Living room sofa with blanket", objects: ["sofa", "blanket", "cushions"], activities: ["resting"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Tea cup on side table near sofa", objects: ["tea", "cup", "table"], activities: ["drinking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Medicine on bedside table with water", objects: ["medicine", "water", "table"], activities: ["resting"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Evening light through living room window", objects: ["window", "light", "room"], activities: ["relaxing"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
        ]
    },

    // ════════════════════════════════════════════════════════════
    // EPISODE 04 — AIRPORT / TRAVEL DAY
    // ════════════════════════════════════════════════════════════
    {
        id: "ep04_airport", name: "Airport / Travel Day", date: "2022-07-20",
        events: [
            {
                name: "Packing / Leaving Home", pool: "home_interior", primaryScene: "home", secondaryScenes: ["packing", "luggage"],
                io: "indoor", tod: "morning", concepts: ["home", "packing", "luggage", "morning", "indoor"],
                synonyms: ["preparation", "departure"], startHour: 6, startMin: 0,
                images: [{ desc: "Open suitcase on bed being packed", objects: ["suitcase", "bed", "clothes"], activities: ["packing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Passport and boarding pass on table", objects: ["passport", "boarding pass", "table"], activities: ["preparing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Packed bags lined up by front door", objects: ["bags", "door", "shoes"], activities: ["preparing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Morning coffee next to travel checklist", objects: ["coffee", "checklist", "pen"], activities: ["planning"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
            {
                name: "Airport", pool: "airport", primaryScene: "airport", secondaryScenes: ["terminal", "departure"],
                io: "indoor", tod: "morning", concepts: ["airport", "terminal", "departure", "flight", "indoor"],
                synonyms: ["departure gate", "arrival hall", "air travel"], startHour: 8, startMin: 0,
                images: [{ desc: "Airport terminal with departure boards", objects: ["terminal", "departure board", "screens"], activities: ["checking flights"], peopleCount: 3, gatheringType: "public-gathering" },
                    { desc: "Check-in counters with airline logos", objects: ["counter", "airline", "people"], activities: ["checking in"], peopleCount: 4, gatheringType: "public-gathering" },
                    { desc: "Security checkpoint queue", objects: ["queue", "barriers", "people"], activities: ["waiting"], peopleCount: 5, gatheringType: "public-gathering" }
                ]
            },
            {
                name: "Flight", pool: "airplane", primaryScene: "airplane", secondaryScenes: ["flight", "sky"],
                io: "indoor", tod: "afternoon", concepts: ["airplane", "flight", "sky", "plane", "travel", "indoor"],
                synonyms: ["aircraft", "air travel", "flying"], startHour: 11, startMin: 0,
                images: [{ desc: "Airplane wing visible through window", objects: ["wing", "window", "sky"], activities: ["flying"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Clouds seen from airplane window", objects: ["clouds", "sky", "window"], activities: ["looking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Airplane cabin interior with seats", objects: ["cabin", "seats", "overhead"], activities: ["sitting"], peopleCount: 3, gatheringType: "public-gathering" },
                    { desc: "Tray table with inflight snack", objects: ["tray", "snack", "drink"], activities: ["eating"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
            {
                name: "Arrival Terminal", pool: "airport", primaryScene: "airport", secondaryScenes: ["arrival", "terminal"],
                io: "indoor", tod: "afternoon", concepts: ["airport", "arrival", "terminal", "indoor", "luggage"],
                synonyms: ["arrivals", "landing", "baggage claim"], startHour: 14, startMin: 0,
                images: [{ desc: "Arrival hall with welcome signs", objects: ["hall", "signs", "people"], activities: ["walking"], peopleCount: 4, gatheringType: "public-gathering" },
                    { desc: "Baggage claim carousel", objects: ["carousel", "luggage", "people"], activities: ["waiting"], peopleCount: 5, gatheringType: "public-gathering" },
                    { desc: "Collecting suitcase from belt", objects: ["suitcase", "belt", "hands"], activities: ["grabbing"], peopleCount: 1, gatheringType: "solo" }
                ]
            },
            {
                name: "Ride to Hotel", pool: "car_road", primaryScene: "transport", secondaryScenes: ["taxi", "ride", "city"],
                io: "mixed", tod: "afternoon", concepts: ["car", "taxi", "ride", "transport", "road", "hotel", "city"],
                synonyms: ["cab", "transfer", "drive", "ride to hotel"], startHour: 15, startMin: 30,
                images: [{ desc: "Taxi on busy city road", objects: ["taxi", "road", "buildings"], activities: ["riding"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Car interior with luggage on back seat", objects: ["car", "luggage", "seat"], activities: ["riding"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "City passing by through car window", objects: ["city", "window", "buildings"], activities: ["viewing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Highway with city skyline ahead", objects: ["highway", "skyline", "cars"], activities: ["driving"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Traffic on city boulevard", objects: ["traffic", "boulevard", "trees"], activities: ["sitting in traffic"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "View of new city landmarks from car", objects: ["landmarks", "window", "buildings"], activities: ["sightseeing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "GPS navigation showing hotel route", objects: ["phone", "GPS", "screen"], activities: ["navigating"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Bridge crossing during ride to hotel", objects: ["bridge", "road", "water"], activities: ["crossing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Hotel building coming into view", objects: ["hotel", "building", "road"], activities: ["approaching"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Arriving at hotel entrance with luggage", objects: ["entrance", "luggage", "hotel"], activities: ["arriving"], peopleCount: 2, gatheringType: "friends" }
                ]
            },
            {
                name: "Hotel Check-in", pool: "hotel_room", primaryScene: "hotel", secondaryScenes: ["check-in", "room"],
                io: "indoor", tod: "evening", concepts: ["hotel", "check-in", "room", "indoor", "evening"],
                synonyms: ["accommodation", "resort", "lodging"], startHour: 17, startMin: 0,
                images: [{ desc: "Hotel reception with staff smiling", objects: ["reception", "desk", "staff"], activities: ["checking in"], peopleCount: 2, gatheringType: "solo" },
                    { desc: "Hotel key card being handed over", objects: ["key card", "hand", "counter"], activities: ["receiving"], peopleCount: 2, gatheringType: "pair" },
                    { desc: "Luggage in elevator going to room", objects: ["luggage", "elevator", "floor"], activities: ["going up"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Hotel room door being opened", objects: ["door", "key card", "handle"], activities: ["opening"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Clean hotel room with made bed", objects: ["bed", "pillows", "room"], activities: ["entering"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Hotel bathroom with white towels", objects: ["bathroom", "towels", "mirror"], activities: ["freshening up"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "City view from hotel room window", objects: ["window", "city", "view"], activities: ["admiring view"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
        ]
    },

    // ════════════════════════════════════════════════════════════
    // EPISODE 05 — CAMPUS / STUDY DAY
    // ════════════════════════════════════════════════════════════
    {
        id: "ep05_campus", name: "Campus / Study Day", date: "2023-01-10",
        events: [
            {
                name: "Campus Arrival", pool: "campus", primaryScene: "campus", secondaryScenes: ["university", "entrance"],
                io: "outdoor", tod: "morning", concepts: ["campus", "university", "college", "outdoor", "morning"],
                synonyms: ["school", "university campus", "college grounds"], startHour: 8, startMin: 30,
                images: [{ desc: "University campus entrance with gate", objects: ["gate", "campus", "sign"], activities: ["arriving"], peopleCount: 2, gatheringType: "friends" },
                    { desc: "Wide campus grounds with buildings", objects: ["grounds", "buildings", "trees"], activities: ["walking"], peopleCount: 3, gatheringType: "friends" },
                    { desc: "Students walking on campus path", objects: ["path", "students", "backpacks"], activities: ["walking"], peopleCount: 4, gatheringType: "class" }
                ]
            },
            {
                name: "Classroom", pool: "classroom", primaryScene: "classroom", secondaryScenes: ["lecture", "class"],
                io: "indoor", tod: "morning", concepts: ["classroom", "class", "lecture", "indoor", "education", "learning"],
                synonyms: ["lecture hall", "class", "course"], startHour: 10, startMin: 0,
                images: [{ desc: "Classroom with rows of desks and whiteboard", objects: ["desks", "whiteboard", "chairs"], activities: ["sitting"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Whiteboard with notes and diagrams", objects: ["whiteboard", "markers", "writing"], activities: ["learning"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Students taking notes in lecture", objects: ["notebooks", "pens", "desks"], activities: ["writing", "listening"], peopleCount: 4, gatheringType: "class" },
                    { desc: "Laptop open on desk during class", objects: ["laptop", "desk", "screen"], activities: ["typing"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Professor at podium speaking", objects: ["podium", "projector", "screen"], activities: ["lecturing"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Close-up of notebook with handwritten notes", objects: ["notebook", "pen", "notes"], activities: ["writing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Classroom projector screen with slides", objects: ["projector", "screen", "slides"], activities: ["presenting"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Students discussing in small group", objects: ["students", "table", "papers"], activities: ["discussing"], peopleCount: 3, gatheringType: "class" },
                    { desc: "Class ending with students packing up", objects: ["bags", "desks", "people"], activities: ["packing"], peopleCount: 4, gatheringType: "class" },
                    { desc: "Hallway outside classroom with lockers", objects: ["hallway", "lockers", "door"], activities: ["exiting"], peopleCount: 2, gatheringType: "friends" }
                ]
            },
            {
                name: "Campus Social", pool: "campus", primaryScene: "campus", secondaryScenes: ["hallway", "social"],
                io: "mixed", tod: "afternoon", concepts: ["campus", "social", "hallway", "friends", "break"],
                synonyms: ["campus life", "student life"], startHour: 12, startMin: 0,
                images: [{ desc: "Friends chatting in campus hallway", objects: ["hallway", "people", "lockers"], activities: ["talking", "laughing"], peopleCount: 3, gatheringType: "friends" },
                    { desc: "Campus cafeteria with lunch trays", objects: ["cafeteria", "trays", "food"], activities: ["eating"], peopleCount: 4, gatheringType: "friends" }
                ]
            },
            {
                name: "Library", pool: "library", primaryScene: "library", secondaryScenes: ["books", "study"],
                io: "indoor", tod: "afternoon", concepts: ["library", "books", "study", "indoor", "reading", "shelves"],
                synonyms: ["study area", "reading room", "book collection"], startHour: 14, startMin: 0,
                images: [{ desc: "Library entrance with bookshelves visible", objects: ["entrance", "bookshelves", "door"], activities: ["entering"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Tall bookshelves full of books in library", objects: ["bookshelves", "books", "aisle"], activities: ["browsing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Study table with books spread out", objects: ["table", "books", "lamp"], activities: ["studying"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Library reading area with desks", objects: ["desks", "chairs", "lamps"], activities: ["reading"], peopleCount: 2, gatheringType: "friends" }
                ]
            },
            {
                name: "Studying", pool: "laptop_study", primaryScene: "study", secondaryScenes: ["laptop", "work"],
                io: "indoor", tod: "afternoon", concepts: ["study", "studying", "laptop", "books", "learning", "indoor", "computer"],
                synonyms: ["learning", "reading", "working", "homework"], startHour: 16, startMin: 0,
                images: [{ desc: "Laptop screen with notes document open", objects: ["laptop", "screen", "desk"], activities: ["typing", "studying"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Notebook and textbook side by side on desk", objects: ["notebook", "textbook", "pen"], activities: ["writing", "studying"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Coffee cup next to open laptop", objects: ["coffee", "laptop", "desk"], activities: ["studying", "drinking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Highlighter marks on textbook pages", objects: ["textbook", "highlighter", "pages"], activities: ["highlighting", "reading"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Student focused on laptop screen", objects: ["student", "laptop", "headphones"], activities: ["studying", "concentrating"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Desk organized with study materials", objects: ["desk", "books", "pens", "notes"], activities: ["organizing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Two laptops on shared desk during group study", objects: ["laptops", "desk", "papers"], activities: ["collaborating"], peopleCount: 2, gatheringType: "friends" }
                ]
            },
            {
                name: "Coffee Shop", pool: "cafe", primaryScene: "cafe", secondaryScenes: ["coffee", "relaxing"],
                io: "indoor", tod: "evening", concepts: ["cafe", "coffee", "relaxing", "indoor", "evening", "friends"],
                synonyms: ["coffee shop", "coffeehouse"], startHour: 18, startMin: 0,
                images: [{ desc: "Campus coffee shop entrance", objects: ["entrance", "sign", "door"], activities: ["entering"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Ordering at coffee shop counter", objects: ["counter", "menu", "barista"], activities: ["ordering"], peopleCount: 2, gatheringType: "pair" },
                    { desc: "Iced coffee on table with laptop", objects: ["iced coffee", "table", "laptop"], activities: ["relaxing"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Friends at coffee shop table with drinks", objects: ["people", "drinks", "table"], activities: ["chatting", "drinking"], peopleCount: 3, gatheringType: "friends" },
                    { desc: "Pastry display case at coffee shop", objects: ["display", "pastries", "glass"], activities: ["choosing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Hot latte being served", objects: ["latte", "cup", "hands"], activities: ["serving"], peopleCount: 1, gatheringType: "solo" }
                ]
            },
        ]
    },

    // ════════════════════════════════════════════════════════════
    // EPISODE 06 — HIKING DAY
    // ════════════════════════════════════════════════════════════
    {
        id: "ep06_hiking", name: "Hiking Day", date: "2023-08-17",
        events: [
            {
                name: "Drive to Trail", pool: "car_road", primaryScene: "transport", secondaryScenes: ["road", "morning"],
                io: "outdoor", tod: "morning", concepts: ["car", "road", "driving", "morning", "outdoor", "nature"],
                synonyms: ["drive", "ride"], startHour: 7, startMin: 0,
                images: [{ desc: "Car on winding mountain road", objects: ["car", "road", "mountains"], activities: ["driving"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Morning mist over forested road", objects: ["road", "mist", "trees"], activities: ["driving"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Dashboard view of country road", objects: ["dashboard", "road", "fields"], activities: ["driving"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Friends in car heading to trail", objects: ["car", "people", "bags"], activities: ["traveling"], peopleCount: 3, gatheringType: "friends" },
                    { desc: "Scenic overlook from road", objects: ["overlook", "valley", "road"], activities: ["stopping"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Road through dense forest", objects: ["road", "forest", "trees"], activities: ["driving"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Gas station stop on country road", objects: ["gas station", "pumps", "car"], activities: ["refueling"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Trail parking lot at trailhead", objects: ["parking", "cars", "sign"], activities: ["parking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Trailhead sign with map", objects: ["sign", "map", "post"], activities: ["reading"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Putting on hiking boots at car", objects: ["boots", "car", "ground"], activities: ["preparing"], peopleCount: 1, gatheringType: "solo" }
                ]
            },
            {
                name: "Trailhead Start", pool: "hiking_trail", primaryScene: "trail", secondaryScenes: ["hiking", "forest"],
                io: "outdoor", tod: "morning", concepts: ["trail", "hiking", "trailhead", "outdoor", "nature", "forest"],
                synonyms: ["path", "track", "hike start"], startHour: 9, startMin: 0,
                images: [{ desc: "Trail entrance with wooden marker post", objects: ["marker", "trail", "trees"], activities: ["starting"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Narrow dirt path entering forest", objects: ["path", "forest", "dirt"], activities: ["walking"], peopleCount: 2, gatheringType: "friends" },
                    { desc: "Friends at start of hiking trail", objects: ["people", "trail", "backpacks"], activities: ["starting hike"], peopleCount: 3, gatheringType: "friends" },
                    { desc: "Forest canopy overhead on trail", objects: ["canopy", "trees", "sky"], activities: ["looking up"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Trail winding through tall trees", objects: ["trail", "trees", "ferns"], activities: ["hiking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Stream crossing on hiking trail", objects: ["stream", "rocks", "trail"], activities: ["crossing"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Wildflowers along trail edge", objects: ["flowers", "trail", "grass"], activities: ["observing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Rocky section of trail climbing upward", objects: ["rocks", "trail", "slope"], activities: ["climbing"], peopleCount: 2, gatheringType: "friends" },
                    { desc: "Trail sign showing distance to viewpoint", objects: ["sign", "distance", "arrow"], activities: ["reading"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Resting on log beside trail", objects: ["log", "backpack", "water bottle"], activities: ["resting", "drinking"], peopleCount: 1, gatheringType: "solo" }
                ]
            },
            {
                name: "Hiking", pool: "forest", primaryScene: "hiking", secondaryScenes: ["nature", "forest", "trail"],
                io: "outdoor", tod: "afternoon", concepts: ["hiking", "nature", "forest", "trail", "outdoor", "walking"],
                synonyms: ["trekking", "walking", "backpacking"], startHour: 11, startMin: 0,
                images: [{ desc: "Dense forest with sunlight filtering through", objects: ["forest", "sunlight", "trees"], activities: ["hiking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Hiking uphill through forest path", objects: ["path", "incline", "trees"], activities: ["climbing"], peopleCount: 2, gatheringType: "friends" },
                    { desc: "Mossy rocks along forest trail", objects: ["rocks", "moss", "trail"], activities: ["hiking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Friends hiking in single file on narrow trail", objects: ["people", "trail", "backpacks"], activities: ["hiking"], peopleCount: 3, gatheringType: "friends" },
                    { desc: "Small waterfall beside hiking trail", objects: ["waterfall", "rocks", "water"], activities: ["stopping to look"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Bird perched on branch near trail", objects: ["bird", "branch", "leaves"], activities: ["observing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Open meadow clearing in forest", objects: ["meadow", "grass", "trees"], activities: ["resting"], peopleCount: 2, gatheringType: "friends" },
                    { desc: "Trail marker on tree trunk", objects: ["marker", "tree", "paint"], activities: ["following"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Elevated trail with partial valley view", objects: ["trail", "valley", "hills"], activities: ["hiking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Snack break on flat rock by trail", objects: ["rock", "snacks", "water"], activities: ["eating", "resting"], peopleCount: 2, gatheringType: "friends" }
                ]
            },
            {
                name: "Mountain Viewpoint", pool: "mountain", primaryScene: "mountain", secondaryScenes: ["viewpoint", "panorama"],
                io: "outdoor", tod: "afternoon", concepts: ["mountain", "viewpoint", "panorama", "outdoor", "scenic", "summit"],
                synonyms: ["scenic overlook", "peak", "vista", "summit view", "mountains"], startHour: 14, startMin: 0,
                images: [{ desc: "Panoramic mountain view from summit", objects: ["mountains", "sky", "horizon"], activities: ["viewing"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Group photo at mountain viewpoint", objects: ["people", "mountains", "sign"], activities: ["posing"], peopleCount: 4, gatheringType: "friends" },
                    { desc: "Mountain range stretching into distance", objects: ["mountains", "range", "clouds"], activities: ["admiring"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Valley visible from mountain top", objects: ["valley", "river", "forest"], activities: ["viewing"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
            {
                name: "Sunset Descent", pool: "sunset", primaryScene: "sunset", secondaryScenes: ["mountain", "evening"],
                io: "outdoor", tod: "evening", concepts: ["sunset", "mountain", "evening", "outdoor", "descent"],
                synonyms: ["dusk", "golden hour", "sundown"], startHour: 17, startMin: 0,
                images: [{ desc: "Sunset over mountain range with orange sky", objects: ["sunset", "mountains", "sky"], activities: ["watching"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Trail descending with sunset light", objects: ["trail", "light", "trees"], activities: ["descending"], peopleCount: 2, gatheringType: "friends" },
                    { desc: "Golden hour light on mountain slopes", objects: ["light", "slopes", "grass"], activities: ["walking"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Silhouette of hikers against sunset", objects: ["silhouettes", "sunset", "trail"], activities: ["hiking"], peopleCount: 3, gatheringType: "friends" },
                    { desc: "Sun dipping below mountain horizon", objects: ["sun", "horizon", "mountains"], activities: ["watching"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Twilight colors reflected on lake", objects: ["lake", "reflection", "colors"], activities: ["admiring"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
            {
                name: "Dinner After Hike", pool: "restaurant", primaryScene: "restaurant", secondaryScenes: ["dinner", "food"],
                io: "indoor", tod: "evening", concepts: ["restaurant", "dinner", "food", "indoor", "evening"],
                synonyms: ["eatery", "dining"], startHour: 19, startMin: 30,
                images: [{ desc: "Rustic restaurant near mountain area", objects: ["restaurant", "building", "sign"], activities: ["arriving"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Warm restaurant interior with wooden tables", objects: ["tables", "wood", "lights"], activities: ["sitting"], peopleCount: 3, gatheringType: "friends" }
                ]
            },
        ]
    },

    // ════════════════════════════════════════════════════════════
    // EPISODE 07 — BIRTHDAY / HOUSE GATHERING
    // ════════════════════════════════════════════════════════════
    {
        id: "ep07_birthday", name: "Birthday / House Gathering", date: "2024-04-05",
        events: [
            {
                name: "Preparing Room", pool: "home_interior", primaryScene: "home", secondaryScenes: ["preparation", "decoration"],
                io: "indoor", tod: "afternoon", concepts: ["home", "preparation", "decoration", "birthday", "indoor", "party"],
                synonyms: ["setup", "arranging"], startHour: 14, startMin: 0,
                images: [{ desc: "Balloons being inflated in living room", objects: ["balloons", "room", "hands"], activities: ["decorating"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Birthday banner hung across wall", objects: ["banner", "wall", "tape"], activities: ["hanging"], peopleCount: 1, gatheringType: "solo" },
                    { desc: "Table being set with plates and napkins", objects: ["table", "plates", "napkins"], activities: ["setting table"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
            {
                name: "Guests Arriving", pool: "friends_group", primaryScene: "gathering", secondaryScenes: ["friends", "arrival"],
                io: "indoor", tod: "afternoon", concepts: ["friends", "guests", "arriving", "indoor", "greeting"],
                synonyms: ["welcoming", "meeting"], startHour: 16, startMin: 0,
                images: [{ desc: "Friend at door with gift bag", objects: ["door", "person", "gift"], activities: ["arriving", "greeting"], peopleCount: 2, gatheringType: "friends" },
                    { desc: "Group of friends entering house", objects: ["door", "people", "hallway"], activities: ["entering", "greeting"], peopleCount: 4, gatheringType: "friends" },
                    { desc: "Hugs and greetings at entrance", objects: ["people", "doorway"], activities: ["hugging", "greeting"], peopleCount: 3, gatheringType: "friends" }
                ]
            },
            {
                name: "Group Gathering", pool: "friends_group", primaryScene: "gathering", secondaryScenes: ["party", "friends"],
                io: "indoor", tod: "evening", concepts: ["gathering", "friends", "party", "indoor", "social", "group"],
                synonyms: ["get-together", "meetup", "hangout"], startHour: 17, startMin: 30,
                images: [{ desc: "Large group chatting in living room", objects: ["people", "room", "furniture"], activities: ["talking", "laughing"], peopleCount: 8, gatheringType: "party" },
                    { desc: "Friends dancing to music", objects: ["people", "room", "speaker"], activities: ["dancing"], peopleCount: 4, gatheringType: "party" }
                ]
            },
            {
                name: "Birthday Cake", pool: "food", primaryScene: "birthday", secondaryScenes: ["cake", "celebration"],
                io: "indoor", tod: "evening", concepts: ["birthday", "cake", "celebration", "candles", "indoor", "party"],
                synonyms: ["birthday party", "birthday celebration", "blowing candles"], startHour: 19, startMin: 0,
                images: [{ desc: "Birthday cake with lit candles on table", objects: ["cake", "candles", "table"], activities: ["presenting"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Friends singing happy birthday around cake", objects: ["people", "cake", "candles"], activities: ["singing"], peopleCount: 6, gatheringType: "party" }
                ]
            },
            {
                name: "Dinner / Food", pool: "food", primaryScene: "food", secondaryScenes: ["dinner", "party food"],
                io: "indoor", tod: "evening", concepts: ["food", "dinner", "eating", "indoor", "party", "friends"],
                synonyms: ["meal", "feast", "party food"], startHour: 19, startMin: 45,
                images: [{ desc: "Table loaded with party food", objects: ["table", "food", "platters"], activities: ["eating"], peopleCount: 0, gatheringType: "solo" },
                    { desc: "Pizza boxes open on counter", objects: ["pizza", "boxes", "counter"], activities: ["serving"], peopleCount: 0, gatheringType: "solo" }
                ]
            },
            {
                name: "Late Evening", pool: "party", primaryScene: "party", secondaryScenes: ["night", "gathering"],
                io: "indoor", tod: "night", concepts: ["party", "night", "friends", "indoor", "gathering", "late"],
                synonyms: ["night party", "late night", "after party"], startHour: 22, startMin: 0,
                images: [{ desc: "Dim room with friends still chatting", objects: ["room", "people", "low light"], activities: ["chatting"], peopleCount: 4, gatheringType: "friends" }
                ]
            },
        ]
    },

    // ════════════════════════════════════════════════════════════
    // EPISODE 08 — WEDDING / FORMAL GATHERING
    // ════════════════════════════════════════════════════════════
    {
        id: "ep08_wedding", name: "Wedding / Formal Gathering", date: "2024-11-12",
        events: [
            {
                name: "Venue Arrival", pool: "landmark", primaryScene: "venue", secondaryScenes: ["exterior", "formal"],
                io: "outdoor", tod: "morning", concepts: ["venue", "wedding", "formal", "outdoor", "arrival"],
                synonyms: ["event venue", "celebration venue"], startHour: 10, startMin: 0,
                images: Array.from({length: 6}, (_, i) => ({
                    desc: ["Elegant venue exterior with garden", "Venue entrance with floral arch", "Parking area near venue", "Guests walking to venue entrance", "Venue sign with event details", "Garden pathway to venue building", "Decorated entrance with flowers", "Venue building with tall windows", "Fountain near venue entrance", "Wide view of venue grounds"][i],
                    objects: [["venue", "garden", "building"], ["entrance", "arch", "flowers"], ["parking", "cars", "venue"], ["guests", "path", "building"], ["sign", "details", "post"], ["garden", "pathway", "hedges"], ["entrance", "flowers", "ribbon"], ["building", "windows", "facade"], ["fountain", "water", "venue"], ["grounds", "lawn", "building"]][i],
                    activities: [["arriving"], ["entering"], ["parking"], ["walking"], ["reading"], ["walking"], ["admiring"], ["approaching"], ["viewing"], ["photographing"]][i],
                    peopleCount: [0, 2, 0, 4, 0, 2, 0, 0, 0, 3][i],
                    gatheringType: (["solo", "pair", "solo", "friends", "solo", "pair", "solo", "solo", "solo", "friends"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Guests Gathering", pool: "gathering_formal", primaryScene: "gathering", secondaryScenes: ["formal", "guests"],
                io: "mixed", tod: "morning", concepts: ["guests", "gathering", "formal", "people", "social", "wedding"],
                synonyms: ["guests", "attendees"], startHour: 11, startMin: 0,
                images: Array.from({length: 2}, (_, i) => ({
                    desc: ["Guests in formal attire mingling outdoors", "Friends greeting each other at event", "Guests seated in decorated chairs", "Woman in elegant dress with clutch", "Men in suits talking", "Group photo of guests on lawn", "Guest signing guestbook at table", "Children running on venue lawn", "Elderly couple arriving arm in arm", "Guests being seated by usher"][i],
                    objects: [["people", "formal wear", "lawn"], ["people", "handshake", "smiles"], ["chairs", "decoration", "people"], ["dress", "clutch", "person"], ["suits", "people", "glasses"], ["group", "lawn", "camera"], ["guestbook", "pen", "table"], ["children", "lawn", "play"], ["couple", "arm", "path"], ["usher", "guest", "aisle"]][i],
                    activities: [["mingling"], ["greeting"], ["sitting"], ["walking"], ["talking"], ["posing"], ["signing"], ["playing"], ["walking"], ["being seated"]][i],
                    peopleCount: [6, 3, 5, 1, 3, 8, 1, 3, 2, 2][i],
                    gatheringType: (["formal-event", "friends", "formal-event", "solo", "friends", "formal-event", "solo", "family", "pair", "pair"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Ceremony", pool: "gathering_formal", primaryScene: "ceremony", secondaryScenes: ["wedding", "formal"],
                io: "outdoor", tod: "afternoon", concepts: ["ceremony", "wedding", "formal", "outdoor", "celebration"],
                synonyms: ["wedding ceremony", "vows", "nuptials"], startHour: 13, startMin: 0,
                images: Array.from({length: 2}, (_, i) => ({
                    desc: ["Ceremony setup with flower arch and chairs", "Guests watching ceremony from seats", "Ceremony in progress under decorated arch", "Flower arrangements along aisle", "Close-up of ring exchange moment", "Ceremony officiant speaking", "Bride and groom at altar", "Guests wiping tears during vows", "Ceremony ending with applause", "Couple walking back down aisle together"][i],
                    objects: [["arch", "chairs", "flowers"], ["guests", "seats", "aisle"], ["arch", "ceremony", "people"], ["flowers", "aisle", "petals"], ["rings", "hands", "close-up"], ["officiant", "podium", "microphone"], ["couple", "altar", "flowers"], ["guests", "tissues", "seats"], ["people", "applause", "standing"], ["couple", "aisle", "guests"]][i],
                    activities: [["viewing"], ["watching"], ["attending ceremony"], ["decorating"], ["exchanging rings"], ["speaking"], ["standing"], ["crying"], ["applauding"], ["walking"]][i],
                    peopleCount: [0, 15, 3, 0, 2, 1, 2, 10, 20, 2][i],
                    gatheringType: (["solo", "formal-event", "formal-event", "solo", "pair", "solo", "pair", "formal-event", "formal-event", "pair"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Group Photographs", pool: "friends_group", primaryScene: "group photo", secondaryScenes: ["formal", "portrait"],
                io: "outdoor", tod: "afternoon", concepts: ["group photo", "portrait", "formal", "outdoor", "people", "friends"],
                synonyms: ["group picture", "portrait session"], startHour: 14, startMin: 30,
                images: Array.from({length: 2}, (_, i) => ({
                    desc: ["Large group formal photo on venue steps", "Friends posing together for photo", "Family group portrait in garden", "Couple portrait with venue in background", "Candid group photo with laughter", "Small group posed against wall", "Children's group photo at event", "Photographer directing group pose", "Bride and bridesmaids photo", "Wide group photo with everyone"][i],
                    objects: [["steps", "group", "building"], ["friends", "poses", "smiles"], ["family", "garden", "portrait"], ["couple", "venue", "background"], ["group", "laughter", "candid"], ["wall", "group", "poses"], ["children", "group", "event"], ["photographer", "group", "camera"], ["bridesmaids", "flowers", "dresses"], ["everyone", "venue", "group"]][i],
                    activities: [["posing"], ["posing"], ["posing"], ["posing"], ["laughing"], ["posing"], ["posing"], ["directing"], ["posing"], ["posing"]][i],
                    peopleCount: [15, 5, 6, 2, 4, 4, 5, 8, 5, 20][i],
                    gatheringType: (["formal-event", "friends", "family", "pair", "friends", "friends", "family", "formal-event", "friends", "formal-event"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Reception", pool: "party", primaryScene: "reception", secondaryScenes: ["party", "celebration"],
                io: "indoor", tod: "evening", concepts: ["reception", "party", "celebration", "indoor", "wedding", "dancing"],
                synonyms: ["wedding reception", "after party", "celebration party"], startHour: 17, startMin: 0,
                images: Array.from({length: 1}, (_, i) => ({
                    desc: ["Reception hall with decorated tables", "Dance floor with people dancing", "First dance of the couple", "DJ setup with lights and music", "Guests dancing and celebrating", "Toast being given by best man", "Champagne glasses being raised", "Photo booth with props and guests", "Band playing live music at reception", "Confetti falling on dance floor"][i],
                    objects: [["hall", "tables", "decorations"], ["dance floor", "people", "lights"], ["couple", "dance floor", "spotlight"], ["DJ", "speakers", "lights"], ["people", "dance floor", "music"], ["microphone", "person", "glass"], ["champagne", "glasses", "hands"], ["photo booth", "props", "people"], ["band", "instruments", "stage"], ["confetti", "people", "floor"]][i],
                    activities: [["admiring"], ["dancing"], ["dancing"], ["playing music"], ["dancing", "celebrating"], ["toasting"], ["toasting"], ["posing"], ["performing"], ["celebrating"]][i],
                    peopleCount: [0, 8, 2, 1, 10, 1, 6, 3, 4, 12][i],
                    gatheringType: (["solo", "party", "pair", "solo", "party", "solo", "party", "friends", "solo", "party"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Formal Dinner", pool: "restaurant", primaryScene: "dinner", secondaryScenes: ["formal", "reception"],
                io: "indoor", tod: "evening", concepts: ["dinner", "formal", "food", "indoor", "evening", "wedding"],
                synonyms: ["formal dinner", "banquet", "feast"], startHour: 20, startMin: 0,
                images: Array.from({length: 2}, (_, i) => ({
                    desc: ["Elegant table setting with candles", "Multi-course dinner plate presentation", "Guests at round tables eating", "Wine being poured at dinner", "Speech being given at head table", "Table centerpiece with flowers", "Dessert course being served", "Coffee and after-dinner drinks", "Guests laughing at dinner table", "Evening venue lit up beautifully"][i],
                    objects: [["table", "candles", "plates"], ["plate", "food", "garnish"], ["tables", "guests", "food"], ["wine", "glass", "hand"], ["person", "microphone", "table"], ["centerpiece", "flowers", "table"], ["dessert", "plate", "spoon"], ["coffee", "cups", "drinks"], ["guests", "table", "laughter"], ["venue", "lights", "building"]][i],
                    activities: [["admiring"], ["eating"], ["dining"], ["pouring"], ["speaking"], ["admiring"], ["eating"], ["drinking"], ["laughing"], ["viewing"]][i],
                    peopleCount: [0, 0, 8, 1, 1, 0, 0, 2, 5, 0][i],
                    gatheringType: (["solo", "solo", "formal-event", "solo", "solo", "solo", "solo", "pair", "friends", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
        ]
    },

    // ════════════════════════════════════════════════════════════
    // EPISODE 09 — PARK / PICNIC DAY
    // ════════════════════════════════════════════════════════════
    {
        id: "ep09_park", name: "Park / Picnic Day", date: "2025-05-03",
        events: [
            {
                name: "Travel to Park", pool: "car_road", primaryScene: "transport", secondaryScenes: ["road"],
                io: "outdoor", tod: "morning", concepts: ["car", "road", "travel", "outdoor", "morning"],
                synonyms: ["drive", "ride"], startHour: 9, startMin: 0,
                images: Array.from({length: 12}, (_, i) => ({
                    desc: ["Car loaded with picnic supplies", "Driving on tree-lined road to park", "Friends in car excited for park day", "Passing suburban streets to park area", "Road with park entrance visible ahead", "Turning into park entrance road", "Finding parking spot near park", "Unloading picnic basket from car trunk", "Park entrance sign from parking lot", "Walking path from parking to park grounds"][i],
                    objects: [["car", "basket", "blanket"], ["road", "trees", "car"], ["car", "people", "smiles"], ["streets", "houses", "road"], ["road", "park entrance", "trees"], ["turn", "road", "sign"], ["parking", "car", "spot"], ["basket", "trunk", "hands"], ["sign", "parking lot", "trees"], ["path", "parking", "park"]][i],
                    activities: [["loading"], ["driving"], ["traveling"], ["driving"], ["approaching"], ["turning"], ["parking"], ["unloading"], ["arriving"], ["walking"]][i],
                    peopleCount: [0, 1, 3, 0, 0, 0, 0, 2, 0, 2][i],
                    gatheringType: (["solo", "solo", "friends", "solo", "solo", "solo", "solo", "friends", "solo", "friends"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Park Entrance", pool: "park_outdoor", primaryScene: "park", secondaryScenes: ["entrance", "nature"],
                io: "outdoor", tod: "morning", concepts: ["park", "nature", "trees", "outdoor", "entrance"],
                synonyms: ["garden", "green space"], startHour: 10, startMin: 0,
                images: Array.from({length: 5}, (_, i) => ({
                    desc: ["Park entrance gate with iron fence", "Wide pathway into park with tall trees", "Map board at park entrance showing trails", "Flower beds near park entrance", "People entering park on sunny morning", "Scenic bridge at park entrance area", "Fountain near park entrance", "Tree-lined avenue in park", "Bench beside park entrance path", "Morning sunlight through park trees"][i],
                    objects: [["gate", "fence", "park"], ["pathway", "trees", "people"], ["map", "board", "trails"], ["flowers", "beds", "path"], ["people", "entrance", "sun"], ["bridge", "water", "trees"], ["fountain", "water", "park"], ["avenue", "trees", "path"], ["bench", "path", "tree"], ["sunlight", "trees", "shadows"]][i],
                    activities: [["entering"], ["walking"], ["reading"], ["admiring"], ["entering"], ["crossing"], ["viewing"], ["walking"], ["sitting"], ["walking"]][i],
                    peopleCount: [0, 3, 1, 0, 4, 2, 0, 2, 1, 0][i],
                    gatheringType: (["solo", "friends", "solo", "solo", "friends", "pair", "solo", "friends", "solo", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Walking in Park", pool: "park_outdoor", primaryScene: "park", secondaryScenes: ["walking", "nature"],
                io: "outdoor", tod: "morning", concepts: ["park", "walking", "nature", "outdoor", "trees", "grass"],
                synonyms: ["strolling", "wandering"], startHour: 11, startMin: 0,
                images: Array.from({length: 4}, (_, i) => ({
                    desc: ["Walking on gravel path through park", "Large open grassy area in park", "Lake visible through park trees", "Friends walking past duck pond", "Shaded bench under large oak tree", "Squirrel on park path", "Park jogger passing by on trail", "Wildflowers in park meadow", "Stone steps leading down to park area", "Overlook point in park with city view"][i],
                    objects: [["path", "gravel", "trees"], ["grass", "open area", "sky"], ["lake", "trees", "water"], ["pond", "ducks", "people"], ["bench", "tree", "shade"], ["squirrel", "path", "nuts"], ["jogger", "trail", "trees"], ["flowers", "meadow", "grass"], ["steps", "stone", "park"], ["overlook", "city", "railing"]][i],
                    activities: [["walking"], ["exploring"], ["viewing"], ["walking"], ["sitting"], ["observing"], ["jogging"], ["admiring"], ["descending"], ["viewing"]][i],
                    peopleCount: [2, 0, 0, 3, 1, 0, 1, 0, 0, 2][i],
                    gatheringType: (["friends", "solo", "solo", "friends", "solo", "solo", "solo", "solo", "solo", "pair"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Picnic", pool: "food", primaryScene: "picnic", secondaryScenes: ["food", "outdoor"],
                io: "outdoor", tod: "afternoon", concepts: ["picnic", "food", "outdoor", "park", "blanket", "friends"],
                synonyms: ["outdoor meal", "park lunch"], startHour: 12, startMin: 30,
                images: Array.from({length: 2}, (_, i) => ({
                    desc: ["Picnic blanket spread on grass with food", "Basket open with sandwiches and fruit", "Friends sitting on picnic blanket", "Close-up of sandwiches and snacks on blanket", "Pouring juice into cups at picnic", "Someone passing food plate at picnic", "Picnic scene with park trees in background", "Watermelon slices on picnic blanket", "Laughing group at outdoor picnic", "Cleaning up picnic blanket at end"][i],
                    objects: [["blanket", "food", "grass"], ["basket", "sandwiches", "fruit"], ["people", "blanket", "food"], ["sandwiches", "chips", "blanket"], ["juice", "cups", "bottle"], ["plate", "food", "hands"], ["picnic", "trees", "blanket"], ["watermelon", "blanket", "knife"], ["people", "laughter", "food"], ["blanket", "bags", "trash"]][i],
                    activities: [["setting up"], ["unpacking"], ["sitting", "eating"], ["eating"], ["pouring"], ["passing"], ["picnicking"], ["eating"], ["laughing", "eating"], ["cleaning"]][i],
                    peopleCount: [0, 1, 4, 0, 1, 2, 4, 0, 5, 2][i],
                    gatheringType: (["solo", "solo", "friends", "solo", "solo", "friends", "friends", "solo", "friends", "friends"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Group Activities", pool: "park_outdoor", primaryScene: "park", secondaryScenes: ["activities", "outdoor"],
                io: "outdoor", tod: "afternoon", concepts: ["park", "activities", "outdoor", "friends", "games", "fun"],
                synonyms: ["outdoor games", "group fun"], startHour: 14, startMin: 30,
                images: Array.from({length: 4}, (_, i) => ({
                    desc: ["Friends playing frisbee on park lawn", "Group stretching on grass", "Someone throwing ball in park", "Friends sitting in circle on grass", "Kite flying in park with blue sky", "Walking barefoot on park grass", "Friendly football game on park field", "Resting under tree after activities", "Friends sitting by park pond", "Golden afternoon light on park scene"][i],
                    objects: [["frisbee", "lawn", "people"], ["people", "grass", "stretching"], ["ball", "person", "park"], ["circle", "grass", "people"], ["kite", "sky", "string"], ["feet", "grass", "park"], ["football", "field", "people"], ["tree", "shade", "people"], ["pond", "people", "bench"], ["light", "park", "trees"]][i],
                    activities: [["playing"], ["stretching"], ["throwing"], ["sitting", "talking"], ["flying kite"], ["walking"], ["playing"], ["resting"], ["sitting"], ["relaxing"]][i],
                    peopleCount: [4, 3, 1, 5, 2, 1, 6, 3, 3, 2][i],
                    gatheringType: (["friends", "friends", "solo", "friends", "pair", "solo", "friends", "friends", "friends", "pair"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Sunset Leaving", pool: "sunset", primaryScene: "sunset", secondaryScenes: ["park", "evening"],
                io: "outdoor", tod: "evening", concepts: ["sunset", "park", "evening", "outdoor", "leaving"],
                synonyms: ["dusk", "golden hour"], startHour: 17, startMin: 0,
                images: Array.from({length: 5}, (_, i) => ({
                    desc: ["Sunset through park trees", "Long shadows on park grass at sunset", "Friends silhouetted against sunset in park", "Orange sky over park lake", "Walking back toward park exit at dusk", "Sunset colors reflected in park pond", "Park path in golden evening light", "Last rays of sun through trees", "Car headlights in park parking at dusk", "Driving home as sky turns purple"][i],
                    objects: [["sunset", "trees", "sky"], ["shadows", "grass", "light"], ["silhouettes", "sunset", "people"], ["sky", "lake", "orange"], ["path", "exit", "people"], ["pond", "reflection", "sunset"], ["path", "light", "trees"], ["sun", "trees", "rays"], ["car", "parking", "headlights"], ["road", "sky", "car"]][i],
                    activities: [["watching"], ["walking"], ["silhouetted"], ["viewing"], ["walking"], ["admiring"], ["walking"], ["viewing"], ["loading"], ["driving"]][i],
                    peopleCount: [0, 0, 3, 0, 2, 0, 1, 0, 2, 1][i],
                    gatheringType: (["solo", "solo", "friends", "solo", "friends", "solo", "solo", "solo", "friends", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
        ]
    },

    // ════════════════════════════════════════════════════════════
    // EPISODE 10 — SHOPPING / MALL DAY
    // ════════════════════════════════════════════════════════════
    {
        id: "ep10_shopping", name: "Shopping / Mall Day", date: "2025-12-06",
        events: [
            {
                name: "Street Arrival", pool: "city_street", primaryScene: "street", secondaryScenes: ["city", "arrival"],
                io: "outdoor", tod: "morning", concepts: ["street", "city", "arrival", "outdoor", "morning", "shopping"],
                synonyms: ["downtown", "commercial area"], startHour: 10, startMin: 0,
                images: Array.from({length: 8}, (_, i) => ({
                    desc: ["Busy commercial street with shops", "Shop windows with displays", "Walking toward shopping area", "Street with parked cars and stores", "Store-lined boulevard", "Friends meeting on shopping street", "City street with winter decorations", "Storefront with sale signs", "Pedestrians with shopping bags", "Arriving at main shopping district"][i],
                    objects: [["street", "shops", "signs"], ["windows", "displays", "mannequins"], ["street", "people", "shops"], ["cars", "stores", "street"], ["boulevard", "stores", "trees"], ["friends", "street", "meeting"], ["street", "decorations", "lights"], ["storefront", "signs", "sale"], ["pedestrians", "bags", "street"], ["district", "buildings", "shops"]][i],
                    activities: [["walking"], ["browsing"], ["walking"], ["driving past"], ["walking"], ["meeting"], ["admiring"], ["looking"], ["shopping"], ["arriving"]][i],
                    peopleCount: [3, 0, 2, 0, 2, 3, 0, 0, 3, 2][i],
                    gatheringType: (["public-gathering", "solo", "friends", "solo", "friends", "friends", "solo", "solo", "public-gathering", "friends"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Mall Interior", pool: "mall", primaryScene: "mall", secondaryScenes: ["shopping", "indoor"],
                io: "indoor", tod: "morning", concepts: ["mall", "shopping", "indoor", "store", "shops"],
                synonyms: ["shopping center", "shopping mall", "plaza"], startHour: 11, startMin: 0,
                images: Array.from({length: 1}, (_, i) => ({
                    desc: ["Mall entrance with large doors", "Multi-level mall atrium with escalators", "Store fronts on mall corridor", "Escalator between mall levels", "Mall directory map on wall", "Shoppers walking through mall hallway", "Large anchor store entrance in mall", "Mall seating area with plants", "Glass ceiling letting light into mall", "Information desk inside mall"][i],
                    objects: [["entrance", "doors", "mall"], ["atrium", "escalators", "floors"], ["stores", "corridor", "lights"], ["escalator", "levels", "people"], ["directory", "map", "wall"], ["hallway", "people", "stores"], ["store", "entrance", "sign"], ["seating", "plants", "mall"], ["ceiling", "glass", "light"], ["desk", "information", "mall"]][i],
                    activities: [["entering"], ["viewing"], ["browsing"], ["riding"], ["reading"], ["walking"], ["entering"], ["sitting"], ["viewing"], ["asking"]][i],
                    peopleCount: [2, 5, 3, 2, 0, 4, 0, 2, 0, 1][i],
                    gatheringType: (["friends", "public-gathering", "public-gathering", "pair", "solo", "public-gathering", "solo", "pair", "solo", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Shopping", pool: "store_products", primaryScene: "shopping", secondaryScenes: ["store", "retail"],
                io: "indoor", tod: "afternoon", concepts: ["shopping", "store", "retail", "indoor", "products", "buying"],
                synonyms: ["retail", "buying", "browsing stores"], startHour: 12, startMin: 30,
                images: Array.from({length: 2}, (_, i) => ({
                    desc: ["Browsing clothing rack in store", "Trying on accessories at counter", "Shelves of products in retail store", "Shopping bag collection growing", "Comparing items side by side", "Store checkout counter with items", "Friend showing item to get opinion", "Price tag close-up on item", "Shopping basket with selected items", "Leaving store with shopping bags"][i],
                    objects: [["rack", "clothes", "hangers"], ["counter", "accessories", "mirror"], ["shelves", "products", "store"], ["bags", "shopping", "floor"], ["items", "hands", "comparison"], ["counter", "items", "register"], ["item", "person", "friend"], ["tag", "price", "item"], ["basket", "items", "handle"], ["bags", "door", "person"]][i],
                    activities: [["browsing"], ["trying on"], ["looking"], ["carrying"], ["comparing"], ["checking out"], ["asking opinion"], ["reading"], ["shopping"], ["exiting"]][i],
                    peopleCount: [1, 1, 0, 1, 2, 1, 2, 0, 1, 1][i],
                    gatheringType: (["solo", "solo", "solo", "solo", "friends", "solo", "friends", "solo", "solo", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Store Products", pool: "store_products", primaryScene: "products", secondaryScenes: ["store", "items"],
                io: "indoor", tod: "afternoon", concepts: ["products", "store", "items", "indoor", "retail"],
                synonyms: ["merchandise", "goods"], startHour: 14, startMin: 0,
                images: Array.from({length: 1}, (_, i) => ({
                    desc: ["Display wall of electronics in store", "Shoes arranged on store shelf", "Cosmetics counter with testers", "Book display in bookstore", "Jewelry display case with lighting", "Sports equipment section", "Home decor items on display", "Seasonal gift displays", "Stationery and art supplies section", "Gadget demonstration area"][i],
                    objects: [["electronics", "display", "wall"], ["shoes", "shelf", "store"], ["cosmetics", "counter", "testers"], ["books", "display", "shelf"], ["jewelry", "case", "lights"], ["sports", "equipment", "aisle"], ["decor", "items", "shelf"], ["gifts", "display", "season"], ["stationery", "supplies", "shelf"], ["gadgets", "demo", "table"]][i],
                    activities: [["browsing"], ["looking"], ["testing"], ["browsing"], ["admiring"], ["looking"], ["browsing"], ["choosing"], ["browsing"], ["testing"]][i],
                    peopleCount: [1, 0, 1, 0, 0, 1, 0, 2, 0, 1][i],
                    gatheringType: (["solo", "solo", "solo", "solo", "solo", "solo", "solo", "pair", "solo", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Food Court Café", pool: "cafe", primaryScene: "cafe", secondaryScenes: ["food court", "mall"],
                io: "indoor", tod: "afternoon", concepts: ["cafe", "coffee", "food court", "indoor", "mall", "food"],
                synonyms: ["coffee shop", "food court", "mall café"], startHour: 15, startMin: 30,
                images: Array.from({length: 6}, (_, i) => ({
                    desc: ["Food court seating area in mall", "Ordering at café counter in mall", "Coffee and pastry at mall café table", "Friends resting at food court table", "Menu board at mall coffee shop", "Iced drink at mall café", "Shopping bags under café table", "Food tray with mall court meal", "Friends chatting at café after shopping", "View of mall from café balcony"][i],
                    objects: [["seating", "tables", "food court"], ["counter", "menu", "cashier"], ["coffee", "pastry", "table"], ["friends", "table", "bags"], ["menu board", "prices", "drinks"], ["iced drink", "straw", "table"], ["bags", "table", "floor"], ["tray", "food", "utensils"], ["friends", "coffee", "conversation"], ["balcony", "mall", "view"]][i],
                    activities: [["sitting"], ["ordering"], ["eating"], ["resting"], ["reading"], ["drinking"], ["resting"], ["eating"], ["chatting"], ["viewing"]][i],
                    peopleCount: [3, 1, 0, 3, 0, 1, 0, 1, 3, 1][i],
                    gatheringType: (["public-gathering", "solo", "solo", "friends", "solo", "solo", "solo", "solo", "friends", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Leaving at Night", pool: "night_city", primaryScene: "street", secondaryScenes: ["night", "city"],
                io: "outdoor", tod: "night", concepts: ["street", "night", "city", "outdoor", "leaving"],
                synonyms: ["nighttime", "evening street"], startHour: 19, startMin: 0,
                images: Array.from({length: 2}, (_, i) => ({
                    desc: ["Shopping district at night with lights", "Street lamps lighting up sidewalk", "Friends with shopping bags on evening street", "Store windows glowing at night", "Neon signs reflecting on wet street", "Night city view from shopping area", "Taxi waiting at curb at night", "Loading shopping bags into car trunk", "Night driving through city streets", "City skyline view heading home at night"][i],
                    objects: [["district", "lights", "shops"], ["lamps", "sidewalk", "night"], ["friends", "bags", "street"], ["windows", "glow", "displays"], ["neon", "signs", "reflection"], ["city", "lights", "buildings"], ["taxi", "curb", "night"], ["bags", "trunk", "car"], ["road", "lights", "night"], ["skyline", "city", "night"]][i],
                    activities: [["walking"], ["walking"], ["walking"], ["looking"], ["walking"], ["viewing"], ["hailing"], ["loading"], ["driving"], ["viewing"]][i],
                    peopleCount: [3, 0, 3, 0, 0, 0, 1, 2, 1, 0][i],
                    gatheringType: (["friends", "solo", "friends", "solo", "solo", "solo", "solo", "friends", "solo", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
        ]
    },

    // ════════════════════════════════════════════════════════════
    // EPISODE 11 — ROAD TRIP
    // ════════════════════════════════════════════════════════════
    {
        id: "ep11_roadtrip", name: "Road Trip", date: "2026-03-16",
        events: [
            {
                name: "Packing Car", pool: "car_road", primaryScene: "car", secondaryScenes: ["packing", "home"],
                io: "outdoor", tod: "morning", concepts: ["car", "packing", "road trip", "morning", "outdoor"],
                synonyms: ["loading car", "preparing trip"], startHour: 7, startMin: 0,
                images: Array.from({length: 12}, (_, i) => ({
                    desc: ["Car trunk open with bags being loaded", "Cooler and snacks being packed", "Friends loading car for road trip", "Map spread on car hood for planning", "Car packed and ready to depart", "Driveway with car and packed gear", "Checking tire pressure before trip", "Putting playlist on car stereo", "Last look at house before leaving", "Pulling out of driveway"][i],
                    objects: [["trunk", "bags", "car"], ["cooler", "snacks", "bag"], ["people", "car", "bags"], ["map", "hood", "car"], ["car", "packed", "trunk"], ["driveway", "car", "gear"], ["tire", "gauge", "car"], ["stereo", "phone", "music"], ["house", "car", "morning"], ["driveway", "car", "road"]][i],
                    activities: [["loading"], ["packing"], ["loading"], ["planning"], ["checking"], ["loading"], ["checking"], ["setting up"], ["leaving"], ["driving"]][i],
                    peopleCount: [1, 1, 3, 2, 0, 2, 1, 1, 0, 1][i],
                    gatheringType: (["solo", "solo", "friends", "friends", "solo", "friends", "solo", "solo", "solo", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Highway Driving", pool: "highway", primaryScene: "highway", secondaryScenes: ["road", "driving"],
                io: "outdoor", tod: "morning", concepts: ["highway", "road", "driving", "outdoor", "travel", "car"],
                synonyms: ["motorway", "freeway", "expressway"], startHour: 8, startMin: 30,
                images: Array.from({length: 15}, (_, i) => ({
                    desc: ["Open highway stretching to horizon", "Dashboard view of long straight road", "Passing semi-truck on highway", "Highway with mountain backdrop", "Road sign showing distance to destination", "Friends singing in car on highway", "Fuel gauge on dashboard during drive", "Multiple lanes of highway traffic", "Highway bridge crossing river", "Sun flare through windshield on highway"][i],
                    objects: [["highway", "road", "horizon"], ["dashboard", "road", "windshield"], ["truck", "highway", "lanes"], ["highway", "mountains", "sky"], ["sign", "distance", "road"], ["people", "car", "singing"], ["gauge", "dashboard", "fuel"], ["lanes", "traffic", "cars"], ["bridge", "river", "highway"], ["sun", "windshield", "road"]][i],
                    activities: [["driving"], ["driving"], ["passing"], ["driving"], ["reading"], ["singing"], ["checking"], ["driving"], ["crossing"], ["driving"]][i],
                    peopleCount: [0, 1, 0, 0, 0, 3, 0, 0, 0, 1][i],
                    gatheringType: (["solo", "solo", "solo", "solo", "solo", "friends", "solo", "solo", "solo", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Roadside Stop", pool: "landscape", primaryScene: "roadside", secondaryScenes: ["stop", "rest"],
                io: "outdoor", tod: "afternoon", concepts: ["roadside", "stop", "rest", "outdoor", "road trip"],
                synonyms: ["rest stop", "pit stop", "break"], startHour: 12, startMin: 0,
                images: Array.from({length: 6}, (_, i) => ({
                    desc: ["Rest stop with car parked on shoulder", "Stretching outside car at scenic spot", "Gas station stop on road trip", "Small roadside diner", "Friends eating snacks leaning on car", "Taking photos of roadside scenery", "Roadside wildflower field", "Car parked at overlook pullout", "Restroom and vending at rest area", "Walking along roadside path"][i],
                    objects: [["car", "shoulder", "road"], ["person", "car", "stretching"], ["gas station", "pumps", "sign"], ["diner", "building", "sign"], ["people", "car", "snacks"], ["camera", "scenery", "road"], ["wildflowers", "field", "road"], ["car", "overlook", "railing"], ["restroom", "vending", "building"], ["path", "road", "person"]][i],
                    activities: [["stopping"], ["stretching"], ["refueling"], ["eating"], ["snacking"], ["photographing"], ["admiring"], ["viewing"], ["resting"], ["walking"]][i],
                    peopleCount: [0, 1, 1, 0, 3, 1, 0, 0, 1, 1][i],
                    gatheringType: (["solo", "solo", "solo", "solo", "friends", "solo", "solo", "solo", "solo", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Scenic Viewpoint", pool: "mountain", primaryScene: "viewpoint", secondaryScenes: ["scenic", "landscape"],
                io: "outdoor", tod: "afternoon", concepts: ["viewpoint", "scenic", "landscape", "outdoor", "road trip", "panorama"],
                synonyms: ["overlook", "vista", "scenic point"], startHour: 14, startMin: 30,
                images: Array.from({length: 3}, (_, i) => ({
                    desc: ["Panoramic viewpoint of valley below", "Group photo at scenic overlook", "Mountain range from roadside viewpoint", "Informational plaque at viewpoint", "Person looking out from viewpoint railing", "Camera on tripod at scenic spot", "Rolling hills visible from elevated road", "Winding road visible from viewpoint", "Sunset beginning at scenic lookout", "Car parked at designated viewpoint area"][i],
                    objects: [["viewpoint", "valley", "railing"], ["group", "overlook", "scenery"], ["mountains", "range", "sky"], ["plaque", "text", "post"], ["person", "railing", "view"], ["camera", "tripod", "scenery"], ["hills", "road", "elevation"], ["road", "winding", "valley"], ["sunset", "lookout", "sky"], ["car", "viewpoint", "parking"]][i],
                    activities: [["viewing"], ["posing"], ["admiring"], ["reading"], ["looking"], ["photographing"], ["viewing"], ["viewing"], ["watching"], ["parking"]][i],
                    peopleCount: [0, 4, 0, 0, 1, 1, 0, 0, 2, 0][i],
                    gatheringType: (["solo", "friends", "solo", "solo", "solo", "solo", "solo", "solo", "pair", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Small-Town Restaurant", pool: "restaurant", primaryScene: "restaurant", secondaryScenes: ["small town", "local"],
                io: "indoor", tod: "evening", concepts: ["restaurant", "food", "dinner", "indoor", "small town", "evening"],
                synonyms: ["diner", "eatery", "local restaurant"], startHour: 18, startMin: 0,
                images: Array.from({length: 1}, (_, i) => ({
                    desc: ["Small town restaurant facade at evening", "Cozy restaurant interior with checkered tablecloths", "Local specialty dish on plate", "Waitress taking order at table", "Friends at restaurant booth", "Restaurant wall with local photos", "Burger and fries plate", "Drinks being served at table", "View through restaurant window of small main street", "Receipt and tip on table after meal"][i],
                    objects: [["facade", "sign", "lights"], ["tablecloth", "table", "chairs"], ["dish", "plate", "food"], ["waitress", "notepad", "table"], ["booth", "people", "food"], ["wall", "photos", "frames"], ["burger", "fries", "plate"], ["drinks", "glasses", "table"], ["window", "street", "night"], ["receipt", "table", "money"]][i],
                    activities: [["arriving"], ["sitting"], ["eating"], ["ordering"], ["eating", "talking"], ["looking"], ["eating"], ["drinking"], ["gazing"], ["paying"]][i],
                    peopleCount: [0, 0, 0, 2, 3, 0, 0, 2, 0, 0][i],
                    gatheringType: (["solo", "solo", "solo", "pair", "friends", "solo", "solo", "friends", "solo", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Overnight Hotel", pool: "hotel_room", primaryScene: "hotel", secondaryScenes: ["overnight", "rest"],
                io: "indoor", tod: "night", concepts: ["hotel", "room", "night", "indoor", "rest", "overnight"],
                synonyms: ["motel", "accommodation", "lodging"], startHour: 21, startMin: 0,
                images: Array.from({length: 6}, (_, i) => ({
                    desc: ["Roadside hotel exterior with neon sign", "Small hotel room with two beds", "Dropping bags on hotel room floor", "Hotel TV showing late night program", "Looking out hotel window at parking lot", "Hotel bathroom with travel toiletries", "Alarm clock on bedside table", "Hotel room hallway at night", "Charger plugged in on hotel desk", "Exhausted in hotel bed after long drive"][i],
                    objects: [["hotel", "sign", "neon"], ["beds", "room", "lamp"], ["bags", "floor", "room"], ["TV", "screen", "bed"], ["window", "parking", "night"], ["bathroom", "toiletries", "mirror"], ["alarm", "clock", "table"], ["hallway", "doors", "carpet"], ["charger", "desk", "phone"], ["bed", "person", "pillows"]][i],
                    activities: [["arriving"], ["entering"], ["dropping bags"], ["watching"], ["looking"], ["freshening up"], ["setting alarm"], ["walking"], ["charging"], ["sleeping"]][i],
                    peopleCount: [0, 0, 1, 1, 1, 0, 0, 0, 0, 1][i],
                    gatheringType: (["solo", "solo", "solo", "solo", "solo", "solo", "solo", "solo", "solo", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
        ]
    },

    // ════════════════════════════════════════════════════════════
    // EPISODE 12 — FESTIVAL / NIGHT MARKET / SOCIAL EVENT
    // ════════════════════════════════════════════════════════════
    {
        id: "ep12_festival", name: "Festival / Night Market", date: "2026-08-21",
        events: [
            {
                name: "Arrival", pool: "city_street", primaryScene: "street", secondaryScenes: ["evening", "arrival"],
                io: "outdoor", tod: "evening", concepts: ["street", "evening", "arrival", "outdoor", "festival"],
                synonyms: ["getting there", "approaching"], startHour: 17, startMin: 0,
                images: Array.from({length: 7}, (_, i) => ({
                    desc: ["Evening street leading to festival area", "Banners and signs for festival event", "Parking near festival grounds", "Walking toward festival entrance", "Festival entrance with decorative arch", "Ticket booth at event entrance", "Crowd streaming toward festival", "Friends meeting up at festival entrance", "Street performers near festival area", "Approaching festival lights visible from street"][i],
                    objects: [["street", "lights", "evening"], ["banners", "signs", "posts"], ["parking", "cars", "lot"], ["people", "path", "entrance"], ["entrance", "arch", "decorations"], ["booth", "tickets", "sign"], ["crowd", "people", "walking"], ["friends", "entrance", "meeting"], ["performers", "street", "crowd"], ["lights", "festival", "street"]][i],
                    activities: [["walking"], ["reading"], ["parking"], ["approaching"], ["entering"], ["buying tickets"], ["walking"], ["meeting"], ["watching"], ["approaching"]][i],
                    peopleCount: [2, 0, 0, 4, 3, 1, 8, 4, 5, 3][i],
                    gatheringType: (["friends", "solo", "solo", "friends", "friends", "solo", "crowd", "friends", "public-gathering", "friends"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Crowd Gathering", pool: "crowd", primaryScene: "crowd", secondaryScenes: ["gathering", "festival"],
                io: "outdoor", tod: "evening", concepts: ["crowd", "gathering", "festival", "outdoor", "people", "event"],
                synonyms: ["masses", "throng", "multitude"], startHour: 18, startMin: 0,
                images: Array.from({length: 8}, (_, i) => ({
                    desc: ["Large crowd at outdoor festival", "People watching stage performance", "Dense crowd with festive atmosphere", "Aerial view of festival gathering", "Friends in crowd wearing festival gear", "Crowd surging toward main stage", "Families in crowd at festival", "Crowd clapping and cheering", "Sea of people at outdoor event", "Close-up of animated crowd faces"][i],
                    objects: [["crowd", "people", "festival"], ["stage", "crowd", "lights"], ["crowd", "festive", "atmosphere"], ["aerial", "crowd", "tents"], ["friends", "gear", "crowd"], ["crowd", "stage", "people"], ["families", "children", "crowd"], ["crowd", "clapping", "hands"], ["people", "event", "sky"], ["faces", "crowd", "expressions"]][i],
                    activities: [["gathering"], ["watching"], ["celebrating"], ["gathering"], ["enjoying"], ["surging"], ["enjoying"], ["cheering"], ["gathering"], ["reacting"]][i],
                    peopleCount: [20, 15, 25, 30, 4, 20, 8, 15, 25, 10][i],
                    gatheringType: (["crowd", "crowd", "crowd", "crowd", "friends", "crowd", "family", "crowd", "crowd", "crowd"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Market Stalls", pool: "market_stalls", primaryScene: "market", secondaryScenes: ["stalls", "vendors"],
                io: "outdoor", tod: "evening", concepts: ["market", "stalls", "vendors", "outdoor", "night market", "shopping"],
                synonyms: ["bazaar", "market stalls", "vendor booths"], startHour: 19, startMin: 0,
                images: Array.from({length: 6}, (_, i) => ({
                    desc: ["Row of market stalls with colorful goods", "Vendor displaying handmade crafts", "Jewelry and accessories stall", "Browsing vintage items at market", "Clothing stall with hanging fabrics", "Artisan booth with pottery", "Incense and candle stall", "Friends browsing market stalls", "Haggling at market vendor", "Gift wrapping at market purchase"][i],
                    objects: [["stalls", "goods", "colors"], ["vendor", "crafts", "table"], ["jewelry", "accessories", "display"], ["items", "vintage", "table"], ["clothing", "fabric", "stall"], ["pottery", "booth", "artisan"], ["incense", "candles", "stall"], ["friends", "stalls", "market"], ["vendor", "customer", "goods"], ["wrapping", "gift", "bag"]][i],
                    activities: [["browsing"], ["selling"], ["looking"], ["browsing"], ["looking"], ["admiring"], ["smelling"], ["browsing"], ["haggling"], ["wrapping"]][i],
                    peopleCount: [3, 1, 1, 2, 0, 1, 0, 3, 2, 1][i],
                    gatheringType: (["public-gathering", "solo", "solo", "pair", "solo", "solo", "solo", "friends", "pair", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Street Food", pool: "food", primaryScene: "food", secondaryScenes: ["street food", "market"],
                io: "outdoor", tod: "evening", concepts: ["food", "street food", "eating", "outdoor", "market", "night"],
                synonyms: ["market food", "snacks", "festival food"], startHour: 20, startMin: 0,
                images: Array.from({length: 2}, (_, i) => ({
                    desc: ["Street food stall with smoking grill", "Close-up of grilled skewers", "Food vendor cooking in open kitchen", "Friends sharing street food on standing table", "Bubble tea stall with colorful menu", "Nachos and dips at festival food stand", "Ice cream from festival vendor", "Hot soup from street stall", "Food tray with festival variety", "Eating messy street food with hands"][i],
                    objects: [["stall", "grill", "smoke"], ["skewers", "grill", "food"], ["vendor", "kitchen", "cooking"], ["friends", "food", "table"], ["bubble tea", "menu", "stall"], ["nachos", "dips", "stand"], ["ice cream", "cone", "vendor"], ["soup", "bowl", "stall"], ["tray", "food", "variety"], ["food", "hands", "napkin"]][i],
                    activities: [["cooking"], ["grilling"], ["cooking"], ["sharing", "eating"], ["ordering"], ["eating"], ["eating"], ["eating"], ["carrying"], ["eating"]][i],
                    peopleCount: [1, 0, 1, 3, 1, 0, 1, 1, 0, 1][i],
                    gatheringType: (["solo", "solo", "solo", "friends", "solo", "solo", "solo", "solo", "solo", "solo"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Night Lights Event", pool: "night_lights", primaryScene: "night", secondaryScenes: ["lights", "festival"],
                io: "outdoor", tod: "night", concepts: ["night", "lights", "festival", "outdoor", "event", "atmosphere"],
                synonyms: ["night event", "light show", "illumination"], startHour: 21, startMin: 0,
                images: Array.from({length: 4}, (_, i) => ({
                    desc: ["Festival lit up with colorful string lights", "Stage with bright spotlights at night", "Lanterns hanging over festival path", "Light installations in festival area", "Neon signs at night market", "Crowd watching lit performance", "Friends under fairy lights at festival", "Festival ferris wheel lit at night", "Sparklers and handheld lights in crowd", "Panoramic shot of entire lit festival"][i],
                    objects: [["lights", "strings", "colors"], ["stage", "spotlights", "night"], ["lanterns", "path", "light"], ["installations", "art", "lights"], ["neon", "signs", "market"], ["crowd", "performance", "lights"], ["friends", "fairy lights", "smiles"], ["ferris wheel", "lights", "sky"], ["sparklers", "crowd", "hands"], ["festival", "panorama", "lights"]][i],
                    activities: [["viewing"], ["watching"], ["walking"], ["admiring"], ["browsing"], ["watching"], ["posing"], ["riding"], ["celebrating"], ["viewing"]][i],
                    peopleCount: [5, 10, 2, 3, 0, 15, 4, 3, 8, 20][i],
                    gatheringType: (["public-gathering", "crowd", "pair", "friends", "solo", "crowd", "friends", "friends", "crowd", "crowd"] as ImageDef["gatheringType"][])[i]
                }))
            },
            {
                name: "Leaving Festival", pool: "night_city", primaryScene: "night", secondaryScenes: ["leaving", "street"],
                io: "outdoor", tod: "night", concepts: ["night", "leaving", "street", "outdoor", "city"],
                synonyms: ["heading home", "departing"], startHour: 23, startMin: 0,
                images: Array.from({length: 2}, (_, i) => ({
                    desc: ["Walking away from festival lights", "Night street with thinning crowd", "Friends walking home from festival", "Street vendor packing up for night", "Taxi line outside festival", "Night city street after event", "Carrying purchased market goods home", "Festival entrance arch now quiet", "Night sky with distant festival glow", "Last look back at festival lights"][i],
                    objects: [["lights", "back", "path"], ["street", "people", "night"], ["friends", "street", "walking"], ["vendor", "packing", "stall"], ["taxis", "line", "people"], ["street", "city", "night"], ["bags", "goods", "person"], ["arch", "entrance", "quiet"], ["sky", "glow", "night"], ["lights", "festival", "back"]][i],
                    activities: [["walking away"], ["walking"], ["walking", "talking"], ["packing"], ["waiting"], ["walking"], ["carrying"], ["leaving"], ["viewing"], ["looking back"]][i],
                    peopleCount: [2, 4, 3, 1, 5, 1, 1, 0, 0, 2][i],
                    gatheringType: (["pair", "public-gathering", "friends", "solo", "public-gathering", "solo", "solo", "solo", "solo", "pair"] as ImageDef["gatheringType"][])[i]
                }))
            },
        ]
    },
];


// ── GENERATOR ──────────────────────────────────────────────────

export function generateGroundTruthDatabase() {
    const images: ImageRecord[] = [];
    const events: Record<string, EventRecord> = {};
    const episodes: Record<string, EpisodeRecord> = {};

    let globalIdx = 0;

    for (let epIdx = 0; epIdx < EPISODES.length; epIdx++) {
        const ep = EPISODES[epIdx];
        const yearMonth = ep.date.substring(0, 8); // e.g., "2021-03-"

        episodes[ep.id] = {
            episodeId: ep.id,
            title: ep.name,
            startTime: `${yearMonth}01T00:00:00`,
            endTime: `${yearMonth}28T23:59:00`,
            eventIds: []
        };

        const totalEvents = ep.events.length;
        const daysPerEvent = Math.floor(28 / totalEvents); // e.g. 28/3 = 9 days per event

        for (let evIdx = 0; evIdx < totalEvents; evIdx++) {
            const ev = ep.events[evIdx];
            const eventId = `${ep.id}_ev${(evIdx + 1).toString().padStart(2, '0')}`;
            episodes[ep.id].eventIds.push(eventId);

            const prevEventId = evIdx > 0 ? `${ep.id}_ev${evIdx.toString().padStart(2, '0')}` : null;
            const nextEventId = evIdx < totalEvents - 1 ? `${ep.id}_ev${(evIdx + 2).toString().padStart(2, '0')}` : null;

            // Define chronological window for THIS EVENT so they do not overlap
            const startDay = (evIdx * daysPerEvent) + 1;
            const endDay = evIdx === totalEvents - 1 ? 28 : startDay + daysPerEvent - 1;

            events[eventId] = {
                eventId,
                episodeId: ep.id,
                order: evIdx,
                title: ev.name,
                startTime: `${yearMonth}${startDay.toString().padStart(2, '0')}T00:00:00`,
                endTime: `${yearMonth}${endDay.toString().padStart(2, '0')}T23:59:00`,
                concepts: ev.concepts,
                previousEventId: prevEventId,
                nextEventId: nextEventId,
                imageIds: []
            };

            for (let imgIdx = 0; imgIdx < ev.images.length; imgIdx++) {
                const imgDef = ev.images[imgIdx];
                const imgId = `${ep.id}_ev${(evIdx + 1).toString().padStart(2, '0')}_img${(imgIdx + 1).toString().padStart(2, '0')}`;

                // Cluster images into 1-2 days so we can have 5-6 pictures in a single day group
                const numDaysToUse = Math.min(2, endDay - startDay + 1);
                const dayOffset = Math.floor((imgIdx / ev.images.length) * numDaysToUse);
                const randomDay = startDay + dayOffset;
                const imgDateStr = `${yearMonth}${randomDay.toString().padStart(2, '0')}`;

                const imgHour = ev.startHour;
                const imgMinFinal = ev.startMin + imgIdx; // offset min slightly
                
                const timestamp = `${imgDateStr}T${Math.min(imgHour, 23).toString().padStart(2, '0')}:${(imgMinFinal % 60).toString().padStart(2, '0')}:00`;

                const { url, highUrl } = getPoolImageUrl(ev.pool, globalIdx);

                const prevImgId = imgIdx > 0 ? `${ep.id}_ev${(evIdx + 1).toString().padStart(2, '0')}_img${imgIdx.toString().padStart(2, '0')}` : null;
                const nextImgId = imgIdx < ev.images.length - 1 ? `${ep.id}_ev${(evIdx + 1).toString().padStart(2, '0')}_img${(imgIdx + 2).toString().padStart(2, '0')}` : null;

                const filename = `IMG_${imgDateStr.replace(/-/g, '')}_${globalIdx.toString().padStart(4, '0')}.jpg`;

                const record: ImageRecord = {
                    id: imgId,
                    filename,
                    filepath: url,
                    highResUrl: highUrl,

                    visual: {
                        description: imgDef.desc,
                        primaryScene: ev.primaryScene,
                        secondaryScenes: ev.secondaryScenes,
                        indoorOutdoor: ev.io,
                        timeOfDay: ev.tod,
                        peopleCount: imgDef.peopleCount,
                        gatheringType: imgDef.gatheringType,
                        objects: imgDef.objects,
                        activities: imgDef.activities,
                    },

                    search: {
                        canonicalConcepts: [...ev.concepts],
                        synonyms: ev.synonyms,
                    },

                    episode: {
                        episodeId: ep.id,
                        episodeName: ep.name,
                        episodeOrder: epIdx + 1,
                    },

                    event: {
                        eventId,
                        eventName: ev.name,
                        eventOrder: evIdx + 1,
                    },

                    sequence: {
                        imageOrderInEvent: imgIdx + 1,
                        globalSequenceIndex: globalIdx,
                    },

                    timestamp: {
                        value: timestamp,
                        source: "demo-curated" as const,
                    },

                    relationships: {
                        previousImageId: prevImgId,
                        nextImageId: nextImgId,
                        previousEventId: prevEventId,
                        nextEventId: nextEventId,
                    },

                    quality: {
                        groundTruthValidated: true,
                        visualMetadataMatch: true,
                    },

                    scene: { primary: ev.primaryScene, secondary: ev.secondaryScenes },
                    objects: imgDef.objects,
                    environment: {
                        indoorOutdoor: ev.io,
                        timeOfDay: ev.tod,
                        weather: ev.io === 'outdoor' ? 'clear' : 'unknown',
                    },
                    semanticConcepts: [...ev.concepts, ...ev.synonyms],
                    groundTruthConcepts: [...ev.concepts, ev.primaryScene],
                    inferredConcepts: ev.synonyms.map(s => ({ value: s, confidence: 0.85 })),
                    description: imgDef.desc,
                    timestampFlat: timestamp,
                    confidence: { visual: 0.95, metadata: 0.95 },
                    boundary: {
                        previousEventId: prevEventId,
                        nextEventId: nextEventId,
                    },
                };

                images.push(record);
                events[eventId].imageIds.push(imgId);
                globalIdx++;
            }
        }
    }

    // Sort images by timestamp so the UI grid looks completely natural chronologically
    images.sort((a, b) => a.timestampFlat.localeCompare(b.timestampFlat));

    return {
        images,
        events: Object.values(events),
        episodes: Object.values(episodes),
        datasetVersion: "memory-demo-v2-720",
        stats: {
            totalImages: images.length,
            totalEpisodes: Object.keys(episodes).length,
            totalEvents: Object.keys(events).length,
        }
    };
}

export const mockDatabase = generateGroundTruthDatabase();
