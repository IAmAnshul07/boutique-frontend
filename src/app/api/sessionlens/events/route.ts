import { NextRequest, NextResponse } from "next/server";
import { trackEvent } from "@/lib/sessionlens";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventName, properties } = body;

    if (!eventName) {
      return NextResponse.json(
        { error: "eventName is required" },
        { status: 400 }
      );
    }

    trackEvent(eventName, properties);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SessionLens events API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 