export type TokenResponse = {
  access_token: string;
  token_type: "bearer" | string;
};

export type RegisterPayload = {
  username: string;
  gmail: string;
  password: string;
  profile_photo?: string | null;
};

export type LoginPayload = {
  gmail: string;
  password: string;
};