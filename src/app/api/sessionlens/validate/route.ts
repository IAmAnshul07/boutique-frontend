import { NextResponse } from "next/server";
import { isInitialized, sessionLensInstance } from "@/lib/sessionlens";
import { validateSessionLensConfig } from "@/config/sessionLens.config";

export async function GET() {
  try {
    const configValid = validateSessionLensConfig();
    const initialized = isInitialized;
    const hasInstance = !!sessionLensInstance;

    return NextResponse.json({
      success: true,
      data: {
        configValid,
        initialized,
        hasInstance,
        status: configValid && initialized && hasInstance ? "ready" : "not_ready",
      },
    });
  } catch (error) {
    console.error("SessionLens validate API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 