import { NextRequest, NextResponse } from "next/server";
import { identifyUser } from "@/lib/sessionlens";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, properties } = body;

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    identifyUser(userId, properties);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SessionLens identify API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 