import { NextResponse } from "next/server";
import { runPipelineAction } from "@/app/actions/pipeline";

export async function GET() {
  await runPipelineAction();
  return NextResponse.json({ success: true });
}
