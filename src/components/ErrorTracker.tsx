"use client";
import { useEffect } from "react";
import { useSessionLens } from "@/hooks/useSessionLens";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ErrorTracker: React.FC = () => {
  const { trackEvent } = useSessionLens();
  const { user } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
    // Track JavaScript errors
    const handleError = (event: ErrorEvent) => {
      trackEvent("error", {
        error_type: "javascript_error",
        error_message: event.message,
        error_filename: event.filename,
        error_lineno: event.lineno,
        error_colno: event.colno,
        error_stack: event.error?.stack,
        user_id: user?.id || "anonymous",
        user_role: user?.role || "guest",
        is_logged_in: !!user,
        page_url: window.location.href,
        page_title: document.title,
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
        browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 
                 navigator.userAgent.includes('Firefox') ? 'Firefox' : 
                 navigator.userAgent.includes('Safari') ? 'Safari' : 'Other',
        session_duration: Date.now() - (window as any).sessionStartTime || 0,
        timestamp: new Date().toISOString(),
        event_summary: `JavaScript error: ${event.message} in ${event.filename}:${event.lineno}`
      });
    };

    // Track unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      trackEvent("error", {
        error_type: "unhandled_promise_rejection",
        error_message: event.reason?.message || String(event.reason),
        error_stack: event.reason?.stack,
        user_id: user?.id || "anonymous",
        user_role: user?.role || "guest",
        is_logged_in: !!user,
        page_url: window.location.href,
        page_title: document.title,
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
        session_duration: Date.now() - (window as any).sessionStartTime || 0,
        timestamp: new Date().toISOString(),
        event_summary: `Unhandled promise rejection: ${event.reason?.message || String(event.reason)}`
      });
    };

    // Track resource loading errors
    const handleResourceError = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target && (target.tagName === 'IMG' || target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
        trackEvent("error", {
          error_type: "resource_load_error",
          resource_type: target.tagName.toLowerCase(),
          resource_src: (target as any).src || (target as any).href,
          user_id: user?.id || "anonymous",
          user_role: user?.role || "guest",
          is_logged_in: !!user,
          page_url: window.location.href,
          device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
          session_duration: Date.now() - (window as any).sessionStartTime || 0,
          timestamp: new Date().toISOString(),
          event_summary: `Resource load error: ${target.tagName} failed to load`
        });
      }
    };

    // Track performance metrics
    const trackPerformance = () => {
      if (performance.timing) {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domContentLoadedTime = timing.domContentLoadedEventEnd - timing.navigationStart;
        const firstPaint = performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint');
        const firstContentfulPaint = performance.getEntriesByType('paint').find(entry => entry.name === 'first-contentful-paint');

        trackEvent("performance", {
          page_load_time: loadTime,
          dom_content_loaded_time: domContentLoadedTime,
          first_paint_time: firstPaint ? firstPaint.startTime : null,
          first_contentful_paint_time: firstContentfulPaint ? firstContentfulPaint.startTime : null,
          user_id: user?.id || "anonymous",
          user_role: user?.role || "guest",
          is_logged_in: !!user,
          page_url: window.location.href,
          page_title: document.title,
          device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
          connection_type: (navigator as any).connection?.effectiveType || "unknown",
          timestamp: new Date().toISOString(),
          event_summary: `Page loaded in ${loadTime}ms, DOM ready in ${domContentLoadedTime}ms`
        });
      }
    };

    // Track network errors
    const trackNetworkErrors = () => {
      const originalFetch = window.fetch;
      window.fetch = async (...args) => {
        const startTime = Date.now();
        try {
          const response = await originalFetch(...args);
          const duration = Date.now() - startTime;
          
          if (!response.ok) {
            trackEvent("error", {
              error_type: "network_error",
              error_message: `HTTP ${response.status}: ${response.statusText}`,
              error_url: args[0] as string,
              error_status: response.status,
              error_duration: duration,
              user_id: user?.id || "anonymous",
              user_role: user?.role || "guest",
              is_logged_in: !!user,
              page_url: window.location.href,
              device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
              session_duration: Date.now() - (window as any).sessionStartTime || 0,
              timestamp: new Date().toISOString(),
              event_summary: `Network error: ${response.status} ${response.statusText} for ${args[0]}`
            });
          }
          
          return response;
        } catch (error) {
          const duration = Date.now() - startTime;
          trackEvent("error", {
            error_type: "network_error",
            error_message: error instanceof Error ? error.message : String(error),
            error_url: args[0] as string,
            error_duration: duration,
            user_id: user?.id || "anonymous",
            user_role: user?.role || "guest",
            is_logged_in: !!user,
            page_url: window.location.href,
            device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
            session_duration: Date.now() - (window as any).sessionStartTime || 0,
            timestamp: new Date().toISOString(),
            event_summary: `Network error: ${error instanceof Error ? error.message : String(error)} for ${args[0]}`
          });
          throw error;
        }
      };
    };

    // Add event listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleResourceError, true);
    
    // Track performance after page load
    if (document.readyState === 'complete') {
      trackPerformance();
    } else {
      window.addEventListener('load', trackPerformance);
    }
    
    // Track network errors
    trackNetworkErrors();

    // Track memory usage (if available)
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      trackEvent("performance", {
        memory_used: memory.usedJSHeapSize,
        memory_total: memory.totalJSHeapSize,
        memory_limit: memory.jsHeapSizeLimit,
        user_id: user?.id || "anonymous",
        user_role: user?.role || "guest",
        is_logged_in: !!user,
        page_url: window.location.href,
        device_type: /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? "mobile" : "desktop",
        timestamp: new Date().toISOString(),
        event_summary: `Memory usage: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB used of ${Math.round(memory.totalJSHeapSize / 1024 / 1024)}MB total`
      });
    }

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleResourceError, true);
      window.removeEventListener('load', trackPerformance);
    };
  }, [trackEvent, user]);

  return null; // This component doesn't render anything
};

export default ErrorTracker;
