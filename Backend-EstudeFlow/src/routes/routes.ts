import { Router } from "express";
// Update the path below if your user.routes file is located elsewhere
import userRoutes from "../routes/routes";

const router = Router();

router.use(userRoutes);

export default router;