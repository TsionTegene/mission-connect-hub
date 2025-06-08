// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { Calendar, MapPin, Clock, X, Edit, Trash2, DollarSign, Mail } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import { toast } from "sonner";
// import { 
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { 
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { mockEvents } from "@/mocks/eventData";
// import { v4 as uuidv4 } from 'uuid';

// // Event type definition
// export type Event = {
//   id: string;
//   title: string;
//   date: string;
//   time?: string;
//   location: string;
//   description?: string;
//   image?: string;
//   created_at: string;
//   is_paid: boolean;
//   price: number | null;
// };

// // Mock registration type
// interface Registration {
//   id: string;
//   event_id: string;
//   event_title: string;
//   name: string;
//   email: string;
//   phone: string;
//   notes: string | null;
//   created_at: string;
// }

// // Mock payment type
// interface Payment {
//   id: string;
//   event_id: string;
//   user_email: string;
//   amount: number;
//   currency: string;
//   payment_status: string;
//   payment_method: string;
//   transaction_id: string | null;
//   created_at: string;
// }

// // Mock data for registrations
// const mockRegistrations: { [eventId: string]: Registration[] } = {
//   "2": [
//     {
//       id: "reg1",
//       event_id: "2",
//       event_title: "Mission Trip to Omo",
//       name: "John Smith",
//       email: "john@example.com",
//       phone: "555-123-4567",
//       notes: "Looking forward to the trip!",
//       created_at: new Date().toISOString()
//     },
//     {
//       id: "reg2",
//       event_id: "2",
//       event_title: "Mission Trip to Omo",
//       name: "Jane Doe",
//       email: "jane@example.com", 
//       phone: "555-987-6543",
//       notes: null,
//       created_at: new Date().toISOString()
//     }
//   ],
//   "3": [
//     {
//       id: "reg3",
//       event_id: "3",
//       event_title: "Worship Night",
//       name: "Michael Johnson",
//       email: "michael@example.com",
//       phone: "555-555-5555",
//       notes: "Can I volunteer to help?",
//       created_at: new Date().toISOString()
//     }
//   ]
// };

// // Mock data for payments
// const mockPayments: { [eventId: string]: Payment[] } = {
//   "2": [
//     {
//       id: "pay1",
//       event_id: "2",
//       user_email: "john@example.com",
//       amount: 250,
//       currency: "USD",
//       payment_status: "completed",
//       payment_method: "credit_card",
//       transaction_id: "tx_123456",
//       created_at: new Date().toISOString()
//     },
//     {
//       id: "pay2",
//       event_id: "2",
//       user_email: "jane@example.com",
//       amount: 250,
//       currency: "USD",
//       payment_status: "completed",
//       payment_method: "paypal",
//       transaction_id: "tx_789012",
//       created_at: new Date().toISOString()
//     }
//   ]
// };

// const EventManager = () => {
//   // Use a copy of the mock events to allow changes
//   const [events, setEvents] = useState<Event[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [formData, setFormData] = useState<Partial<Event>>({
//     title: "",
//     date: "",
//     time: "",
//     location: "",
//     description: "",
//     image: "",
//     is_paid: false,
//     price: null,
//   });
//   const [editing, setEditing] = useState<string | null>(null);
//   const [saving, setSaving] = useState(false);
//   const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [registrations, setRegistrations] = useState<Registration[]>([]);
//   const [viewingEventStats, setViewingEventStats] = useState<string | null>(null);
//   const [deleteRegistrationId, setDeleteRegistrationId] = useState<string | null>(null);
//   const [deleteRegistrationDialogOpen, setDeleteRegistrationDialogOpen] = useState(false);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   useEffect(() => {
//     if (viewingEventStats) {
//       fetchEventStats(viewingEventStats);
//     }
//   }, [viewingEventStats]);

//   const fetchEvents = async () => {
//     try {
//       setLoading(true);
//       // Use our mock events data
//       setEvents([...mockEvents]);
//     } catch (error) {
//       console.error("Error fetching events:", error);
//       toast.error("Failed to load events");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchEventStats = async (eventId: string) => {
//     try {
//       // Get mock registrations for this event
//       const eventRegistrations = mockRegistrations[eventId] || [];
//       setRegistrations(eventRegistrations);
      
//       // Get mock payments for this event
//       const eventPayments = mockPayments[eventId] || [];
//       setPayments(eventPayments);
//     } catch (error) {
//       console.error("Error fetching event stats:", error);
//       toast.error("Failed to load event statistics");
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSwitchChange = (checked: boolean) => {
//     setFormData(prev => ({ 
//       ...prev, 
//       is_paid: checked, 
//       price: checked ? (prev.price || 0) : null
//     }));
//   };

//   const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;
//     // Allow only numeric input with 2 decimal places
//     if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
//       setFormData(prev => ({ 
//         ...prev, 
//         price: value === '' ? null : parseFloat(value)
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.title || !formData.date || !formData.location) {
//       toast.error("Please fill in all required fields");
//       return;
//     }
    
//     setSaving(true);
    
//     try {
//       setTimeout(() => {
//         if (editing) {
//           // Update existing event
//           const updatedEvents = events.map(event => 
//             event.id === editing ? { ...event, ...formData } : event
//           );
//           setEvents(updatedEvents);
//           toast.success("Event updated successfully");
//         } else {
//           // Create new event
//           const newEvent: Event = {
//             id: uuidv4(),
//             title: formData.title!,
//             date: formData.date!,
//             time: formData.time || undefined,
//             location: formData.location!,
//             description: formData.description || undefined,
//             image: formData.image || undefined,
//             created_at: new Date().toISOString(),
//             is_paid: formData.is_paid || false,
//             price: formData.price
//           };
          
//           setEvents(prev => [...prev, newEvent]);
//           toast.success("Event created successfully");
//         }
        
//         // Reset form
//         setFormData({
//           title: "",
//           date: "",
//           time: "",
//           location: "",
//           description: "",
//           image: "",
//           is_paid: false,
//           price: null,
//         });
//         setEditing(null);
//         setSaving(false);
//       }, 800);
//     } catch (error) {
//       console.error("Error saving event:", error);
//       toast.error(editing ? "Failed to update event" : "Failed to create event");
//       setSaving(false);
//     }
//   };

//   const handleEdit = (event: Event) => {
//     setFormData({
//       title: event.title,
//       date: event.date,
//       time: event.time || "",
//       location: event.location,
//       description: event.description || "",
//       image: event.image || "",
//       is_paid: event.is_paid,
//       price: event.price,
//     });
//     setEditing(event.id);
//     setViewingEventStats(null); // Close stats view if open
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       // Check for registrations
//       const registrationsCount = (mockRegistrations[id] || []).length;
      
//       // If registrations exist, warn admin
//       if (registrationsCount > 0) {
//         if (!confirm(`This event has ${registrationsCount} registrations. Are you sure you want to delete it? This will also delete all registrations.`)) {
//           return;
//         }
        
//         // Remove registrations in mock data
//         delete mockRegistrations[id];
//       }
      
//       // Check for payments 
//       const paymentsCount = (mockPayments[id] || []).length;
      
//       // If payments exist, warn admin
//       if (paymentsCount > 0) {
//         if (!confirm(`This event has ${paymentsCount} payments. Are you sure you want to delete it? This will also delete all payment records.`)) {
//           return;
//         }
        
//         // Remove payments in mock data
//         delete mockPayments[id];
//       }
      
//       // Delete the event
//       setEvents(prev => prev.filter(event => event.id !== id));
//       toast.success("Event deleted successfully");
      
//       if (viewingEventStats === id) {
//         setViewingEventStats(null);
//       }
//     } catch (error) {
//       console.error("Error deleting event:", error);
//       toast.error("Failed to delete event");
//     }
    
//     setDeleteDialogOpen(false);
//     setDeleteEventId(null);
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       date: "",
//       time: "",
//       location: "",
//       description: "",
//       image: "",
//       is_paid: false,
//       price: null,
//     });
//     setEditing(null);
//   };

//   const confirmDelete = (id: string) => {
//     setDeleteEventId(id);
//     setDeleteDialogOpen(true);
//   };

//   const toggleEventStats = (eventId: string) => {
//     if (viewingEventStats === eventId) {
//       setViewingEventStats(null);
//     } else {
//       setViewingEventStats(eventId);
//       setEditing(null); // Close edit form if open
//     }
//   };

//   const handleDeleteRegistration = async (registrationId: string) => {
//     try {
//       // Find the registration and its event
//       let eventId: string | null = null;
      
//       Object.entries(mockRegistrations).forEach(([key, regs]) => {
//         if (regs.some(reg => reg.id === registrationId)) {
//           eventId = key;
//         }
//       });
      
//       if (eventId) {
//         // Update mock registrations
//         mockRegistrations[eventId] = mockRegistrations[eventId].filter(
//           reg => reg.id !== registrationId
//         );
        
//         // Update current registrations state
//         setRegistrations(prev => prev.filter(reg => reg.id !== registrationId));
//         toast.success("Registration deleted successfully");
//       }
//     } catch (error) {
//       console.error("Error deleting registration:", error);
//       toast.error("Failed to delete registration");
//     }
    
//     setDeleteRegistrationDialogOpen(false);
//     setDeleteRegistrationId(null);
//   };

//   const confirmDeleteRegistration = (id: string) => {
//     setDeleteRegistrationId(id);
//     setDeleteRegistrationDialogOpen(true);
//   };

//   const handleContactRegistrant = (email: string) => {
//     // Open default mail client
//     window.location.href = `mailto:${email}`;
//   };

//   return (
//     <div className="space-y-8">
//       <div className="bg-card rounded-lg p-6 border">
//         <h3 className="text-lg font-medium mb-4">
//           {editing ? "Edit Event" : "Add New Event"}
//         </h3>
        
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid gap-4 md:grid-cols-2">
//             <div className="space-y-2">
//               <label htmlFor="title" className="text-sm font-medium">
//                 Event Title*
//               </label>
//               <Input
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="Community Prayer Breakfast"
//                 required
//               />
//             </div>
            
//             <div className="space-y-2">
//               <label htmlFor="date" className="text-sm font-medium">
//                 Date*
//               </label>
//               <Input
//                 id="date"
//                 name="date"
//                 value={formData.date}
//                 onChange={handleChange}
//                 placeholder="June 15, 2025"
//                 required
//               />
//             </div>
            
//             <div className="space-y-2">
//               <label htmlFor="time" className="text-sm font-medium">
//                 Time
//               </label>
//               <Input
//                 id="time"
//                 name="time"
//                 value={formData.time || ""}
//                 onChange={handleChange}
//                 placeholder="8:00 AM - 10:00 AM"
//               />
//             </div>
            
//             <div className="space-y-2">
//               <label htmlFor="location" className="text-sm font-medium">
//                 Location*
//               </label>
//               <Input
//                 id="location"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 placeholder="Church Main Hall"
//                 required
//               />
//             </div>
            
//             <div className="space-y-2 md:col-span-2">
//               <label htmlFor="description" className="text-sm font-medium">
//                 Description
//               </label>
//               <Textarea
//                 id="description"
//                 name="description"
//                 value={formData.description || ""}
//                 onChange={handleChange}
//                 placeholder="Event description..."
//                 rows={3}
//               />
//             </div>
            
//             <div className="space-y-2 md:col-span-2">
//               <label htmlFor="image" className="text-sm font-medium">
//                 Image URL
//               </label>
//               <Input
//                 id="image"
//                 name="image"
//                 value={formData.image || ""}
//                 onChange={handleChange}
//                 placeholder="https://example.com/image.jpg"
//               />
//             </div>
            
//             <div className="space-y-2 md:col-span-2">
//               <div className="flex items-center space-x-2">
//                 <Switch
//                   id="is_paid"
//                   checked={formData.is_paid}
//                   onCheckedChange={handleSwitchChange}
//                 />
//                 <Label htmlFor="is_paid">This is a paid event</Label>
//               </div>
              
//               {formData.is_paid && (
//                 <div className="mt-2">
//                   <label htmlFor="price" className="text-sm font-medium">
//                     Price ($)
//                   </label>
//                   <Input
//                     id="price"
//                     name="price"
//                     type="text"
//                     value={formData.price === null ? "" : formData.price}
//                     onChange={handlePriceChange}
//                     placeholder="0.00"
//                     className="max-w-xs"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
          
//           <div className="flex justify-end space-x-2 pt-2">
//             {editing && (
//               <Button type="button" variant="outline" onClick={resetForm}>
//                 Cancel
//               </Button>
//             )}
//             <Button type="submit" disabled={saving}>
//               {saving ? "Saving..." : editing ? "Update Event" : "Create Event"}
//             </Button>
//           </div>
//         </form>
//       </div>
      
//       <h3 className="text-lg font-medium mt-8 mb-4">Existing Events</h3>
      
//       {loading ? (
//         <p>Loading events...</p>
//       ) : events.length === 0 ? (
//         <p>No events found. Create your first event above.</p>
//       ) : (
//         <div className="space-y-4">
//           {events.map((event) => (
//             <div key={event.id}>
//               <Card className="overflow-hidden">
//                 <CardContent className="p-0">
//                   <div className="flex flex-col md:flex-row">
//                     {event.image && (
//                       <div className="w-full md:w-1/4 h-48 md:h-auto">
//                         <img
//                           src={event.image}
//                           alt={event.title}
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                     )}
                    
//                     <div className="flex-1 p-6">
//                       <div className="flex justify-between items-start">
//                         <h3 className="text-xl font-medium">{event.title}</h3>
                        
//                         <div className="flex items-center space-x-2">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => toggleEventStats(event.id)}
//                           >
//                             {viewingEventStats === event.id ? "Hide Stats" : "View Stats"}
//                           </Button>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => handleEdit(event)}
//                           >
//                             <Edit className="h-4 w-4" />
//                             <span className="ml-1 hidden sm:inline">Edit</span>
//                           </Button>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             className="text-destructive"
//                             onClick={() => confirmDelete(event.id)}
//                           >
//                             <Trash2 className="h-4 w-4" />
//                             <span className="ml-1 hidden sm:inline">Delete</span>
//                           </Button>
//                         </div>
//                       </div>
                      
//                       <div className="mt-2 space-y-1 text-sm text-muted-foreground">
//                         <div className="flex items-center">
//                           <Calendar className="h-4 w-4 mr-2" />
//                           <span>{event.date}</span>
//                         </div>
                        
//                         {event.time && (
//                           <div className="flex items-center">
//                             <Clock className="h-4 w-4 mr-2" />
//                             <span>{event.time}</span>
//                           </div>
//                         )}
                        
//                         <div className="flex items-center">
//                           <MapPin className="h-4 w-4 mr-2" />
//                           <span>{event.location}</span>
//                         </div>
//                       </div>
                      
//                       {event.is_paid && (
//                         <div className="mt-2">
//                           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
//                             <DollarSign className="h-3 w-3 mr-1" />
//                             Paid Event: ${event.price}
//                           </span>
//                         </div>
//                       )}
                      
//                       {event.description && (
//                         <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
//                           {event.description}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
              
//               {/* Event statistics section */}
//               {viewingEventStats === event.id && (
//                 <div className="mt-2 bg-card rounded-lg p-6 border">
//                   <h4 className="text-md font-medium mb-4">Event Statistics</h4>
                  
//                   <div className="grid md:grid-cols-2 gap-6">
//                     <div>
//                       <h5 className="font-medium mb-2">Registrations ({registrations.length})</h5>
//                       {registrations.length === 0 ? (
//                         <p className="text-sm text-muted-foreground">No registrations yet.</p>
//                       ) : (
//                         <div className="max-h-60 overflow-y-auto">
//                           <Table>
//                             <TableHeader>
//                               <TableRow>
//                                 <TableHead>Name</TableHead>
//                                 <TableHead>Email</TableHead>
//                                 <TableHead>Phone</TableHead>
//                                 <TableHead className="text-right">Actions</TableHead>
//                               </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                               {registrations.map((reg) => (
//                                 <TableRow key={reg.id}>
//                                   <TableCell>{reg.name}</TableCell>
//                                   <TableCell>{reg.email}</TableCell>
//                                   <TableCell>{reg.phone}</TableCell>
//                                   <TableCell className="text-right">
//                                     <div className="flex items-center justify-end space-x-2">
//                                       <Button 
//                                         variant="ghost" 
//                                         size="sm"
//                                         onClick={() => handleContactRegistrant(reg.email)}
//                                       >
//                                         <Mail className="h-4 w-4" />
//                                       </Button>
//                                       <Button 
//                                         variant="ghost" 
//                                         size="sm" 
//                                         className="text-destructive"
//                                         onClick={() => confirmDeleteRegistration(reg.id)}
//                                       >
//                                         <Trash2 className="h-4 w-4" />
//                                       </Button>
//                                     </div>
//                                   </TableCell>
//                                 </TableRow>
//                               ))}
//                             </TableBody>
//                           </Table>
//                         </div>
//                       )}
//                     </div>
                    
//                     <div>
//                       <h5 className="font-medium mb-2">Payments ({payments.length})</h5>
//                       {payments.length === 0 ? (
//                         <p className="text-sm text-muted-foreground">No payments yet.</p>
//                       ) : (
//                         <div className="max-h-60 overflow-y-auto">
//                           <Table>
//                             <TableHeader>
//                               <TableRow>
//                                 <TableHead>Email</TableHead>
//                                 <TableHead>Amount</TableHead>
//                                 <TableHead>Method</TableHead>
//                                 <TableHead>Status</TableHead>
//                               </TableRow>
//                             </TableHeader>
//                             <TableBody>
//                               {payments.map((payment) => (
//                                 <TableRow key={payment.id}>
//                                   <TableCell>{payment.user_email}</TableCell>
//                                   <TableCell>${payment.amount} {payment.currency}</TableCell>
//                                   <TableCell>{payment.payment_method}</TableCell>
//                                   <TableCell>{payment.payment_status}</TableCell>
//                                 </TableRow>
//                               ))}
//                             </TableBody>
//                           </Table>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
      
//       {/* Delete Event Dialog */}
//       <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//             <AlertDialogDescription>
//               This action cannot be undone. This will permanently delete the event
//               and all associated registrations and payments.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={() => deleteEventId && handleDelete(deleteEventId)}
//               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//             >
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
      
//       {/* Delete Registration Dialog */}
//       <AlertDialog open={deleteRegistrationDialogOpen} onOpenChange={setDeleteRegistrationDialogOpen}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delete registration?</AlertDialogTitle>
//             <AlertDialogDescription>
//               Are you sure you want to delete this registration?
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={() => deleteRegistrationId && handleDeleteRegistration(deleteRegistrationId)}
//               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
//             >
//               Delete
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// };

// export default EventManager;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Clock, X, Edit, Trash2, DollarSign, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "@/services/eventService";

export type Event = {
  id: number;
  title: string;
  date: string;
  time?: string;
  location: string;
  description?: string;
  image_url?: string;
  created_at: string;
  is_paid: boolean;
  price: number | null;
};

const EventManager = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Event>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  

useEffect(() => {
  loadEvents();
}, []);

const loadEvents = async () => {
  try {
    setLoading(true);
    const data = await fetchEvents(); // from eventService
    setEvents(data);
  } catch (err) {
    console.error("Error loading events:", err);
    toast.error("Failed to load events");
  } finally {
    setLoading(false);
  }
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_paid: checked, price: checked ? (prev.price || 0) : null }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
      setFormData((prev) => ({ ...prev, price: value === '' ? null : parseFloat(value) }));
    }
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!formData.title || !formData.date || !formData.location) {
  //     toast.error("Please fill in all required fields");
  //     return;
  //   }
  //   setSaving(true);
  //   try {
  //     if (editingId !== null) {
  //       await updateEvent(editingId, formData);
  //       toast.success("Event updated successfully");
  //     } else {
  //       await createEvent(formData);
  //       toast.success("Event created successfully");
  //     }
  //     setFormData({});
  //     setEditingId(null);
  //     loadEvents();
  //   } catch (err) {
  //     toast.error("Failed to save event");
  //   } finally {
  //     setSaving(false);
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!formData.title || !formData.date || !formData.location) {
    toast.error("Please fill in all required fields");
    return;
  }

  setSaving(true);

  try {
    const payload = {
      title: formData.title,
      description: formData.description || "",
      date: formData.date,
      time: formData.time || "",
      location: formData.location,
      image_url: formData.image || "", // map correct key
      is_paid: !!formData.is_paid,
      price: formData.is_paid ? formData.price ?? null : null,
    };

    if (editingId !== null) {
      await updateEvent(editingId, payload);
      toast.success("Event updated successfully");
    } else {
      await createEvent(payload);
      toast.success("Event created successfully");
    }

    // Clear and reload
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
    setEditingId(null);
    loadEvents();
  } catch (err) {
    console.error("Error saving event:", err);
    toast.error("Failed to save event");
  } finally {
    setSaving(false);
  }
};


 const handleEdit = (event: Event) => {
  setFormData({
    title: event.title,
    date: event.date || "",
    time: event.time || "",
    location: event.location || "",
    description: event.description || "",
    image: event.image_url || "", // map DB → UI
    is_paid: event.is_paid || false,
    price: event.price ?? null,
  });
  setEditingId(event.id); // Hide stats if editing
  window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scroll
};


  const handleDelete = async (id: number) => {
    try {
      await deleteEvent(id);
      toast.success("Event deleted successfully");
      loadEvents();
    } catch (err) {
      toast.error("Failed to delete event");
    } finally {
      setDeleteEventId(null);
      setDeleteDialogOpen(false);
    }
  };

  const resetForm = () => {
    setFormData({});
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-medium mb-4">
          {editingId ? "Edit Event" : "Add New Event"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title*</label>
              <Input name="title" value={formData.title || ""} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date*</label>
              <Input name="date" type="date" value={formData.date || ""} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Time</label>
              <Input name="time" value={formData.time || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Location*</label>
              <Input name="location" value={formData.location || ""} onChange={handleChange} required />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea name="description" value={formData.description || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input name="image" value={formData.image || ""} onChange={handleChange} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center space-x-2">
                <Switch id="is_paid" checked={formData.is_paid || false} onCheckedChange={handleSwitchChange} />
                <Label htmlFor="is_paid">Paid Event</Label>
              </div>
              {formData.is_paid && (
                <div className="mt-2">
                  <label className="text-sm font-medium">Price ($)</label>
                  <Input
                    name="price"
                    type="text"
                    value={formData.price === null ? "" : formData.price}
                    onChange={handlePriceChange}
                    className="max-w-xs"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-2">
            {editingId && <Button variant="outline" onClick={resetForm}>Cancel</Button>}
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : editingId ? "Update Event" : "Create Event"}</Button>
          </div>
        </form>
      </div>

      <h3 className="text-lg font-medium mt-8 mb-4">Existing Events</h3>
      {loading ? (
        <p>Loading events...</p>
      ) : !events || events.length === 0 ? (
        <p>No events found. Create your first event above.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
  <CardContent className="p-0">
    <div className="flex flex-col md:flex-row">
      {event.image_url && (
        <div className="w-full md:w-1/4 h-48 md:h-auto">
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-medium">{event.title}</h3>
          <div className="flex items-center space-x-2">
            <Button size="sm" onClick={() => handleEdit(event)}>Edit</Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                setDeleteEventId(event.id);
                setDeleteDialogOpen(true);
              }}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
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

        {event.is_paid && event.price !== null && event.price > 0 && (
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

          ))}
        </ul>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteEventId && handleDelete(deleteEventId)} className="bg-destructive text-white">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EventManager;
