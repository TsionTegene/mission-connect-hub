
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { v4 as uuidv4 } from 'uuid';

// Get or create a session ID for anonymous analytics
const getSessionId = (): string => {
  let sessionId = localStorage.getItem('analytics_session_id');
  
  if (!sessionId) {
    sessionId = uuidv4();
    localStorage.setItem('analytics_session_id', sessionId);
  }
  
  return sessionId;
};

// Track page views
export const trackPageView = async (path: string) => {
  try {
    const { user } = useAuth();
    const sessionId = getSessionId();
    
    const analyticsData = {
      user_id: user?.id || null,
      session_id: sessionId,
      event_type: 'page_view',
      page_path: path,
      event_data: {
        referrer: document.referrer || null,
        title: document.title,
      },
      user_agent: navigator.userAgent,
    };
    
    await supabase
      .from('analytics_events')
      .insert(analyticsData);
      
  } catch (error) {
    console.error("Error tracking page view:", error);
    // Silently fail for analytics - don't disrupt user experience
  }
};

// Track custom events
export const trackEvent = async (
  eventType: string,
  path: string,
  eventData: Record<string, any> = {}
) => {
  try {
    const { user } = useAuth();
    const sessionId = getSessionId();
    
    const analyticsData = {
      user_id: user?.id || null,
      session_id: sessionId,
      event_type: eventType,
      page_path: path,
      event_data: eventData,
      user_agent: navigator.userAgent,
    };
    
    await supabase
      .from('analytics_events')
      .insert(analyticsData);
      
  } catch (error) {
    console.error(`Error tracking event ${eventType}:`, error);
    // Silently fail for analytics - don't disrupt user experience
  }
};
