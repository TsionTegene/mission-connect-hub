
import { useState, createContext, useContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  email: string;
};

type AuthContextType = {
  session: any | null;
  user: User | null;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  signOut: async () => {},
  loading: true,
  isAdmin: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<any | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // In a real implementation, you would check for an existing session here
  // and set up auth state listeners

  const signOut = async () => {
    // Clear user session
    setSession(null);
    setUser(null);
    setIsAdmin(false);
    navigate("/auth");
  };

  return (
    <AuthContext.Provider value={{ session, user, signOut, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default useAuth;
