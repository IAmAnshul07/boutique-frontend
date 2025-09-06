import { NextResponse } from "next/server";
import { resetSession } from "@/lib/sessionlens";

export async function POST() {
  try {
    resetSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SessionLens reset API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 