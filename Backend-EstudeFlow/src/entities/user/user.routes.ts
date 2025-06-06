import { Router } from "express";
import userController from "./user.controller";

const userRoutes = Router();

userRoutes.get("/user", userController.getAllUsers);
userRoutes.get("/user/:id", userController.getUserById);
userRoutes.post("/user", userController.createUser);
userRoutes.put("/user/:id", userController.updateUser);
userRoutes.delete("/user/:id", userController.deleteUser);

export default userRoutes;