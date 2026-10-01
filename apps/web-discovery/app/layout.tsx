import "./globals.css"

import { db, evidenceRecords } from "@/lib/database/client";
import { sql } from "drizzle-orm";
import Link from 'next/link';

export const metadata = {
  title: 'Discovery Engine | Photo Retrieval Research',
  description: 'Understand why people fail to find photos they remember.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let evidenceCount = 0;
  try {
    const countRes = await db.select({ count: sql<number>`count(*)::int` }).from(evidenceRecords);
    evidenceCount = countRes[0]?.count || 0;
  } catch (error) {
    console.error("Failed to fetch evidence count", error);
  }

  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://fonts.gstatic.com" rel="preconnect" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Outfit:wght@500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body-md text-body-md text-on-surface flex flex-col min-h-screen">
        
        <header className="absolute top-0 left-0 right-0 h-16 z-50 bg-white/5 backdrop-blur-2xl border-b border-white/10">
          <div className="h-16 w-full px-gutter flex items-center justify-between gap-space-md max-w-[1600px] mx-auto">
            <div className="flex items-center gap-space-lg">
              <div className="flex items-center gap-space-sm">
                <span className="material-symbols-outlined text-primary text-[22px]">auto_awesome</span>
                <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface">Discovery Engine</span>
              </div>
              <nav className="hidden md:flex items-center gap-space-sm ml-4">
                <Link href="/" className="px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-md text-label-md">
                  Discovery Dashboard
                </Link>
                <Link href="/evidence" className="px-space-md py-space-sm rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors font-label-md text-label-md">
                  Evidence & Ask AI
                </Link>
              </nav>
            </div>
            <div className="flex items-center gap-space-md">
              <div className="hidden md:flex flex-col items-end">
                <div className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span className="">Dataset Active</span>
                </div>
                <span className="text-[11px] text-on-surface-variant/70">{evidenceCount} records processed</span>
              </div>
            </div>
          </div>
        </header>
        
        <div className="w-full flex-1 pt-16">
          <main className="w-full h-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
