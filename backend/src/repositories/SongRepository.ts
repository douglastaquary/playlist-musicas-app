import { dbGet, dbAll, dbRun } from '../config/database';
import { Song, CreateSongDto, UpdateSongDto } from '../models/Song';
import { v4 as uuidv4 } from 'uuid';

export class SongRepository {
  async findAll(): Promise<Song[]> {
    const songs = await dbAll('SELECT * FROM songs ORDER BY position ASC') as Song[];
    return songs;
  }

  async findById(id: string): Promise<Song | null> {
    const song = await dbGet('SELECT * FROM songs WHERE id = ?', [id]) as Song | undefined;
    return song || null;
  }

  async create(data: CreateSongDto): Promise<Song> {
    const id = uuidv4();
    
    // Obter a próxima posição
    const maxPosition = await dbGet('SELECT MAX(position) as max FROM songs') as { max: number | null };
    const position = (maxPosition?.max ?? -1) + 1;

    const song: Song = {
      id,
      name: data.name,
      artist: data.artist || '',
      position,
    };

    await dbRun(
      'INSERT INTO songs (id, name, artist, position) VALUES (?, ?, ?, ?)',
      [song.id, song.name, song.artist, song.position]
    );

    return song;
  }

  async update(id: string, data: UpdateSongDto): Promise<Song | null> {
    const song = await this.findById(id);
    if (!song) return null;

    const updatedSong: Song = {
      ...song,
      ...data,
    };

    await dbRun(
      'UPDATE songs SET name = ?, artist = ?, position = ? WHERE id = ?',
      [updatedSong.name, updatedSong.artist || '', updatedSong.position, id]
    );

    return updatedSong;
  }

  async delete(id: string): Promise<boolean> {
    const song = await this.findById(id);
    if (!song) return false;

    await dbRun('DELETE FROM songs WHERE id = ?', [id]);
    
    // Reordenar posições
    await this.reorderPositions();
    
    return true;
  }

  async reorderPositions(): Promise<void> {
    const songs = await this.findAll();
    for (let i = 0; i < songs.length; i++) {
      await dbRun('UPDATE songs SET position = ? WHERE id = ?', [i, songs[i].id]);
    }
  }

  async moveSong(fromPosition: number, toPosition: number): Promise<void> {
    const songs = await this.findAll();
    
    if (fromPosition < 0 || fromPosition >= songs.length || 
        toPosition < 0 || toPosition >= songs.length) {
      throw new Error('Posições inválidas');
    }

    const [movedSong] = songs.splice(fromPosition, 1);
    songs.splice(toPosition, 0, movedSong);

    // Atualizar todas as posições
    for (let i = 0; i < songs.length; i++) {
      await dbRun('UPDATE songs SET position = ? WHERE id = ?', [i, songs[i].id]);
    }
  }
}

