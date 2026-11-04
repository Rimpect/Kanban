export const getAppendToColumnUpdate = ({
  cachedCardsOverColumn,
  activeId,
  overColumnId,
}: {
  cachedCardsOverColumn: { id: string; position: number }[];
  activeId: string;
  overColumnId: string;
}) => {
  let newPosition: number;

  if (cachedCardsOverColumn.length > 0) {
    const lastCard = cachedCardsOverColumn[cachedCardsOverColumn.length - 1];
    newPosition = lastCard.position + 1;
  } else {
    newPosition = 1;
  }

  return { id: activeId, position: newPosition, columnId: overColumnId };
};
