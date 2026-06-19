import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from "@/app/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface MeResponse {
  id: string;
  name: string;
  email: string;
  is_admin: boolean;
}

/**
 * Google ID トークンをバックエンドに渡して、こちらの JWT を受け取る
 */
export const googleLogin = async (
  credential: string
): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google login failed: ${response.status} - ${errorText}`);
  }

  return response.json();
};

/**
 * 現在のユーザー情報（管理者かどうかを含む）を取得
 */
export const getMe = async (token: string): Promise<MeResponse> => {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch current user: ${response.status}`);
  }

  return response.json();
};

export const register = async (
  credentials: RegisterCredentials
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const formData = new URLSearchParams();
  formData.append("username", credentials.username);
  formData.append("password", credentials.password);

  console.log("Attempting login to:", `${API_URL}/token`);
  console.log("Credentials:", { username: credentials.username });

  const response = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  console.log("Response status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Login error:", errorText);
    throw new Error(`Login failed: ${response.status} - ${errorText}`);
  }

  return response.json();
};
