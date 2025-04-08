import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

type Profile = {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
};

const UserProfile = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [updating, setUpdating] = useState(false);

  // Mock profile data for frontend development
  useState(() => {
    setLoading(true);
    setTimeout(() => {
      // Mock profile data
      setFullName("Demo User");
      setAvatarUrl("https://github.com/shadcn.png");
      setLoading(false);
    }, 500);
  });

  const updateProfile = async () => {
    try {
      setUpdating(true);
      
      // Mock profile update - in a real app, this would update your backend
      console.log("Updating profile:", {
        fullName,
        avatarUrl
      });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center p-10">Loading profile...</div>;
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <Card className="glass">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={avatarUrl} />
              <AvatarFallback>
                {fullName?.substring(0, 2) || user?.email?.substring(0, 2) || "U"}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Your Profile</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="full-name" className="text-sm font-medium">
              Full Name
            </label>
            <Input
              id="full-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="avatar-url" className="text-sm font-medium">
              Avatar URL
            </label>
            <Input
              id="avatar-url"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={updateProfile} disabled={updating}>
            {updating ? "Updating..." : "Update Profile"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserProfile;
