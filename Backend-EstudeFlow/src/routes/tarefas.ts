import { Router } from 'express';
import { tarefasController } from '../controllers/tarefasController';
import { authMiddleware } from '../middlewares/autenticacao';

const router = Router();

// Todas as rotas de tarefas requerem autenticação
router.use('/', authMiddleware);

// // Rotas
router.get('/', tarefasController.listar);
router.get('/:id', tarefasController.obter);
router.post('/', tarefasController.criar);
router.put('/:id', tarefasController.atualizar);
router.delete('/:id', tarefasController.excluir);

 export default router;

