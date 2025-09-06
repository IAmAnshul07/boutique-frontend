"use client";
import { useEffect } from "react";
import { useSessionLens } from "@/hooks/useSessionLens";

interface PageTrackerProps {
  pathname: string;
}

export const PageTracker: React.FC<PageTrackerProps> = ({ pathname }) => {
  const { trackEvent, initialized } = useSessionLens();

  // Track page views
  useEffect(() => {
    if (pathname && initialized) {
      trackEvent("page_viewed", {
        page: pathname,
        timestamp: Date.now(),
      });
    }
  }, [pathname, trackEvent, initialized]);

  return null; // This component doesn't render anything
};
