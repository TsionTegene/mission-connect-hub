import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { v4 as uuidv4 } from 'uuid';

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
            // Already logged in as admin, redirect to dashboard
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
      // Simple validation
      if (!email || !password) {
        toast.error("Email and password are required");
        setLoading(false);
        return;
      }

      // Check if the email contains 'admin' for mock admin privileges
      if (!email.includes("admin")) {
        toast.error("You do not have admin privileges");
        setLoading(false);
        return;
      }

      // Mock successful login
      const mockUser = {
        id: uuidv4(),
        email: email,
        full_name: email.split('@')[0]
      };
      
      // Store in localStorage for persistence
      localStorage.setItem('mockUser', JSON.stringify(mockUser));
      
      // Successfully logged in as admin
      toast.success("Logged in successfully");
      navigate("/admin/dashboard");
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
      // First check if email contains 'admin' for admin privileges
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

      // Mock successful signup
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
        {/* Back button */}
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
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email-login" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email-login"
                      type="email"
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="password-login"
                      className="text-sm font-medium"
                    >
                      Password
                    </label>
                    <Input
                      id="password-login"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    className="w-full mt-4"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email-signup" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email-signup"
                      type="email"
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email-signup" className="text-sm font-medium">
                      Username
                    </label>
                    <Input
                      id="username-signup"
                      type="text"
                      placeholder="admin"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="password-signup"
                      className="text-sm font-medium"
                    >
                      Password
                    </label>
                    <Input
                      id="password-signup"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    className="w-full mt-4"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
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
