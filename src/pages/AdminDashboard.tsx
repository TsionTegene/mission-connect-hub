
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import ContentManager from "@/components/admin/ContentManager";
import AnalyticsDashboard from "@/components/admin/AnalyticsDashboard";
import EventManager from "@/components/admin/EventManager";
import DonationsManager from "@/components/admin/DonationsManager";
import RegistrationsManager from "@/components/admin/RegistrationsManager";
import SEO from "@/components/SEO";

const AdminDashboard = () => {
  const { user, loading, isAdmin, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState("events");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if user is not logged in or not an admin
    if (!loading && (!user || !isAdmin)) {
      toast.error("You need admin privileges to access this page");
      navigate("/admin/login");
    }
  }, [user, loading, isAdmin, navigate]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Admin Dashboard" 
        description="Manage church website content, events, and analytics"
        noIndex={true}
      />
      
      <header className="bg-background sticky top-0 z-10 border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              Logged in as {user.email}
            </span>
            <Button onClick={() => navigate("/")} variant="outline" size="sm">
              View Site
            </Button>
            <Button onClick={signOut} variant="outline" size="sm">
              Log Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs 
          defaultValue="events" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <div className="overflow-x-auto">
            <TabsList className="mb-8">
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="registrations">Registrations</TabsTrigger>
              <TabsTrigger value="donations">Donations</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="events" className="space-y-4">
            <EventManager />
          </TabsContent>

          <TabsContent value="registrations">
            <RegistrationsManager />
          </TabsContent>
          
          <TabsContent value="donations">
            <DonationsManager />
          </TabsContent>

          <TabsContent value="content">
            <ContentManager />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
