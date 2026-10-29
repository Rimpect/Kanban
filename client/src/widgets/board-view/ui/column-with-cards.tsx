import { Card, Column, useCards } from "@entities";
import { DeleteColumnButton } from "@features/delete-column";
import { CreateCardForm } from "@features/create-card";
import { CardDetailsModal } from "@features/edit-card";
import { useState } from "react";

type Props = { columnId: string; name: string; boardId: string };

export function ColumnWithCards({ columnId, name, boardId }: Props) {
  const { data: cards, isLoading } = useCards(columnId);
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const safeCards = cards ?? [];

  const openCard = cards?.find((c) => c.id === openCardId);

  return (
    <>
      <Column
        name={name}
        dragging={false}
        headerSlot={
          <DeleteColumnButton boardId={boardId} columnId={columnId} />
        }
      >
        {isLoading ? (
          <p>Загрузка...</p>
        ) : (
          cards?.map((card) => (
            <Card
              key={card.id}
              title={card.title}
              onOpen={() => setOpenCardId(card.id)}
            ></Card>
          ))
        )}
        <CreateCardForm columnId={columnId} cards={safeCards} />
      </Column>
      {openCard && (
        <CardDetailsModal
          columnId={columnId}
          card={openCard}
          onClose={() => setOpenCardId(null)}
        />
      )}
    </>
  );
}
