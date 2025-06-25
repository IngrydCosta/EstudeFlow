import { Router } from "express";
import userRoutes from "../routes/routes";

const router: Router = Router();

router.use('/', userRoutes as Router);

export default router;
