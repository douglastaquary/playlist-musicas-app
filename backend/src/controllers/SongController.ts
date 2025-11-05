import { Request, Response } from 'express';
import { SongRepository } from '../repositories/SongRepository';
import { CreateSongDto, UpdateSongDto } from '../models/Song';

export class SongController {
  private songRepository: SongRepository;

  constructor() {
    this.songRepository = new SongRepository();
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const songs = await this.songRepository.findAll();
      res.json(songs);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar músicas' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const song = await this.songRepository.findById(id);

      if (!song) {
        res.status(404).json({ error: 'Música não encontrada' });
        return;
      }

      res.json(song);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar música' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const data: CreateSongDto = req.body;

      if (!data.name || data.name.trim() === '') {
        res.status(400).json({ error: 'Nome da música é obrigatório' });
        return;
      }

      const song = await this.songRepository.create(data);
      res.status(201).json(song);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar música' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data: UpdateSongDto = req.body;

      const song = await this.songRepository.update(id, data);

      if (!song) {
        res.status(404).json({ error: 'Música não encontrada' });
        return;
      }

      res.json(song);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar música' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.songRepository.delete(id);

      if (!deleted) {
        res.status(404).json({ error: 'Música não encontrada' });
        return;
      }

      res.json({ message: 'Música excluída com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Erro ao excluir música' });
    }
  }

  async move(req: Request, res: Response): Promise<void> {
    try {
      const { fromPosition, toPosition } = req.body;

      if (typeof fromPosition !== 'number' || typeof toPosition !== 'number') {
        res.status(400).json({ error: 'Posições inválidas' });
        return;
      }

      await this.songRepository.moveSong(fromPosition, toPosition);
      const songs = await this.songRepository.findAll();
      res.json(songs);
    } catch (error: any) {
      res.status(400).json({ error: error.message || 'Erro ao mover música' });
    }
  }
}

