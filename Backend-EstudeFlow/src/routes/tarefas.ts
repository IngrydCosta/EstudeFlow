import express from 'express';
import { tarefasController } from '../controllers/tarefasController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.use(authMiddleware);

router.get('/', asyncHandler(tarefasController.listar));
router.get('/:id', asyncHandler(tarefasController.obter));
router.post('/', asyncHandler(tarefasController.criar));
router.put('/:id', asyncHandler(tarefasController.atualizar));
router.delete('/:id', asyncHandler(tarefasController.excluir));

export default router;