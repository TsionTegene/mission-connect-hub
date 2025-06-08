// pages/AdminLogin.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminSignupForm from "@/components/admin/AdminSignupForm";
import { loginAdmin, signupAdmin } from "@/services/authService";

const AdminLogin = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isAdmin, refreshAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("adminUser");
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
  }, [navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [user, isAdmin, navigate]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password || (activeTab === "signup" && (!username || !inviteCode))) {
        toast.error("All fields are required");
        return;
      }

      if (activeTab === "signup" && !email.includes("admin")) {
        toast.error("Admin accounts must contain 'admin' in the email address");
        return;
      }

      const data =
        activeTab === "login"
          ? await loginAdmin(email, password)
          : await signupAdmin(email, username, password, inviteCode);

      if (activeTab === "login") {
        localStorage.setItem("adminToken", data.token);
        localStorage.setItem("adminUser", JSON.stringify(data.admin || data.user));
        refreshAuth();
        toast.success("Logged in successfully");
        navigate("/admin/dashboard");
      } else {
        toast.success("Admin account created successfully. You can now log in.");
        setActiveTab("login");
      }
    } catch (error: any) {
      console.error(`${activeTab} error:`, error);
      toast.error(error.response?.data?.message || error.message || `${activeTab} failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <Button variant="ghost" className="mb-6 pl-0" onClick={() => navigate("/")}> 
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        <Card className="glass">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Admin Portal</CardTitle>
            <CardDescription className="text-center">
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <AdminLoginForm
                  email={email}
                  password={password}
                  loading={loading}
                  onEmailChange={(e) => setEmail(e.target.value)}
                  onPasswordChange={(e) => setPassword(e.target.value)}
                  onSubmit={handleAuthSubmit}
                />
              </TabsContent>
              <TabsContent value="signup">
               <AdminSignupForm
                email={email}
                username={username}
                password={password}
                loading={loading}
                inviteCode={inviteCode}
                onEmailChange={(e) => setEmail(e.target.value)}
                onUsernameChange={(e) => setUsername(e.target.value)}
                onPasswordChange={(e) => setPassword(e.target.value)}
                onInviteCodeChange={(e) => setInviteCode(e.target.value)}
                onSubmit={handleAuthSubmit}
              />

              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <p className="text-sm text-center text-muted-foreground">
              Admin accounts require invite code and valid credentials.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
