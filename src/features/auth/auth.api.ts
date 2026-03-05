import { api } from "../../lib/api";
import type { LoginPayload, RegisterPayload, TokenResponse } from "./auth.types";

export async function register(payload: RegisterPayload): Promise<TokenResponse> {
  const { data } = await api.post<TokenResponse>("/users/register", payload);
  return data;
}

export async function login(payload: LoginPayload): Promise<TokenResponse> {
  const { data } = await api.post<TokenResponse>("/users/login", payload);
  return data;
}