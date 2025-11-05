export interface Song {
  id: string;
  name: string;
  artist?: string;
  position: number;
  created_at?: string;
}

export interface CreateSongDto {
  name: string;
  artist?: string;
}

export interface UpdateSongDto {
  name?: string;
  artist?: string;
  position?: number;
}

