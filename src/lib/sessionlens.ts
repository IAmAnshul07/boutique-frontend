// Import SessionLens SDK
import sessionLens, { SessionLensEvent, SessionLensUser } from '@sessionlens/sdk';
import { getSessionLensConfig, initializeSessionLensConfig, sessionLensConfig } from '../config/sessionLens.config';
import { validateSessionLensCredentials } from './sessionLensValidation';

// SessionLens configuration interface
interface SessionLensConfig {
  sdk_key: string;
  user_id: string;
  org_id: string;
  api_base_url?: string;
  endpoint?: string;
  project_id?: string;
  debug?: boolean;
}

// Export SessionLens instance
export let sessionLensInstance: typeof sessionLens | null = null;
export let isInitialized = false;

// Initialize SessionLens
export const initializeSessionLens = async (userId?: string, config?: Partial<SessionLensConfig>): Promise<boolean> => {
  try {
    // Initialize configuration from environment variables
    initializeSessionLensConfig();
    
    // Validate credentials with the API (optional)
    if (!sessionLensConfig.skip_validation) {
      console.log('SessionLens: Validating credentials...');
      try {
        const validationResult = await validateSessionLensCredentials();
        if (validationResult.success) {
          console.log('SessionLens: Credential validation successful');
        } else {
          console.warn('SessionLens: Credential validation failed, but continuing with initialization:', validationResult.message);
        }
      } catch (error) {
        console.warn('SessionLens: Credential validation error, but continuing with initialization:', error);
      }
    } else {
      console.log('SessionLens: Skipping credential validation');
    }
    
    // Get base configuration from config file
    const baseConfig = getSessionLensConfig(userId);
    if (!baseConfig) {
      console.warn('SessionLens: Configuration validation failed');
      return false;
    }
    
    // Merge with provided config
    const finalConfig = { ...baseConfig, ...config };
    console.log('finalConfig', finalConfig);
    // Initialize SessionLens with configuration
    await sessionLens.sessionLensInit(finalConfig);

    console.log('SessionLens initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize SessionLens:', error);
    return false;
  }
};

// Initialize and export the instance
export const initSessionLens = async (userId?: string, config?: Partial<SessionLensConfig>): Promise<boolean> => {
  const success = await initializeSessionLens(userId, config);
  if (success) {
    sessionLensInstance = sessionLens;
    isInitialized = true;
  }
  return success;
};

// Helper functions for SessionLens operations
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (sessionLensInstance && isInitialized) {
    try {
      const event: SessionLensEvent = {
        event_name: eventName,
        properties,
        timestamp: Math.floor(Date.now()),
      };
      console.log('SessionLens event:', event);
      sessionLensInstance.sessionLensTrack(event);
      console.log('SessionLens event tracked:', eventName);
    } catch (error) {
      console.error('Failed to track SessionLens event:', error);
    }
  }
};

export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (sessionLensInstance && isInitialized) {
    try {
      const user: SessionLensUser = {
        user_id: userId,
        properties,
      };
      sessionLensInstance.sessionLensIdentify(user);
      console.log('SessionLens user identified:', userId);
    } catch (error) {
      console.error('Failed to identify SessionLens user:', error);
    }
  }
};

export const resetSession = () => {
  if (sessionLensInstance && isInitialized) {
    try {
      sessionLensInstance.sessionLensReset();
      console.log('SessionLens session reset');
    } catch (error) {
      console.error('Failed to reset SessionLens session:', error);
    }
  }
};

// Legacy function names for backward compatibility
export const startSession = (userId?: string, sessionData?: Record<string, any>) => {
  if (userId) {
    identifyUser(userId, sessionData);
  }
};

export const stopSession = () => {
  resetSession();
};

export const addEvent = (eventName: string, eventData?: Record<string, any>) => {
  trackEvent(eventName, eventData);
};

export const setUserProperties = (properties: Record<string, any>) => {
  // Note: This would need the current user ID to work properly
  console.warn('setUserProperties requires user ID - use identifyUser instead');
};

export const setSessionProperties = (properties: Record<string, any>) => {
  // SessionLens SDK doesn't have a direct setSessionProperties method
  // We can track this as an event instead
  trackEvent('session_properties_updated', properties);
}; 