import { Router } from 'express';
import { usuariosController } from '../controllers/usuariosController';
import { authMiddleware } from '../middlewares/autenticacao';

const router = Router();

// Todas as rotas de usuários requerem autenticação
router.use(authMiddleware);

// Rotas
router.get('/perfil', usuariosController.perfil);
router.put('/perfil', usuariosController.atualizarPerfil);

export default router;

