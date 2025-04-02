
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, MapPin, DollarSign } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEO from "@/components/SEO";

const EventPayment = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  
  useEffect(() => {
    if (eventId) {
      fetchEvent(eventId);
    }
  }, [eventId]);
  
  const fetchEvent = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      
      if (!data) {
        toast.error("Event not found");
        navigate("/");
        return;
      }
      
      // If event is not paid, redirect to home
      if (!data.is_paid) {
        toast.error("This event does not require payment");
        navigate("/");
        return;
      }
      
      setEvent(data);
    } catch (error) {
      console.error("Error fetching event:", error);
      toast.error("Failed to load event details");
    } finally {
      setLoading(false);
    }
  };
  
  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setPaymentLoading(true);
    
    try {
      // Create a mock transaction ID
      const transactionId = `mock-${Date.now().toString().slice(-8)}`;
      
      // Skip saving to payments table which is causing RLS policy issues
      // Just create a registration entry
      const { error: registrationError } = await supabase
        .from('registrations')
        .insert({
          event_id: event.id,
          event_title: event.title,
          name: name,
          email: email,
          phone: "N/A (paid registration)",
          notes: `Paid registration via ${paymentMethod}. Transaction ID: ${transactionId}`
        });
      
      if (registrationError) throw registrationError;
      
      // Navigate to success page
      navigate("/event-payment-success", { 
        state: { 
          eventTitle: event.title,
          amount: event.price,
          currency: "USD",
          name: name
        } 
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Failed to process payment. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto py-12 flex justify-center">
        <p>Loading event details...</p>
      </div>
    );
  }
  
  if (!event) {
    return null;
  }
  
  return (
    <div className="container mx-auto py-12 px-4">
      <SEO 
        title={`Register for ${event.title}`} 
        description={`Complete your registration for ${event.title}`} 
        noIndex={true}
      />
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Event Registration Payment</h1>
        
        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Registration Details</CardTitle>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handlePayment} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Payment Method</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div 
                        className={`border rounded-md p-3 cursor-pointer flex items-center ${
                          paymentMethod === "credit_card" ? "border-primary bg-primary/5" : "border-border"
                        }`}
                        onClick={() => setPaymentMethod("credit_card")}
                      >
                        <div className="mr-2 w-4 h-4 rounded-full border border-primary flex items-center justify-center">
                          {paymentMethod === "credit_card" && (
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <span>Credit Card</span>
                      </div>
                      
                      <div 
                        className={`border rounded-md p-3 cursor-pointer flex items-center ${
                          paymentMethod === "paypal" ? "border-primary bg-primary/5" : "border-border"
                        }`}
                        onClick={() => setPaymentMethod("paypal")}
                      >
                        <div className="mr-2 w-4 h-4 rounded-full border border-primary flex items-center justify-center">
                          {paymentMethod === "paypal" && (
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                          )}
                        </div>
                        <span>PayPal</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit" className="w-full" disabled={paymentLoading}>
                      {paymentLoading ? "Processing..." : `Pay $${event.price} USD`}
                    </Button>
                    <p className="text-xs text-center mt-2 text-muted-foreground">
                      This is a mock payment - no actual payment will be processed
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Event Summary</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">{event.title}</h3>
                  {event.description && (
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                  )}
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{event.date}</span>
                  </div>
                  
                  {event.time && (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{event.time}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex justify-between py-2">
                    <span>Registration Fee</span>
                    <span className="font-medium">${event.price} USD</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-t font-medium">
                    <span>Total</span>
                    <span>${event.price} USD</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-center border-t pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/")}
                  size="sm"
                >
                  Cancel Registration
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPayment;
