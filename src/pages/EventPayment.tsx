
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import SEO from "@/components/SEO";

type Event = Database["public"]["Tables"]["events"]["Row"];

const EventPayment = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentForm, setPaymentForm] = useState({
    name: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    fetchEventDetails();
  }, [eventId]);

  const fetchEventDetails = async () => {
    if (!eventId) {
      toast.error("Event not found");
      navigate("/");
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', eventId)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        toast.error("Event not found");
        navigate("/");
        return;
      }

      setEvent(data);
    } catch (error) {
      console.error("Error fetching event details:", error);
      toast.error("Failed to load event details");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!eventId || !event) {
      toast.error("Event information is missing");
      return;
    }

    // Validate form
    if (!paymentForm.name || !paymentForm.email || !paymentForm.phone || 
        !paymentForm.cardNumber || !paymentForm.expiryDate || !paymentForm.cvv) {
      toast.error("Please fill in all fields");
      return;
    }

    setProcessing(true);

    try {
      // Mock payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Register for the event
      const { error: registrationError } = await supabase
        .from('registrations')
        .insert({
          event_id: eventId,
          event_title: event.title,
          name: paymentForm.name,
          email: paymentForm.email,
          phone: paymentForm.phone,
          notes: `Paid registration (${event.price} USD)`
        });

      if (registrationError) throw registrationError;

      // Simulate payment transaction
      const { error: paymentError } = await supabase
        .from('payments')
        .insert({
          event_id: eventId,
          user_email: paymentForm.email,
          amount: event.price,
          currency: 'USD',
          payment_status: 'completed',
          payment_method: 'card',
          transaction_id: `mock-${Date.now()}-${Math.floor(Math.random() * 1000)}`
        });

      if (paymentError) throw paymentError;

      toast.success("Payment successful!");
      navigate("/event-payment-success", { 
        state: { 
          eventTitle: event.title,
          amount: event.price,
          currency: 'USD',
          name: paymentForm.name
        } 
      });
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-[60vh]">
        <p>Loading event details...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-[60vh]">
        <p>Event not found.</p>
      </div>
    );
  }

  if (!event.is_paid || !event.price) {
    navigate(`/`);
    return null;
  }

  return (
    <div className="container mx-auto py-10">
      <SEO title={`Payment for ${event.title}`} noIndex={true} />
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Payment for {event.title}</h1>
        
        <div className="grid gap-6 md:grid-cols-5">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>
                Complete your registration by processing payment
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={paymentForm.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="grid gap-4 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={paymentForm.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={paymentForm.phone}
                      onChange={handleChange}
                      placeholder="(123) 456-7890"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentForm.cardNumber}
                    onChange={handleChange}
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                    required
                  />
                </div>
                
                <div className="grid gap-4 grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentForm.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      value={paymentForm.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={processing}
                >
                  {processing ? "Processing..." : `Pay $${event.price} USD`}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Event Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-muted-foreground">{event.date}</p>
                {event.time && (
                  <p className="text-sm text-muted-foreground">{event.time}</p>
                )}
                <p className="text-sm text-muted-foreground">{event.location}</p>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span>Registration Fee</span>
                  <span>${event.price} USD</span>
                </div>
                <div className="flex justify-between font-bold mt-4">
                  <span>Total</span>
                  <span>${event.price} USD</span>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground mt-4">
                <p>This is a demo payment system. No actual charges will be made.</p>
                <p>You can use any test values for the payment form.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EventPayment;
