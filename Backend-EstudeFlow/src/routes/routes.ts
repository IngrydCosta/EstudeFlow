import { Router } from "express";
import autenticacaoRoutes from "./autenticacao";
import tarefasRoutes from "./tarefas";
import unidadesRoutes from "./unidades";

const router: Router = Router();

router.use('/api/autenticacao', autenticacaoRoutes);
router.use('/api/tarefas', tarefasRoutes);
router.use('/api/unidades', unidadesRoutes);

export default router;