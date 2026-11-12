import type { CreateTagInput, Tag, UpdateTagInput } from "@kanban/shared";

import { prisma } from "../../lib/prisma";

export const getTags = async () => {
  const tags = await prisma.tag.findMany({ orderBy: { name: "asc" } });
  return tags as Tag[];
};

export const getTagById = async (id: string) => {
  const tag = await prisma.tag.findUnique({ where: { id } });
  return tag as Tag | null;
};

export const createTag = async (data: CreateTagInput) => {
  const tag = await prisma.tag.create({ data });
  return tag as Tag;
};

export const updateTag = async (id: string, data: UpdateTagInput) => {
  const tag = await prisma.tag.update({ where: { id }, data });
  return tag as Tag;
};

export const deleteTag = (id: string) => {
  return prisma.tag.delete({ where: { id } });
};
