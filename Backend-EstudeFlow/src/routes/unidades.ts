import { Router } from 'express';
import { unidadesController } from '../controllers/unidadesController';
import { authMiddleware } from '../middlewares/autenticacao';

const router = Router();

// Todas as rotas de unidades requerem autenticação
router.use(authMiddleware);

// Rotas
router.get('/', unidadesController.listar);
router.get('/:id', unidadesController.obter);
router.post('/', unidadesController.criar);
router.put('/:id', unidadesController.atualizar);
router.delete('/:id', unidadesController.excluir);

export default router;

