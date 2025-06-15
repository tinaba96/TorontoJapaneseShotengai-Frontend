import {
  LoginCredentials,
  RegisterCredentials,
  AuthResponse,
  User,
} from "@/app/types/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

  const response = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  return response.json();
};
