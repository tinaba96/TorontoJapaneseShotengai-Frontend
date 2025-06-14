"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, LoginCredentials, RegisterCredentials } from "@/app/types/auth";
import { login as loginApi, register as registerApi } from "@/app/lib/api/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      // TODO: Fetch user data using the token
    }
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await loginApi(credentials);
      setToken(response.access_token);
      localStorage.setItem("token", response.access_token);
      // TODO: Fetch and set user data
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
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
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
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
