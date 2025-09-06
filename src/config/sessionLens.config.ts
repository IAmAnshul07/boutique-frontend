// SessionLens Configuration
export const sessionLensConfig = {
  // Required configuration - will be populated from environment variables
  sdk_key: 'sdk_production_fpwe77qkv5uz8qeb', // Default SDK key
  user_id: "68916d03c85a4c59f8ee4623", // Will be updated with actual user ID
  org_id: '68916d02c85a4c59f8ee4622', // Default org ID
  project_id: '', // Will be set from environment
  api_base_url: 'http://localhost:8000/api/v1', // Default API URL
  validation_endpoint: 'http://localhost:8000/api/v1/org/validate', // Validation endpoint
  // Optional configuration
  debug: process.env.NODE_ENV === 'development',
  
  // Feature flags
  enabled: true, // Will be set from environment
  skip_validation: true, // Skip validation if server is unavailable
};

// Function to get environment variables from datashop config
const getSessionLensEnvVars = () => {
  try {
    const config = (window as any).datashop?.app?.module('getPublicConfig')?.('incode');
    return config?.environmentVariables || {};
  } catch (error) {
    console.warn('SessionLens: Could not access environment variables:', error);
    return {};
  }
};

// Initialize configuration from environment variables
export const initializeSessionLensConfig = () => {
  const envVars = getSessionLensEnvVars();
  console.log('SessionLens: Environment variables loaded:', envVars);
  
  sessionLensConfig.sdk_key = envVars.SESSIONLENS_SDK_KEY || sessionLensConfig.sdk_key;
  sessionLensConfig.org_id = envVars.SESSIONLENS_ORG_ID || sessionLensConfig.org_id;
  sessionLensConfig.project_id = envVars.SESSIONLENS_PROJECT_ID || sessionLensConfig.project_id;
  sessionLensConfig.enabled = envVars.SESSIONLENS_ENABLED === 'true' || sessionLensConfig.enabled;
  sessionLensConfig.api_base_url = envVars.SESSIONLENS_API_BASE_URL || sessionLensConfig.api_base_url;
  
  console.log('SessionLens: Final configuration:', {
    sdk_key: sessionLensConfig.sdk_key,
    org_id: sessionLensConfig.org_id,
    api_base_url: sessionLensConfig.api_base_url,
    enabled: sessionLensConfig.enabled,
    debug: sessionLensConfig.debug
  });
};

// Validation function
export const validateSessionLensConfig = (): boolean => {
  console.log('SessionLens: Validating configuration...');
  console.log('SessionLens: enabled =', sessionLensConfig.enabled);
  console.log('SessionLens: sdk_key =', sessionLensConfig.sdk_key ? 'SET' : 'MISSING');
  console.log('SessionLens: org_id =', sessionLensConfig.org_id ? 'SET' : 'MISSING');
  console.log('SessionLens: api_base_url =', sessionLensConfig.api_base_url);
  
  if (!sessionLensConfig.enabled) {
    console.log('SessionLens is disabled');
    return false;
  }
  
  if (!sessionLensConfig.sdk_key) {
    console.warn('SessionLens: Missing sdk_key');
    return false;
  }
  
  if (!sessionLensConfig.org_id) {
    console.warn('SessionLens: Missing org_id');
    return false;
  }
  
  console.log('SessionLens: Configuration validation passed');
  return true;
};

// Get configuration for specific environments
export const getSessionLensConfig = (userId?: string) => {
  if (!validateSessionLensConfig()) {
    return null;
  }
  
  return {
    api_base_url: sessionLensConfig.api_base_url,
    sdk_key: sessionLensConfig.sdk_key,
    user_id: userId || sessionLensConfig.user_id,
    org_id: sessionLensConfig.org_id,
    project_id: sessionLensConfig.project_id,
    debug: sessionLensConfig.debug,
    validation_endpoint: sessionLensConfig.validation_endpoint,
  };
}; 