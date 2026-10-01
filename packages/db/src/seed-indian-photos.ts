import { db } from "./index";
import { photoAssets, photoMetadata } from "./schema";
import { nanoid } from "nanoid";

const categories = [
  "Medicine",
  "Travel",
  "Food",
  "Festivals",
  "Daily Life",
  "Family",
  "Documents",
];

const locations = [
  "Mumbai, Maharashtra",
  "Delhi, NCR",
  "Bangalore, Karnataka",
  "Goa",
  "Kerala",
  "Manali, Himachal Pradesh",
  "Jaipur, Rajasthan",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Pune, Maharashtra",
];

const medicines = [
  "Crocin Pain Relief",
  "Dolo 650 strip on desk",
  "Cough syrup bottle (Benadryl)",
  "Vitamin C tablets",
  "Prescription paper from Apollo Hospital",
  "First aid kit",
  "Ayurvedic medicine bottle (Patanjali)",
  "Vicks VapoRub jar",
];

const foods = [
  "Chicken Biryani at a restaurant",
  "Masala Dosa with Chutney",
  "Cutting Chai in a glass",
  "Samosa on a paper plate",
  "Paneer Tikka skewers",
  "Thali meal",
  "Jalebi and Fafda",
  "Golgappa street food stall",
];

const festivals = [
  "Diwali diyas lighting",
  "Holi colors thrown in air",
  "Ganesh Chaturthi idol",
  "Durga Puja pandal",
  "Navratri Garba dance",
  "Eid celebration feast",
  "Christmas tree in mall",
  "Raksha Bandhan rakhi on wrist",
];

const travelContexts = [
  "Train journey window seat",
  "Beach sunset",
  "Mountain view with snow",
  "Historical monument",
  "Busy market street",
  "Auto rickshaw ride",
  "Tea garden",
  "Temple visit",
];

const adjectives = ["bright", "blurry", "dark", "sunny", "rainy", "night time", "indoor", "outdoor"];

function getRandomItem(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function seedIndianPhotos() {
  console.log("Seeding 500 Indian context photos...");

  const assets = [];
  const metadata = [];

  for (let i = 0; i < 500; i++) {
    const id = nanoid();
    const category = getRandomItem(categories);
    let subject = "";
    let tags = "";

    if (category === "Medicine") {
      subject = getRandomItem(medicines);
      tags = "medicine, health, pills, prescription, pharmacy";
    } else if (category === "Food") {
      subject = getRandomItem(foods);
      tags = "food, indian, spicy, meal, restaurant, street food";
    } else if (category === "Festivals") {
      subject = getRandomItem(festivals);
      tags = "festival, celebration, india, culture, tradition";
    } else if (category === "Travel") {
      subject = getRandomItem(travelContexts);
      tags = "travel, trip, india, tourism, vacation";
    } else {
      subject = `Daily scene with ${getRandomItem(["laptop", "books", "friends", "scooter", "shopping bags"])}`;
      tags = "daily, lifestyle, casual, random";
    }

    const loc = getRandomItem(locations);
    const adj = getRandomItem(adjectives);
    const caption = `${adj} photo of ${subject} in ${loc}`;

    // Using placeholder images for demo
    const keyword = category.toLowerCase();
    const filepath = `https://source.unsplash.com/random/400x300/?india,${keyword},${i}`;

    assets.push({
      id,
      filename: `IMG_${2020 + Math.floor(Math.random() * 4)}${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}_${Math.floor(Math.random() * 9999)}.jpg`,
      filepath,
      mimeType: "image/jpeg",
      fileSize: Math.floor(Math.random() * 5000000) + 500000,
      category,
      dataMode: "research",
    });

    metadata.push({
      id: nanoid(),
      assetId: id,
      locationName: loc,
      semanticCaption: caption,
      detectedObjects: tags,
    });
  }

  // Insert in batches
  for (let i = 0; i < assets.length; i += 50) {
    const assetBatch = assets.slice(i, i + 50);
    const metaBatch = metadata.slice(i, i + 50);
    await db.insert(photoAssets).values(assetBatch).onConflictDoNothing();
    await db.insert(photoMetadata).values(metaBatch).onConflictDoNothing();
  }

  console.log("Seeded 500 photos successfully.");
  process.exit(0);
}

seedIndianPhotos().catch(console.error);
