import { Router } from 'express';
import { unidadesController } from '../controllers/unidadesController';
import { authMiddleware } from '../middlewares/autenticacao';

const router = Router();

// Todas as rotas de unidades requerem autenticação
router.use('/', authMiddleware);

// Rotas
function asyncHandler(fn: any) {
	return function (req: any, res: any, next: any) {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
}

router.get('/', asyncHandler(unidadesController.listar));
router.get('/:id', asyncHandler(unidadesController.obter));
router.post('/', asyncHandler(unidadesController.criar));
router.put('/:id', asyncHandler(unidadesController.atualizar));
router.delete('/:id', asyncHandler(unidadesController.excluir));

export default router;

