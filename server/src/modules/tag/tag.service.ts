import type { CreateTagInput, UpdateTagInput } from "@kanban/shared";
import { prisma } from "../../lib/prisma";

export const getTags = () => {
  return prisma.tag.findMany({ orderBy: { name: "asc" } });
};

export const getTagById = (id: string) => {
  return prisma.tag.findUnique({ where: { id } });
};

export const createTag = (data: CreateTagInput) => {
  return prisma.tag.create({ data });
};

export const updateTag = (id: string, data: UpdateTagInput) => {
  return prisma.tag.update({ where: { id }, data });
};

export const deleteTag = (id: string) => {
  return prisma.tag.delete({ where: { id } });
};
