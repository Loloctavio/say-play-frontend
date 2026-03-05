import { api } from "../../lib/api";
import type {
  PlaylistDraftOut,
  PlaylistGenerateRequest,
  PlaylistOut,
  PlaylistSaveRequest,
  PlaylistUpdate,
} from "./playlists.types";

export async function generatePlaylist(payload: PlaylistGenerateRequest): Promise<PlaylistDraftOut> {
  const { data } = await api.post<PlaylistDraftOut>("/playlists/generate", payload);
  return data;
}

export async function savePlaylist(payload: PlaylistSaveRequest): Promise<PlaylistOut> {
  const { data } = await api.post<PlaylistOut>("/playlists", payload);
  return data;
}

export async function listMyPlaylists(params?: { limit?: number; skip?: number }): Promise<PlaylistOut[]> {
  const { data } = await api.get<PlaylistOut[]>("/playlists", { params });
  return data;
}

export async function getPlaylist(playlistId: string): Promise<PlaylistOut> {
  const { data } = await api.get<PlaylistOut>(`/playlists/${playlistId}`);
  return data;
}

export async function updatePlaylist(playlistId: string, payload: PlaylistUpdate): Promise<PlaylistOut> {
  const { data } = await api.put<PlaylistOut>(`/playlists/${playlistId}`, payload);
  return data;
}

export async function deletePlaylist(playlistId: string): Promise<{ deleted: boolean }> {
  const { data } = await api.delete<{ deleted: boolean }>(`/playlists/${playlistId}`);
  return data;
}