// @ts-nocheck
import express from 'express';
import { unidadesController } from '../controllers/unidadesController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
router.use('/', authMiddleware);

router.get('/', asyncHandler(unidadesController.listar));
router.get('/:id', asyncHandler(unidadesController.obter));
router.post('/', asyncHandler(unidadesController.criar));
router.put('/:id', asyncHandler(unidadesController.atualizar));
router.delete('/:id', asyncHandler(unidadesController.excluir));

export default router;