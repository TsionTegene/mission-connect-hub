
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { v4 as uuidv4 } from 'uuid';
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminSignupForm from "@/components/admin/AdminSignupForm";

const AdminLogin = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const savedUser = localStorage.getItem('mockUser');
      if (savedUser) {
        try {
          const user = JSON.parse(savedUser);
          if (user.email?.includes("admin")) {
            navigate("/admin/dashboard");
          }
        } catch (e) {
          console.error("Error parsing saved user:", e);
        }
      }
    };
    checkSession();
  }, [navigate]);

  // Redirect if user and isAdmin are already set (from useAuth)
  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [user, isAdmin, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password) {
        toast.error("Email and password are required");
        setLoading(false);
        return;
      }
      if (!email.includes("admin")) {
        toast.error("You do not have admin privileges");
        setLoading(false);
        return;
      }
      const mockUser = {
        id: uuidv4(),
        email: email,
        full_name: email.split('@')[0]
      };
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      toast.success("Logged in successfully");
      window.location.replace("/admin/dashboard");
    } catch (error) {
      console.error("Unexpected error during login:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email.includes("admin")) {
        toast.error("Admin accounts must contain 'admin' in the email address");
        setLoading(false);
        return;
      }
      if (!email || !password || !username) {
        toast.error("All fields are required");
        setLoading(false);
        return;
      }
      toast.success("Admin account created successfully. You can now log in.");
      setActiveTab("login");
    } catch (error) {
      console.error("Unexpected error during signup:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          className="mb-6 pl-0" 
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        <Card className="glass">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              Admin Portal
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <AdminLoginForm
                  email={email}
                  password={password}
                  loading={loading}
                  onEmailChange={e => setEmail(e.target.value)}
                  onPasswordChange={e => setPassword(e.target.value)}
                  onSubmit={handleLogin}
                />
              </TabsContent>
              <TabsContent value="signup">
                <AdminSignupForm
                  email={email}
                  username={username}
                  password={password}
                  loading={loading}
                  onEmailChange={e => setEmail(e.target.value)}
                  onUsernameChange={e => setUsername(e.target.value)}
                  onPasswordChange={e => setPassword(e.target.value)}
                  onSubmit={handleSignup}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <p className="text-sm text-center text-muted-foreground">
              Admin accounts require valid credentials to access the dashboard.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
