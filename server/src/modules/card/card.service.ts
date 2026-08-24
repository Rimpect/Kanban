import type { CreateCardInput, UpdateCardInput } from "@kanban/shared";
import { prisma } from "../../lib/prisma";

export const getCards = (columnId: string) => {
  return prisma.card.findMany({
    where: { columnId },
    orderBy: { position: "asc" },
  });
};

export const getCardById = (id: string) => {
  return prisma.card.findUnique({ where: { id } });
};

export const createCard = ({ tagIds, ...data }: CreateCardInput) => {
  return prisma.card.create({
    data: {
      ...data,
      tags: tagIds ? { create: tagIds.map((tagId) => ({ tagId })) } : undefined,
    },
  });
};

export const updateCard = (
  id: string,
  { tagIds, ...data }: UpdateCardInput,
) => {
  return prisma.card.update({
    where: { id },
    data: {
      ...data,
      tags: tagIds
        ? { deleteMany: {}, create: tagIds.map((tagId) => ({ tagId })) }
        : undefined,
    },
  });
};

export const deleteCard = (id: string) => {
  return prisma.card.delete({ where: { id } });
};
