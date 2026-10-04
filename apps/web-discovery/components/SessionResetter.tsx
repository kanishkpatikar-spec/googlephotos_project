"use client";

import { useEffect, useRef } from "react";
import { runPipelineAction } from "@/app/actions/pipeline";
import { useRouter } from "next/navigation";

export function SessionResetter() {
  const router = useRouter();
  const hasReset = useRef(false);

  useEffect(() => {
    // Only run once per session
    if (hasReset.current) return;
    
    const isInitialized = sessionStorage.getItem("demo_initialized");
    
    if (!isInitialized) {
      hasReset.current = true;
      sessionStorage.setItem("demo_initialized", "true");
      
      console.log("New session detected: Resetting Discovery Engine data to baseline...");
      
      runPipelineAction('reset').then(() => {
        router.refresh();
      }).catch(err => {
        console.error("Failed to reset pipeline:", err);
      });
    }
  }, [router]);

  return null;
}
