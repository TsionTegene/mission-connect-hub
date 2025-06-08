// hooks/useAuth.tsx
import React, { useState, createContext, useContext, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  session: any | null;
  user: User | null;
  signOut: () => Promise<void>;
  refreshAuth: () => void;
  loading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  signOut: async () => {},
  refreshAuth: () => {},
  loading: true,
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<any | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const refreshAuth = () => {
    const storedUser = localStorage.getItem("adminUser");
    const storedRole = localStorage.getItem("adminRole");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const isAdminFlag = storedRole === "admin" || parsedUser.email?.includes("admin");

        setUser(parsedUser);
        setSession({ user: parsedUser });
        setIsAdmin(isAdminFlag);
      } catch (e) {
        console.error("Failed to parse localStorage auth");
        localStorage.clear();
        setUser(null);
        setSession(null);
        setIsAdmin(false);
      }
    } else {
      setUser(null);
      setSession(null);
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    refreshAuth();
    setLoading(false);
  }, []);

  const signOut = async () => {
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminRole");
    localStorage.removeItem("adminToken");
    setSession(null);
    setUser(null);
    setIsAdmin(false);
    navigate("/admin/login");
  };

  return (
    <AuthContext.Provider value={{ session, user, signOut, refreshAuth, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default useAuth;
