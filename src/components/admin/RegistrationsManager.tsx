
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { sendEventConfirmation } from "@/utils/email";
import RegistrationFilters from "./registrations/RegistrationFilters";
import RegistrationCard from "./registrations/RegistrationCard";
import DeleteRegistrationDialog from "./registrations/DeleteRegistrationDialog";
import { 
  fetchRegistrations as fetchRegistrationsService,
  deleteRegistration as deleteRegistrationService,
  Registration
} from "@/services/registrationsService";

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
      
      const data = await fetchRegistrationsService();
      
      if (data.length > 0) {
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
    
    const success = await deleteRegistrationService(registrationToDelete.id);
    if (success) {
      await fetchRegistrations();
      setDeleteDialogOpen(false);
      setRegistrationToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <h2 className="text-2xl font-semibold">Event Registrations</h2>
        
        <RegistrationFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedEvent={selectedEvent}
          setSelectedEvent={setSelectedEvent}
          uniqueEvents={uniqueEvents}
          onRefresh={fetchRegistrations}
        />
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
            <RegistrationCard
              key={registration.id}
              registration={registration}
              onSendReminder={handleSendReminder}
              onDelete={openDeleteDialog}
            />
          ))}
        </div>
      )}
      
      <DeleteRegistrationDialog
        registration={registrationToDelete}
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirmDelete={handleDeleteRegistration}
      />
    </div>
  );
};

export default RegistrationsManager;
