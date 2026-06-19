"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, LoginCredentials, RegisterCredentials } from "@/app/types/auth";
import {
  login as loginApi,
  register as registerApi,
  googleLogin as googleLoginApi,
  getMe,
  type MeResponse,
} from "@/app/lib/api/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithGoogle: (credential: string) => Promise<MeResponse>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function toUser(me: MeResponse): User {
  // Backend ids are UUID strings; the existing User type uses number.
  // The id isn't used in the UI, so we keep the shape and cast safely.
  return {
    id: me.id as unknown as number,
    name: me.name,
    email: me.email,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check for stored token on mount and restore the user (best-effort).
    const storedToken = localStorage.getItem("access_token");
    if (!storedToken) return;
    setToken(storedToken);
    getMe(storedToken)
      .then((me) => {
        setUser(toUser(me));
        setIsAdmin(me.is_admin);
      })
      .catch(() => {
        // Stale/invalid token — clear it.
        localStorage.removeItem("access_token");
        setToken(null);
        setUser(null);
        setIsAdmin(false);
      });
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await loginApi(credentials);
      setToken(response.access_token);
      localStorage.setItem("access_token", response.access_token);
      // TODO: Fetch and set user data
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const loginWithGoogle = async (credential: string): Promise<MeResponse> => {
    const response = await googleLoginApi(credential);
    setToken(response.access_token);
    localStorage.setItem("access_token", response.access_token);
    const me = await getMe(response.access_token);
    setUser(toUser(me));
    setIsAdmin(me.is_admin);
    return me;
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      const user = await registerApi(credentials);
      setUser(user);
      // Automatically log in after registration
      await login({
        username: credentials.email,
        password: credentials.password,
      });
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAdmin,
        login,
        loginWithGoogle,
        register,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
