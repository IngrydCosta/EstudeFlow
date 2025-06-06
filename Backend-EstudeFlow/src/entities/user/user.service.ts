import { User } from "@prisma/client";
import prismaClient from "../../utils/prismaUtils";
import { UserType } from "./user.zod";

const { user } = prismaClient;

const getAllUsers = async (): Promise<User[]> => {
  const users = await user.findMany();
  return users;
};

const getUserById = async (id: string): Promise<User | null> => {

  const userById = await user.findUnique({
    where: { id },
  });
  return userById;
};

const createUser = async (data: UserType): Promise<User> => {
  const createdUser = await user.create({
    data,
  });
  return createdUser;
};

const updateUser = async (id: string, data: UserType): Promise<User | null> => {
  const updatedUser = await user.update({
    where: { id },
    data,
  });
  return updatedUser;
};

const deleteUser = async (id: string): Promise<User | null> => {
  const deletedUser = await user.delete({
    where: { id },
  });
  return deletedUser;
};

const userService = {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
};

export default userService;