
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AdminLoginFormProps = {
  email: string;
  password: string;
  loading: boolean;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
};

const AdminLoginForm: React.FC<AdminLoginFormProps> = ({
  email,
  password,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit
}) => (
  <form onSubmit={onSubmit} className="space-y-4">
    <div className="space-y-2">
      <label htmlFor="email-login" className="text-sm font-medium">
        Email
      </label>
      <Input
        id="email-login"
        type="email"
        placeholder="admin@example.com"
        value={email}
        onChange={onEmailChange}
        required
      />
    </div>
    <div className="space-y-2">
      <label htmlFor="password-login" className="text-sm font-medium">
        Password
      </label>
      <Input
        id="password-login"
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
      {loading ? "Signing in..." : "Sign In"}
    </Button>
  </form>
);

export default AdminLoginForm;
