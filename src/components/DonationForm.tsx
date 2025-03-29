
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const PRESET_AMOUNTS = [10, 25, 50, 100, 250, 500];

const DonationForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number | string>(50);
  const [customAmount, setCustomAmount] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [notes, setNotes] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleCustomAmountChange = (value: string) => {
    // Allow only numeric input with 2 decimal places
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value) || value === "") {
      setAmount(value === "" ? "" : value);
    }
  };

  const handlePresetAmount = (value: number) => {
    setCustomAmount(false);
    setAmount(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || Number(amount) <= 0) {
      toast.error("Please enter a valid donation amount");
      return;
    }
    
    setProcessing(true);
    
    try {
      // For demo purposes, we'll simulate a payment and create a donation record
      // In a production environment, this would call a Stripe or other payment API
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create donation record in Supabase
      const { error } = await supabase
        .from('donations')
        .insert({
          user_id: user?.id || null,
          amount: Number(amount),
          payment_method: paymentMethod,
          payment_status: "succeeded",
          is_anonymous: isAnonymous,
          notes: notes || null
        });
        
      if (error) throw error;
      
      toast.success("Thank you for your generous donation!");
      navigate("/donation-success", { 
        state: { 
          amount, 
          date: new Date().toLocaleDateString() 
        } 
      });
    } catch (error) {
      console.error("Error processing donation:", error);
      toast.error("Failed to process your donation. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="container max-w-3xl mx-auto py-8 px-4">
      <Card className="glass">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Support Our Mission</CardTitle>
          <CardDescription>
            Your generous donation helps us continue our work in the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <label className="text-sm font-medium">Select Amount</label>
              
              <div className="grid grid-cols-3 gap-3">
                {PRESET_AMOUNTS.map((presetAmount) => (
                  <Button
                    key={presetAmount}
                    type="button"
                    variant={amount === presetAmount && !customAmount ? "default" : "outline"}
                    onClick={() => handlePresetAmount(presetAmount)}
                    className="h-12"
                  >
                    ${presetAmount}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center space-x-2 mt-4">
                <Switch
                  id="custom-amount"
                  checked={customAmount}
                  onCheckedChange={(checked) => {
                    setCustomAmount(checked);
                    if (checked) {
                      setAmount("");
                    } else {
                      setAmount(50);
                    }
                  }}
                />
                <Label htmlFor="custom-amount">Custom Amount</Label>
              </div>
              
              {customAmount && (
                <div className="flex items-center mt-2">
                  <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center text-lg font-medium bg-muted border rounded-l-md">
                    $
                  </div>
                  <Input
                    value={amount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="Enter amount"
                    className="rounded-l-none"
                    autoFocus
                  />
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method</label>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit_card" id="credit_card" />
                  <Label htmlFor="credit_card">Credit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                  <Label htmlFor="bank_transfer">Bank Transfer</Label>
                </div>
              </RadioGroup>
            </div>
            
            {user && (
              <div className="flex items-center space-x-2">
                <Switch
                  id="anonymous"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
                <Label htmlFor="anonymous">Make my donation anonymous</Label>
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Additional Notes (Optional)
              </label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special instructions or dedication information"
                rows={3}
              />
            </div>
            
            <Button type="submit" className="w-full" size="lg" disabled={processing}>
              {processing ? "Processing..." : `Donate $${amount || 0}`}
            </Button>
            
            <p className="text-sm text-muted-foreground text-center mt-4">
              All donations are securely processed. A receipt will be sent to your email.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonationForm;
