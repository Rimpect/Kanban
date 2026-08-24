import type { CreateColumnInput, UpdateColumnInput } from "@kanban/shared";
import { prisma } from "../../lib/prisma";

export const getColumns = (boardId: string) => {
  return prisma.column.findMany({
    where: { boardId },
    orderBy: { position: "asc" },
  });
};

export const getColumnById = (id: string) => {
  return prisma.column.findUnique({ where: { id } });
};

export const createColumn = (data: CreateColumnInput) => {
  return prisma.column.create({ data });
};

export const updateColumn = (id: string, data: UpdateColumnInput) => {
  return prisma.column.update({ where: { id }, data });
};

export const deleteColumn = (id: string) => {
  return prisma.column.delete({ where: { id } });
};
