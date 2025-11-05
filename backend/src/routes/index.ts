import { Router } from 'express';
import { SongController } from '../controllers/SongController';
import { AuthController } from '../controllers/AuthController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();
const songController = new SongController();
const authController = new AuthController();

// Rotas públicas
router.get('/songs', songController.getAll.bind(songController));
router.post('/songs', songController.create.bind(songController)); // Usuários podem adicionar
router.post('/auth/login', authController.login.bind(authController));

// Rotas protegidas (admin)
router.get('/songs/:id', authenticateToken, requireAdmin, songController.getById.bind(songController));
router.put('/songs/:id', authenticateToken, requireAdmin, songController.update.bind(songController));
router.delete('/songs/:id', authenticateToken, requireAdmin, songController.delete.bind(songController));
router.post('/songs/move', authenticateToken, requireAdmin, songController.move.bind(songController));

export default router;

