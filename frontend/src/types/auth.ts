export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  requires2FA: true;
  userId: string;
  expiresAt: string;
}

export interface Verify2FARequest {
  userId: string;
  code: string;
}

export interface Verify2FAResponse {
  token: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}