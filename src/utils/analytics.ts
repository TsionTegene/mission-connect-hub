
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

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
    
    // Try to get user information if logged in
    let userId = null;
    try {
      const { user } = useAuth();
      if (user) {
        userId = user.id;
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
    
    // Log event to Supabase
    supabase.from('analytics_events').insert({
      session_id: sessionId,
      user_id: userId,
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
    }).then(({ error }) => {
      if (error) {
        console.error("Error logging analytics:", error);
      }
    });
  } catch (error) {
    console.error("Error tracking page view:", error);
  }
};

// Track user events (clicks, form submissions, etc.)
export const trackEvent = (eventType: string, eventData: any = {}) => {
  try {
    const sessionId = getSessionId();
    
    // Try to get user information if logged in
    let userId = null;
    try {
      const { user } = useAuth();
      if (user) {
        userId = user.id;
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
    
    // Log event to Supabase
    supabase.from('analytics_events').insert({
      session_id: sessionId,
      user_id: userId,
      event_type: eventType,
      page_path: window.location.pathname,
      event_data: eventData,
      user_agent: navigator.userAgent
    }).then(({ error }) => {
      if (error) {
        console.error("Error logging event:", error);
      }
    });
  } catch (error) {
    console.error("Error tracking event:", error);
  }
};
