
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Clock, Calendar as CalendarIcon, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type Event = Database["public"]["Tables"]["events"]["Row"];
type EventInsert = Database["public"]["Tables"]["events"]["Insert"];

const EventManager = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<EventInsert>({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: "",
    is_paid: false,
    price: null,
  });
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
        
      if (error) throw error;
      
      setEvents(data || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ 
      ...prev, 
      is_paid: checked, 
      price: checked ? (prev.price || 0) : null
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numeric input with 2 decimal places
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setFormData(prev => ({ 
        ...prev, 
        price: value === '' ? null : parseFloat(value)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setSaving(true);
    
    try {
      let result;
      
      if (editing) {
        // Update existing event
        result = await supabase
          .from('events')
          .update(formData)
          .eq('id', editing)
          .select();
          
        toast.success("Event updated successfully");
      } else {
        // Create new event
        result = await supabase
          .from('events')
          .insert(formData)
          .select();
          
        toast.success("Event created successfully");
      }
      
      if (result.error) throw result.error;
      
      // Reset form and refresh events
      setFormData({
        title: "",
        date: "",
        time: "",
        location: "",
        description: "",
        image: "",
        is_paid: false,
        price: null,
      });
      setEditing(null);
      fetchEvents();
    } catch (error) {
      console.error("Error saving event:", error);
      toast.error(editing ? "Failed to update event" : "Failed to create event");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (event: Event) => {
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time || "",
      location: event.location,
      description: event.description || "",
      image: event.image || "",
      is_paid: event.is_paid,
      price: event.price,
    });
    setEditing(event.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success("Event deleted successfully");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      image: "",
      is_paid: false,
      price: null,
    });
    setEditing(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-medium mb-4">
          {editing ? "Edit Event" : "Add New Event"}
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">
                Event Title*
              </label>
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
              <label htmlFor="date" className="text-sm font-medium">
                Date*
              </label>
              <Input
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="June 15, 2025"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-medium">
                Time
              </label>
              <Input
                id="time"
                name="time"
                value={formData.time || ""}
                onChange={handleChange}
                placeholder="8:00 AM - 10:00 AM"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">
                Location*
              </label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Church Main Hall"
                required
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="text-sm font-medium">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
                placeholder="Event description..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="image" className="text-sm font-medium">
                Image URL
              </label>
              <Input
                id="image"
                name="image"
                value={formData.image || ""}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_paid"
                  checked={formData.is_paid}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="is_paid">This is a paid event</Label>
              </div>
              
              {formData.is_paid && (
                <div className="mt-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Price ($)
                  </label>
                  <Input
                    id="price"
                    name="price"
                    type="text"
                    value={formData.price === null ? "" : formData.price}
                    onChange={handlePriceChange}
                    placeholder="0.00"
                    className="max-w-xs"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            {editing && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : editing ? "Update Event" : "Create Event"}
            </Button>
          </div>
        </form>
      </div>
      
      <h3 className="text-lg font-medium mt-8 mb-4">Existing Events</h3>
      
      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found. Create your first event above.</p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  {event.image && (
                    <div className="w-full md:w-1/4 h-48 md:h-auto">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-medium">{event.title}</h3>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(event)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                          onClick={() => handleDelete(event.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-2 space-y-1 text-sm text-muted-foreground">
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
                    
                    {event.is_paid && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          Paid Event: ${event.price}
                        </span>
                      </div>
                    )}
                    
                    {event.description && (
                      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventManager;
