"use client";
import React, { useEffect } from "react";
import { initSessionLens, isInitialized as sessionLensInitialized } from "@/lib/sessionlens";

interface SessionLensInitializerProps {
  children?: React.ReactNode;
  onInitialized?: () => void;
  onError?: (error: Error) => void;
}

export const SessionLensInitializer: React.FC<SessionLensInitializerProps> = ({ children, onInitialized, onError }) => {
  useEffect(() => {
    const initialize = async () => {
      if (sessionLensInitialized) {
        onInitialized?.();
        return;
      }

      try {
        const success = await initSessionLens();

        if (success) {
          onInitialized?.();
        } else {
          onError?.(new Error("SessionLens initialization failed"));
        }
      } catch (error) {
        onError?.(error as Error);
      }
    };

    initialize();
  }, [onInitialized, onError]);

  if (children) {
    return <>{children}</>;
  }

  return null;
};
