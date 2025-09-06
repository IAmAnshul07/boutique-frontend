import { sessionLensConfig } from '@/config/sessionLens.config';

export interface ValidationResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export const validateSessionLensCredentials = async (): Promise<ValidationResponse> => {
  try {
    const { org_id, user_id, validation_endpoint } = sessionLensConfig;
    
    if (!org_id || !user_id || !validation_endpoint) {
      return {
        success: false,
        message: 'Missing required validation parameters'
      };
    }

    const url = `${validation_endpoint}?org_id=${org_id}&user_id=${user_id}`;
    console.log('SessionLens: Validating credentials at:', url);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    const data = await response.json();
    console.log('SessionLens: Validation response:', data);

    if (response.ok) {
      return {
        success: true,
        data
      };
    } else {
      return {
        success: false,
        message: data.message || 'Validation failed'
      };
    }
  } catch (error) {
    console.error('SessionLens: Validation error:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        return {
          success: false,
          message: 'Validation request timed out'
        };
      } else if (error.message.includes('Failed to fetch')) {
        return {
          success: false,
          message: 'Validation server unavailable'
        };
      }
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Validation error'
    };
  }
}; 