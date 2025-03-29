
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import SEO from "@/components/SEO";

const EventPaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventTitle, amount, currency, name } = location.state || {};

  useEffect(() => {
    if (!eventTitle) {
      // Redirect to home if accessing this page directly
      navigate("/");
    }
  }, [eventTitle, navigate]);

  if (!eventTitle) {
    return null;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <SEO 
        title="Payment Successful" 
        description="Your event registration payment was successful" 
        noIndex={true}
      />
      
      <div className="max-w-md mx-auto">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Payment Successful!</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p>
              Thank you, <span className="font-semibold">{name}</span>, for your registration.
            </p>
            
            <div className="bg-muted p-4 rounded-md">
              <h3 className="font-medium mb-2">{eventTitle}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your registration has been confirmed
              </p>
              
              <div className="flex justify-between py-1 border-t">
                <span>Amount paid:</span>
                <span className="font-medium">${amount} {currency}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Transaction ID:</span>
                <span className="font-medium text-sm">mock-{Date.now().toString().slice(-8)}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your email address.
            </p>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-2">
            <Button 
              onClick={() => navigate("/")} 
              className="w-full"
            >
              Return to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default EventPaymentSuccess;
