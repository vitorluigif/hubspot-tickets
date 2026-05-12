import { api } from "@/services/api";

import type {
  LoginRequest,
  LoginResponse,
  Verify2FARequest,
  Verify2FAResponse,
} from "@/types/auth";

export async function login(data: LoginRequest) {
  const response = await api.post<LoginResponse>("/auth/login", data);
  return response.data;
}

export async function verify2FA(data: Verify2FARequest) {
  const response = await api.post<Verify2FAResponse>("/auth/verify-2fa", data);
  return response.data;
}