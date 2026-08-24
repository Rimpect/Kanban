import type { CreateBoardInput, UpdateBoardInput } from "@kanban/shared";
import { prisma } from "../../lib/prisma";

export const getBoards = () => {
  return prisma.board.findMany();
};

export const getBoardById = (id: string) => {
  return prisma.board.findUnique({ where: { id } });
};

export const createBoard = (data: CreateBoardInput) => {
  return prisma.board.create({ data });
};

export const updateBoard = (id: string, data: UpdateBoardInput) => {
  return prisma.board.update({ where: { id }, data });
};

export const deleteBoard = (id: string) => {
  return prisma.board.delete({ where: { id } });
};
