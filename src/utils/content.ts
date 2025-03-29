
import { supabase } from "@/integrations/supabase/client";

export type ContentBlock = {
  id: string;
  page_id: string;
  section_id: string;
  title: string | null;
  content: string | null;
  image_url: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
};

export const fetchContent = async (pageId: string, sectionId: string): Promise<ContentBlock | null> => {
  try {
    const { data, error } = await supabase
      .from('content_blocks')
      .select('*')
      .eq('page_id', pageId)
      .eq('section_id', sectionId)
      .single();
      
    if (error) {
      if (error.code !== 'PGRST116') { // No rows returned error code
        console.error("Error fetching content:", error);
      }
      return null;
    }
    
    return data;
  } catch (error) {
    console.error("Unexpected error fetching content:", error);
    return null;
  }
};

export const fetchPageContent = async (pageId: string): Promise<ContentBlock[]> => {
  try {
    const { data, error } = await supabase
      .from('content_blocks')
      .select('*')
      .eq('page_id', pageId)
      .order('order_index', { ascending: true });
      
    if (error) {
      console.error("Error fetching page content:", error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error("Unexpected error fetching page content:", error);
    return [];
  }
};
