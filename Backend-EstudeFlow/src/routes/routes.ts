import { Router } from "express";
import userRoutes from "../entities/user/user.routes";

const router = Router();

router.use(userRoutes);

export default router;