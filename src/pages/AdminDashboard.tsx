
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock, User, Mail, Phone, FileText } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/integrations/supabase/types";

// Define types using Database types
type Event = Database["public"]["Tables"]["events"]["Row"];
type EventInsert = Database["public"]["Tables"]["events"]["Insert"];
type Registration = Database["public"]["Tables"]["registrations"]["Row"];

const AdminDashboard = () => {
  const [session, setSession] = useState<any>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("events");
  const [formData, setFormData] = useState<EventInsert>({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/admin/login");
        return;
      }
      setSession(data.session);
      fetchEvents();
      fetchRegistrations();
    };

    checkAuth();

    // Set up real-time listener for new registrations
    const channel = supabase
      .channel('public:registrations')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'registrations' 
      }, (payload) => {
        console.log('New registration:', payload);
        toast.success(`New registration for: ${payload.new.event_title}`);
        fetchRegistrations();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRegistrations(data || []);
    } catch (error) {
      console.error("Error fetching registrations:", error);
      toast.error("Failed to load registrations");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('events')
        .insert(formData)
        .select();

      if (error) throw error;
      
      toast.success("Event created successfully");
      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        image: "",
      });
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
      toast.error("Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Failed to log out");
    }
  };

  if (loading && !session) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">Log Out</Button>
        </div>

        <Tabs defaultValue="events" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="events">Manage Events</TabsTrigger>
            <TabsTrigger value="registrations">
              Event Registrations
              {registrations.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {registrations.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="events" className="space-y-4">
            <div className="grid gap-8 md:grid-cols-12">
              {/* Event Form */}
              <Card className="md:col-span-5 glass">
                <CardHeader>
                  <CardTitle>Add New Event</CardTitle>
                  <CardDescription>Create a new event to display on the website</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="title" className="text-sm font-medium">Event Title*</label>
                      <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Community Prayer Breakfast"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="date" className="text-sm font-medium">Date*</label>
                      <Input
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="June 15, 2024"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="time" className="text-sm font-medium">Time</label>
                      <Input
                        id="time"
                        name="time"
                        value={formData.time || ""}
                        onChange={handleChange}
                        placeholder="8:00 AM - 10:00 AM"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="location" className="text-sm font-medium">Location*</label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Grace Mission Center"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description" className="text-sm font-medium">Description</label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description || ""}
                        onChange={handleChange}
                        placeholder="Event description..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="image" className="text-sm font-medium">Image URL</label>
                      <Input
                        id="image"
                        name="image"
                        value={formData.image || ""}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating..." : "Create Event"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Events List */}
              <div className="md:col-span-7 space-y-6">
                <h2 className="text-2xl font-semibold">Existing Events</h2>
                
                {events.length === 0 ? (
                  <Card className="p-6 text-center glass">
                    <p>No events found. Create your first event!</p>
                  </Card>
                ) : (
                  events.map((event) => (
                    <Card key={event.id} className="glass">
                      <CardContent className="p-6">
                        <div className="flex justify-between">
                          <h3 className="text-xl font-medium">{event.title}</h3>
                        </div>
                        
                        <div className="mt-2 space-y-1 text-sm text-foreground/80">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            <span>{event.date}</span>
                          </div>
                          
                          {event.time && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              <span>{event.time}</span>
                            </div>
                          )}
                          
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                        
                        {event.description && (
                          <p className="mt-3 text-sm text-foreground/80">{event.description}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="registrations">
            <h2 className="text-2xl font-semibold mb-6">Event Registrations</h2>
            
            {registrations.length === 0 ? (
              <Card className="p-6 text-center glass">
                <p>No registrations found yet.</p>
              </Card>
            ) : (
              <div className="space-y-6">
                {registrations.map((registration) => (
                  <Card key={registration.id} className="glass">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-medium">{registration.name}</h3>
                          <p className="text-sm text-primary font-medium mt-1">
                            Registered for: {registration.event_title}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {new Date(registration.created_at).toLocaleDateString()}
                        </Badge>
                      </div>
                      
                      <div className="mt-4 space-y-2 text-sm">
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
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
