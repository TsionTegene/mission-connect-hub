
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DonationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { amount: number | string; date: string } | null;

  useEffect(() => {
    // If someone tries to access this page directly without state, redirect to home
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full text-center">
          <div className="mx-auto bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Thank You for Your Donation!</h1>
          
          <p className="text-xl mb-6">
            Your generous gift of <span className="font-semibold">${state.amount}</span> on {state.date} will make a meaningful impact.
          </p>
          
          <div className="glass rounded-lg p-6 mb-8">
            <p className="mb-4">
              Your donation helps us continue our mission to support and strengthen our community through various programs and initiatives.
            </p>
            
            <p>
              A receipt has been sent to your email. Please check your inbox for confirmation details.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate("/")} variant="default">
              Return to Home
            </Button>
            
            <Button onClick={() => navigate("/donate")} variant="outline">
              Make Another Donation
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DonationSuccess;
