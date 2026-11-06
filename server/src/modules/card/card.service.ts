import type { CreateCardInput, UpdateCardInput } from "@kanban/shared";
import { prisma } from "../../lib/prisma";

export const getCards = async (columnId: string) => {
  const cards = await prisma.card.findMany({
    where: { columnId },
    orderBy: { position: "asc" },
    include: { tags: { include: { tag: true } } },
  });
  return cards.map((card) => ({
    ...card,
    tags: card.tags.map((cardTag) => cardTag.tag),
  }));
};

export const getCardById = async (id: string) => {
  const card = await prisma.card.findUnique({
    where: { id },
    include: { tags: { include: { tag: true } } },
  });
  if (card) return { ...card, tags: card.tags.map((cardTag) => cardTag.tag) };
};

export const createCard = async ({ tagIds, ...data }: CreateCardInput) => {
  const card = await prisma.card.create({
    data: {
      ...data,
      tags: tagIds ? { create: tagIds.map((tagId) => ({ tagId })) } : undefined,
    },
    include: { tags: { include: { tag: true } } },
  });
  return { ...card, tags: card.tags.map((cardTag) => cardTag.tag) };
};

export const updateCard = async (
  id: string,
  { tagIds, ...data }: UpdateCardInput,
) => {
  const card = await prisma.card.update({
    where: { id },
    data: {
      ...data,
      tags: tagIds
        ? { deleteMany: {}, create: tagIds.map((tagId) => ({ tagId })) }
        : undefined,
    },
    include: { tags: { include: { tag: true } } },
  });
  return { ...card, tags: card.tags.map((cardTag) => cardTag.tag) };
};

export const deleteCard = (id: string) => {
  return prisma.card.delete({ where: { id } });
};
