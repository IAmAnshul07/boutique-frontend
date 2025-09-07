"use client";
import { useEffect } from "react";
import { useSessionLens } from "@/hooks/useSessionLens";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface PageTrackerProps {
  pathname: string;
}

export const PageTracker: React.FC<PageTrackerProps> = ({ pathname }) => {
  const { trackEvent, initialized } = useSessionLens();
  const { user } = useSelector((state: RootState) => state.userReducer);

  // Track page views
  useEffect(() => {
    if (pathname && initialized) {
      // Initialize session tracking
      if (!(window as any).sessionStartTime) {
        (window as any).sessionStartTime = Date.now();
        (window as any).pageViewsInSession = 0;
        (window as any).searchesInSession = 0;
        (window as any).filtersUsedInSession = 0;
      }

      trackEvent("page_view", {
        page: pathname,
        user_id: user?.id || "anonymous",
        user_role: user?.role || "guest",
        is_logged_in: !!user,
        title: document.title,
        referrer: document.referrer || "direct",
        page_load_time: performance.now(),
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
        screen_resolution: `${screen.width}x${screen.height}`,
        viewport_size: `${window.innerWidth}x${window.innerHeight}`,
        browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                 navigator.userAgent.includes('Firefox') ? 'Firefox' : 
                 navigator.userAgent.includes('Safari') ? 'Safari' : 'Other',
        session_duration: Date.now() - (window as any).sessionStartTime || 0,
        page_views_in_session: (window as any).pageViewsInSession || 1,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        utm_source: new URLSearchParams(window.location.search).get('utm_source'),
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
        timestamp: new Date().toISOString(),
        local_time: new Date().toLocaleString(),
        event_summary: `${user?.role || "Guest"} user viewed ${pathname} page (${(window as any).pageViewsInSession || 1}th page in session)`
      });
      
      // Increment page view counter
      (window as any).pageViewsInSession = ((window as any).pageViewsInSession || 0) + 1;
      (window as any).pageStartTime = Date.now();
    }
  }, [pathname, trackEvent, initialized]);

  // Track scroll events
  useEffect(() => {
    if (!initialized) return;

    let scrollTimeout: NodeJS.Timeout;
    let lastScrollDepth = 0;
    
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollDepth = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        
        // Track significant scroll milestones
        if (scrollDepth > lastScrollDepth && scrollDepth % 25 === 0 && scrollDepth <= 100) {
          trackEvent("scroll", {
            depth: scrollDepth,
            direction: "down",
            target: pathname,
            user_id: user?.id || "anonymous",
            user_role: user?.role || "guest",
            is_logged_in: !!user,
            time_on_page: Date.now() - (window as any).pageStartTime || 0,
            device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
            session_duration: Date.now() - (window as any).sessionStartTime || 0,
            timestamp: new Date().toISOString(),
            event_summary: `User scrolled ${scrollDepth}% down on ${pathname} page`
          });
          lastScrollDepth = scrollDepth;
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [pathname, trackEvent, initialized]);

  // Track page visibility changes
  useEffect(() => {
    if (!initialized) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackEvent("app_state_change", {
          state: "background",
          page: pathname,
          user_id: user?.id || "anonymous",
          time_on_page: Date.now() - (window as any).pageStartTime || 0,
          device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
          timestamp: new Date().toISOString(),
          event_summary: `User switched to background on ${pathname} page`
        });
      } else {
        trackEvent("app_state_change", {
          state: "foreground",
          page: pathname,
          user_id: user?.id || "anonymous",
          time_on_page: Date.now() - (window as any).pageStartTime || 0,
          device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
          timestamp: new Date().toISOString(),
          event_summary: `User returned to foreground on ${pathname} page`
        });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [pathname, trackEvent, initialized]);

  return null; // This component doesn't render anything
};
