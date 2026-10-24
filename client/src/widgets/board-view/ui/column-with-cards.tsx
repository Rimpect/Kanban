import { Card, Column, useCards } from "@entities";
import { DeleteColumnButton } from "@features/delete-column";
import { CreateCardForm } from "@features/create-card";

type Props = { columnId: string; name: string; boardId: string };

export function ColumnWithCards({ columnId, name, boardId }: Props) {
  const { data: cards, isLoading } = useCards(columnId);

  const safeCards = cards ?? [];
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
      <CreateCardForm columnId={columnId} cards={safeCards} />
    </Column>
  );
}
