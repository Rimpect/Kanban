import { Card, Column, useCards } from "@entities";
import { DeleteColumnButton } from "@features/delete-column";

type Props = { columnId: string; name: string; boardId: string };

export function ColumnWithCards({ columnId, name, boardId }: Props) {
  const { data: cards, isLoading } = useCards(columnId);

  return (
    <Column
      name={name}
      dragging={false}
      headerSlot={<DeleteColumnButton boardId={boardId} columnId={columnId} />}
    >
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        cards?.map((card) => <Card key={card.id} title={card.title} />)
      )}
    </Column>
  );
}
