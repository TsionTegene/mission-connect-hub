
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AdminSignupFormProps = {
  email: string;
  username: string;
  password: string;
  loading: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const AdminSignupForm: React.FC<AdminSignupFormProps> = ({
  email,
  username,
  password,
  loading,
  onEmailChange,
  onUsernameChange,
  onPasswordChange,
  onSubmit
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="space-y-2">
      <label htmlFor="email-signup" className="text-sm font-medium">
        Email
      </label>
      <Input
        id="email-signup"
        type="email"
        placeholder="admin@example.com"
        value={email}
        onChange={onEmailChange}
        required
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="username-signup" className="text-sm font-medium">
        Username
      </label>
      <Input
        id="username-signup"
        type="text"
        placeholder="admin"
        value={username}
        onChange={onUsernameChange}
        required
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="password-signup" className="text-sm font-medium">
        Password
      </label>
      <Input
        id="password-signup"
        type="password"
        value={password}
        onChange={onPasswordChange}
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
);

export default AdminSignupForm;
