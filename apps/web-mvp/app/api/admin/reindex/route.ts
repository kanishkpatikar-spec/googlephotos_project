import { NextResponse } from "next/server";
import { mockDatabase } from "../../../../lib/mock-database";
import fs from "fs/promises";
import path from "path";

export async function POST() {
    try {
        const publicDataPath = path.join(process.cwd(), "public", "data");
        
        // Ensure directory exists
        try {
            await fs.access(publicDataPath);
        } catch {
            await fs.mkdir(publicDataPath, { recursive: true });
        }

        const indexPath = path.join(publicDataPath, "search-index.json");
        
        const payload = {
            metadataVersion: 2,
            lastIndexed: new Date().toISOString(),
            data: mockDatabase
        };

        await fs.writeFile(indexPath, JSON.stringify(payload, null, 2), "utf-8");

        return NextResponse.json({ 
            success: true, 
            message: "Reindexed successfully", 
            counts: {
                images: mockDatabase.images.length,
                events: mockDatabase.events.length,
                episodes: mockDatabase.episodes.length
            },
            path: indexPath
        });
    } catch (error) {
        console.error("Reindex Error:", error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
