import { arrayMove } from "@dnd-kit/sortable";

export const getReorderUpdate = ({
  cachedCards,
  activeId,
  overId,
}: {
  cachedCards: { id: string; position: number }[] | undefined;
  activeId: string;
  overId: string;
}) => {
  const activeIndex = cachedCards?.findIndex((card) => card.id === activeId);

  const overIndex = cachedCards?.findIndex((card) => card.id === overId);

  if (!cachedCards) return;
  if (activeIndex === undefined || activeIndex === -1) return;
  if (overIndex === undefined || overIndex === -1) return;

  const reordered = arrayMove(cachedCards, activeIndex, overIndex);
  const before = reordered[overIndex - 1];
  const after = reordered[overIndex + 1];

  let newPosition: number;

  if (!before) {
    newPosition = after.position - 1;
  } else if (!after) {
    newPosition = before.position + 1;
  } else {
    newPosition = (before.position + after.position) / 2;
  }

  return { id: cachedCards[activeIndex].id, position: newPosition };
};
