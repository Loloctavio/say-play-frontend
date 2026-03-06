export type VerifiedInfo = {
  status?: string;
  confidence?: number;
  spotify_id?: string;
  spotify_url?: string;
  matched_track?: string;
  matched_artist?: string;
  preview_url?: string;
};

export type Song = {
  artist?: string;
  track?: string;
  reason?: string;
  genres?: string[];
  spotify_url?: string;
  suggested_by?: string[];
  verified?: VerifiedInfo;
  [k: string]: unknown;
};

export type PlaylistDraftOut = {
  name_suggestion: string;
  description_suggestion: string | null;
  source_prompt: string;
  songs: Song[];
  total_songs: number;
};

export type PlaylistOut = {
  id: string;
  user_id: string;
  name?: string | null;
  description?: string | null;
  source_prompt?: string | null;
  songs: Song[];
  total_songs: number;
  total_duration_ms?: number | null;
  created_at: string;
  updated_at: string;
};

export type PlaylistGenerateRequest = {
  prompt: string;
  min_songs?: number;
  max_songs?: number;
};

export type PlaylistSaveRequest = {
  name: string;
  description?: string | null;
  songs: Song[];
  source_prompt?: string | null;
  total_songs?: number | null;
  total_duration_ms?: number | null;
};

export type PlaylistUpdate = {
  name?: string | null;
  description?: string | null;
  songs?: Song[] | null;
  total_songs?: number | null;
  total_duration_ms?: number | null;
};

export type SpotifyExportPayload = {
  public?: boolean;
};

export type SpotifyExportOut = {
  exported: boolean;
  spotify_playlist_id: string;
  spotify_playlist_url?: string | null;
  added_tracks: number;
  total_songs: number;
};
