
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

// Create or get a session ID
const getSessionId = () => {
  let sessionId = localStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('session_id', sessionId);
  }
  return sessionId;
};

// Track page views
export const trackPageView = (pagePath: string) => {
  try {
    const sessionId = getSessionId();
    
    // Log event to Supabase (mock operation)
    console.log("MOCK: Tracking page view:", {
      session_id: sessionId,
      event_type: 'page_view',
      page_path: pagePath,
      event_data: {
        referrer: document.referrer,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      },
      user_agent: navigator.userAgent
    });
    
    // Using our mock client
    supabase.from('analytics_events').insert({
      session_id: sessionId,
      event_type: 'page_view',
      page_path: pagePath,
      event_data: {
        referrer: document.referrer,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        }
      },
      user_agent: navigator.userAgent
    });
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
};

// Track user events (clicks, form submissions, etc.)
export const trackEvent = (eventType: string, eventData: any = {}) => {
  try {
    const sessionId = getSessionId();
    
    // Log event to console (mock operation)
    console.log("MOCK: Tracking event:", {
      session_id: sessionId,
      event_type: eventType,
      page_path: window.location.pathname,
      event_data: eventData,
      user_agent: navigator.userAgent
    });
    
    // Using our mock client
    supabase.from('analytics_events').insert({
      session_id: sessionId,
      event_type: eventType,
      page_path: window.location.pathname,
      event_data: eventData,
      user_agent: navigator.userAgent
    });
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};
