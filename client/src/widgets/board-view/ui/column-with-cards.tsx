import { Column, useCards } from "@entities";
import { DeleteColumnButton } from "@features/delete-column";
import { CreateCardForm } from "@features/create-card";
import { CardDetailsModal } from "@features/edit-card";
import { useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { SortableCard } from "./sortable-card";
type Props = { columnId: string; name: string; boardId: string };

export function ColumnWithCards({ columnId, name, boardId }: Props) {
  const { data: cards, isLoading } = useCards(columnId);
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const safeCards = cards ?? [];

  const openCard = cards?.find((c) => c.id === openCardId);
  const items = safeCards.map((card) => card.id);
  return (
    <>
      <Column
        name={name}
        dragging={false}
        headerSlot={
          <DeleteColumnButton boardId={boardId} columnId={columnId} />
        }
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : (
            safeCards.map((card) => (
              <SortableCard
                key={card.id}
                card={card}
                columnId={columnId}
                onOpen={() => setOpenCardId(card.id)}
              />
            ))
          )}
        </SortableContext>

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
