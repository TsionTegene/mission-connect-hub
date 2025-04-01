
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export type Registration = {
  id: string;
  event_id: string;
  event_title: string;
  name: string;
  email: string;
  phone: string;
  notes: string | null;
  created_at: string;
};

export const fetchRegistrations = async (): Promise<Registration[]> => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error("Error fetching registrations:", error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error("Error fetching registrations:", error);
    toast.error("Failed to load registrations");
    return [];
  }
};

export const deleteRegistration = async (id: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    toast.success("Registration deleted successfully");
    return true;
  } catch (error) {
    console.error("Error deleting registration:", error);
    toast.error("Failed to delete registration");
    return false;
  }
};
