
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, FileText, Search, Trash2, Send } from "lucide-react";
import { toast } from "sonner";
import { sendEventConfirmation } from "@/utils/email";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Registration = {
  id: string;
  event_id: string;
  event_title: string;
  name: string;
  email: string;
  phone: string;
  notes: string | null;
  created_at: string;
};

const RegistrationsManager = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string>("all");
  const [uniqueEvents, setUniqueEvents] = useState<{id: string, title: string}[]>([]);
  const [registrationToDelete, setRegistrationToDelete] = useState<Registration | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    // Filter registrations based on search query and selected event
    let filtered = [...registrations];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(reg => 
        reg.name.toLowerCase().includes(query) ||
        reg.email.toLowerCase().includes(query) ||
        reg.phone.includes(query) ||
        reg.event_title.toLowerCase().includes(query)
      );
    }
    
    if (selectedEvent !== "all") {
      filtered = filtered.filter(reg => reg.event_id === selectedEvent);
    }
    
    setFilteredRegistrations(filtered);
  }, [searchQuery, selectedEvent, registrations]);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error fetching registrations:", error);
        throw error;
      }
      
      console.log("Fetched registrations:", data);
      
      if (data && data.length > 0) {
        setRegistrations(data);
        setFilteredRegistrations(data);
        
        // Extract unique events
        const events = new Map();
        data.forEach(reg => {
          if (!events.has(reg.event_id)) {
            events.set(reg.event_id, { id: reg.event_id, title: reg.event_title });
          }
        });
        
        setUniqueEvents(Array.from(events.values()));
      } else {
        console.log("No registrations found");
        setRegistrations([]);
        setFilteredRegistrations([]);
        setUniqueEvents([]);
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast.error("Failed to load registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleSendReminder = async (registration: Registration) => {
    try {
      await sendEventConfirmation(
        registration.name,
        registration.email,
        registration.event_title
      );
      
      toast.success(`Reminder sent to ${registration.name}`);
    } catch (error) {
      console.error("Error sending reminder:", error);
      toast.error("Failed to send reminder");
    }
  };

  const openDeleteDialog = (registration: Registration) => {
    setRegistrationToDelete(registration);
    setDeleteDialogOpen(true);
  };

  const handleDeleteRegistration = async () => {
    if (!registrationToDelete) return;
    
    try {
      const { error } = await supabase
        .from('registrations')
        .delete()
        .eq('id', registrationToDelete.id);
        
      if (error) throw error;
      
      toast.success("Registration deleted successfully");
      fetchRegistrations();
      setDeleteDialogOpen(false);
      setRegistrationToDelete(null);
    } catch (error) {
      console.error("Error deleting registration:", error);
      toast.error("Failed to delete registration");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h2 className="text-2xl font-semibold">Event Registrations</h2>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search registrations..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <select
            className="px-3 py-2 rounded-md border bg-transparent text-sm"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            <option value="all">All Events</option>
            {uniqueEvents.map((event) => (
              <option key={event.id} value={event.id}>
                {event.title}
              </option>
            ))}
          </select>
          
          <Button variant="outline" onClick={fetchRegistrations} size="sm">
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground">
        Showing {filteredRegistrations.length} of {registrations.length} registrations
      </div>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <p>Loading registrations...</p>
        </div>
      ) : filteredRegistrations.length === 0 ? (
        <div className="border rounded-lg p-8 text-center">
          <p>No registrations found.</p>
          {searchQuery && (
            <p className="mt-2 text-sm text-muted-foreground">
              Try adjusting your search criteria.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRegistrations.map((registration) => (
            <Card key={registration.id} className="glass">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                      <h3 className="text-xl font-medium">{registration.name}</h3>
                      <Badge variant="outline" className="whitespace-nowrap">
                        {new Date(registration.created_at).toLocaleDateString()}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-primary font-medium">
                      Registered for: {registration.event_title}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{registration.email}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{registration.phone}</span>
                      </div>
                      
                      {registration.notes && (
                        <div className="pt-2">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="font-medium">Notes:</span>
                          </div>
                          <p className="mt-1 pl-6 text-foreground/80">{registration.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 md:flex-auto"
                      onClick={() => handleSendReminder(registration)}
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Reminder
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1 md:flex-auto text-destructive hover:bg-destructive/10"
                      onClick={() => openDeleteDialog(registration)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Registration</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {registrationToDelete?.name}'s registration for {registrationToDelete?.event_title}? 
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteRegistration}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RegistrationsManager;
