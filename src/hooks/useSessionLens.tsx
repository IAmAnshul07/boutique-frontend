import { useCallback } from "react";
import { sessionLensInstance } from "../lib/sessionlens";
import { SessionLensEvent, SessionLensUser } from "@sessionlens/sdk";

export const useSessionLens = () => {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    const event: SessionLensEvent = {
      event_name: eventName,
      properties: {
        ...properties,
        // Add summary inside the properties
        event_summary: properties?.event_summary || `${eventName} event occurred`,
        // Add timestamp for better tracking
        event_timestamp: new Date().toISOString(),
        // Add session context
        session_id: (window as any).sessionId || "unknown",
        page_url: window.location.href,
        page_title: document.title
      },
      timestamp: Math.floor(Date.now()),
    };
    sessionLensInstance?.sessionLensTrack(event);
  }, []);

  const identifyUser = useCallback((user: SessionLensUser) => {
    sessionLensInstance?.sessionLensIdentify(user);
  }, []);

  const resetSession = useCallback(() => {
    sessionLensInstance?.sessionLensReset();
  }, []);

  return {
    trackEvent,
    identifyUser,
    resetSession,
  };
};
