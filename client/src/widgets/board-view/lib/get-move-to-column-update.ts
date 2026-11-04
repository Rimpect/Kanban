export const getMoveToColumnUpdate = ({
  cachedCardsOverColumn,
  activeId,
  overId,
  overColumnId,
}: {
  cachedCardsOverColumn: { id: string; position: number }[];
  activeId: string;
  overId: string;
  overColumnId: string;
}) => {
  const overIndex = cachedCardsOverColumn.findIndex(
    (card) => card.id === overId,
  );

  if (overIndex === -1) return;

  const before = cachedCardsOverColumn[overIndex - 1];

  const after = cachedCardsOverColumn[overIndex];

  let newPosition: number;

  if (!before) {
    newPosition = after.position - 1;
  } else {
    newPosition = (before.position + after.position) / 2;
  }

  return { id: activeId, position: newPosition, columnId: overColumnId };
};
