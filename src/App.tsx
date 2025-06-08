
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";
import DonationForm from "./components/DonationForm";
import DonationSuccess from "./pages/DonationSuccess";
import EventPayment from "./pages/EventPayment";
import EventPaymentSuccess from "./pages/EventPaymentSuccess";

// Import styles
import "./styles/accessibility.css";

// Create a client - simplified for Node.js compatibility
const queryClient = new QueryClient();

// Analytics tracking component
const AnalyticsTracker = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    // Track page view when route changes
    console.log("Page view:", location.pathname);
  }, [location]);
  
  return null;
};

const App = () => (
  <React.StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <Helmet>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="Mulu Wongel Church - Strengthening communities through faith, service, and compassion" />
          <title>Live Message</title>
          <link rel="icon" href="/favicon.ico" />
        </Helmet>
        
        <TooltipProvider>
          <Toaster />
          <Sonner position="top-right" />
          
          <BrowserRouter>
            <AuthProvider>
              <AnalyticsTracker />
              
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/donate" element={<DonationForm />} />
                <Route path="/donation-success" element={<DonationSuccess />} />
                <Route path="/event-payment/:eventId" element={<EventPayment />} />
                <Route path="/event-payment-success" element={<EventPaymentSuccess />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>
);

export default App;
