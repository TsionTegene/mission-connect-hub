import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Clock, Calendar as CalendarIcon, X, Edit, Trash2, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";
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

type Event = Database["public"]["Tables"]["events"]["Row"];
type EventInsert = Database["public"]["Tables"]["events"]["Insert"];

interface Payment {
  id: string;
  event_id: string;
  user_email: string;
  amount: number;
  currency: string;
  payment_status: string;
  payment_method: string;
  transaction_id: string | null;
  created_at: string;
}

interface Registration {
  id: string;
  event_id: string;
  event_title: string;
  name: string;
  email: string;
  phone: string;
  notes: string | null;
  created_at: string;
}

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
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [viewingEventStats, setViewingEventStats] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    if (viewingEventStats) {
      fetchEventStats(viewingEventStats);
    }
  }, [viewingEventStats]);

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

  const fetchEventStats = async (eventId: string) => {
    try {
      // Fetch registrations
      const { data: registrationsData, error: registrationsError } = await supabase
        .from('registrations')
        .select('*')
        .eq('event_id', eventId);
        
      if (registrationsError) throw registrationsError;
      
      setRegistrations(registrationsData || []);
      
      // Fetch payments directly from Supabase
      const { data: paymentsData, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .eq('event_id', eventId);
      
      if (paymentsError) throw paymentsError;
      
      setPayments(paymentsData || []);
    } catch (error) {
      console.error("Error fetching event stats:", error);
      toast.error("Failed to load event statistics");
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
    setViewingEventStats(null); // Close stats view if open
  };

  const handleDelete = async (id: string) => {
    try {
      // First check for registrations and payments
      const { count: registrationsCount, error: countError } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('event_id', id);
        
      if (countError) throw countError;
      
      // If registrations exist, warn admin
      if (registrationsCount && registrationsCount > 0) {
        if (!confirm(`This event has ${registrationsCount} registrations. Are you sure you want to delete it? This will also delete all registrations.`)) {
          return;
        }
        
        // Delete registrations first
        const { error: regDeleteError } = await supabase
          .from('registrations')
          .delete()
          .eq('event_id', id);
          
        if (regDeleteError) throw regDeleteError;
      }
      
      // Check for payments using fetch API since the payments table isn't in types
      const paymentsResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/payments?event_id=eq.${id}&select=count`,
        {
          headers: {
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
            'Content-Type': 'application/json',
            'Prefer': 'count=exact',
          },
        }
      );
      
      if (!paymentsResponse.ok) {
        throw new Error('Failed to check payments');
      }
      
      const paymentsCount = parseInt(paymentsResponse.headers.get('content-range')?.split('/')[1] || '0');
      
      // If payments exist, warn admin
      if (paymentsCount > 0) {
        if (!confirm(`This event has ${paymentsCount} payments. Are you sure you want to delete it? This will also delete all payment records.`)) {
          return;
        }
        
        // Delete payments using fetch API
        const deleteResponse = await fetch(
          `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/payments?event_id=eq.${id}`,
          {
            method: 'DELETE',
            headers: {
              'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (!deleteResponse.ok) {
          throw new Error('Failed to delete payments');
        }
      }
      
      // Finally delete the event
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      toast.success("Event deleted successfully");
      fetchEvents();
      setViewingEventStats(null);
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event");
    }
    
    setDeleteDialogOpen(false);
    setDeleteEventId(null);
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

  const confirmDelete = (id: string) => {
    setDeleteEventId(id);
    setDeleteDialogOpen(true);
  };

  const toggleEventStats = (eventId: string) => {
    if (viewingEventStats === eventId) {
      setViewingEventStats(null);
    } else {
      setViewingEventStats(eventId);
      setEditing(null); // Close edit form if open
    }
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
            <div key={event.id}>
              <Card className="overflow-hidden">
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
                            variant="outline"
                            size="sm"
                            onClick={() => toggleEventStats(event.id)}
                          >
                            {viewingEventStats === event.id ? "Hide Stats" : "View Stats"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(event)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="ml-1 hidden sm:inline">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-destructive"
                            onClick={() => confirmDelete(event.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="ml-1 hidden sm:inline">Delete</span>
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
                            <DollarSign className="h-3 w-3 mr-1" />
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
              
              {/* Event statistics section */}
              {viewingEventStats === event.id && (
                <div className="mt-2 bg-card rounded-lg p-6 border">
                  <h4 className="text-md font-medium mb-4">Event Statistics</h4>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2">Registrations ({registrations.length})</h5>
                      {registrations.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No registrations yet.</p>
                      ) : (
                        <div className="max-h-60 overflow-y-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left font-medium py-2">Name</th>
                                <th className="text-left font-medium py-2">Email</th>
                                <th className="text-left font-medium py-2">Phone</th>
                              </tr>
                            </thead>
                            <tbody>
                              {registrations.map((reg) => (
                                <tr key={reg.id} className="border-b border-muted">
                                  <td className="py-2">{reg.name}</td>
                                  <td className="py-2">{reg.email}</td>
                                  <td className="py-2">{reg.phone}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                    
                    {event.is_paid && (
                      <div>
                        <h5 className="font-medium mb-2">Payments ({payments.length})</h5>
                        {payments.length === 0 ? (
                          <p className="text-sm text-muted-foreground">No payments yet.</p>
                        ) : (
                          <div className="max-h-60 overflow-y-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left font-medium py-2">Email</th>
                                  <th className="text-left font-medium py-2">Amount</th>
                                  <th className="text-left font-medium py-2">Status</th>
                                </tr>
                              </thead>
                              <tbody>
                                {payments.map((payment) => (
                                  <tr key={payment.id} className="border-b border-muted">
                                    <td className="py-2">{payment.user_email}</td>
                                    <td className="py-2">${payment.amount}</td>
                                    <td className="py-2">
                                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                        {payment.payment_status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            
                            <div className="mt-4 p-3 bg-muted rounded">
                              <p className="text-sm font-medium">Total Revenue: ${payments.reduce((sum, payment) => sum + (payment.amount || 0), 0).toFixed(2)}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              event and all associated registrations and payments.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteEventId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteEventId && handleDelete(deleteEventId)} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EventManager;
