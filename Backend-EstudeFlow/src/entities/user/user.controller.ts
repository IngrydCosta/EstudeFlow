import { Request, Response, NextFunction } from "express";
import userService from "./user.service";
import { User } from "@prisma/client";
import { UserType } from "./user.zod";
import { IdObject } from "../../utils/zodUtils";
import ObjectNotFoundError from "../../utils/errors/ObjectNotFoundError";

const getAllUsers = async (
  req: Request,
  res: Response<UserType[]>,
  next: NextFunction
) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (
  req: Request<IdObject, User, UserType>,
  res: Response<UserType | { message: string } | null>,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      throw new ObjectNotFoundError("User", req.params.id);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (
  req: Request<{}, User, UserType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (
  req: Request<IdObject, User, UserType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      throw new ObjectNotFoundError("user", req.params.id);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (
  req: Request<IdObject>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      throw new ObjectNotFoundError("user", req.params.id);
    }
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const UserController = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default UserController;