
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

  useEffect(() => {
    // Check for user in localStorage (mock auth persistence)
    const checkForUser = () => {
      const savedUser = localStorage.getItem('mockUser');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setSession({ user: parsedUser });
          
          // Set admin status based on email containing "admin"
          setIsAdmin(parsedUser.email.includes("admin"));
        } catch (e) {
          console.error("Error parsing saved user:", e);
          localStorage.removeItem('mockUser');
        }
      }
      setLoading(false);
    };
    
    checkForUser();
  }, []);

  const signOut = async () => {
    // Clear user session
    localStorage.removeItem('mockUser');
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
