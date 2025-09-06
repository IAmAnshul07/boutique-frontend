import { useCallback } from "react";
import { sessionLensInstance } from "../lib/sessionlens";
import { SessionLensEvent, SessionLensUser } from "@sessionlens/sdk";

export const useSessionLens = () => {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    const event: SessionLensEvent = {
      event_name: eventName,
      properties,
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
