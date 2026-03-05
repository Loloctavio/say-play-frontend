export type UserOut = {
  id: string;
  username: string;
  gmail: string;
  profile_photo?: string | null;
  playlists?: string[];
  created_at: string;
  updated_at: string;
};

export type UserUpdate = {
  username?: string | null;
  profile_photo?: string | null;
};

export type ChangePasswordPayload = {
  old_password: string;
  new_password: string;
};