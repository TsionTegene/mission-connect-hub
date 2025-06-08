// ✅ Admin-only site: remove mock login logic from Auth.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to admin login
    navigate("/admin/login");
  }, [navigate]);

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
              Redirecting...
            </CardTitle>
            <CardDescription className="text-center">
              Only admin login is available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground">
              Taking you to the admin login page.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2" />
        </Card>
      </div>
    </div>
  );
};

export default Auth;
