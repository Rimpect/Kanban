import { Column, useCards } from "@entities";
import { DeleteColumnButton } from "@features/delete-column";
import { CreateCardForm } from "@features/create-card";
import { CardDetailsModal } from "@features/edit-card";
import { Fragment, useState } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import { SortableCard } from "./sortable-card";
import { CreateTagForm } from "@features/create-tag";
import { DeleteTagButton } from "@features/delete-tag";
import styles from "./column-with-cards.module.scss";
type Props = {
  columnId: string;
  name: string;
  boardId: string;
  indicator: { columnId: string; beforeCardId: string | null } | null;
};

export function ColumnWithCards({ columnId, name, boardId, indicator }: Props) {
  const { data: cards, isLoading } = useCards(columnId);
  const [openCardId, setOpenCardId] = useState<string | null>(null);
  const safeCards = cards ?? [];

  const openCard = cards?.find((c) => c.id === openCardId);
  const items = safeCards.map((card) => card.id);
  const isColumn = indicator?.columnId === columnId;

  const { setNodeRef } = useDroppable({ id: columnId, data: { columnId } });
  return (
    <>
      <Column
        name={name}
        dragging={false}
        headerSlot={
          <DeleteColumnButton boardId={boardId} columnId={columnId} />
        }
        ref={setNodeRef}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : (
            safeCards.map((card) => (
              <Fragment key={card.id}>
                {isColumn && indicator.beforeCardId === card.id && (
                  <div className={styles.dropIndicator} />
                )}
                <SortableCard
                  card={card}
                  columnId={columnId}
                  onOpen={() => setOpenCardId(card.id)}
                />
              </Fragment>
            ))
          )}
          {isColumn && indicator?.beforeCardId === null && (
            <div className={styles.dropIndicator} />
          )}
        </SortableContext>

        <CreateCardForm columnId={columnId} cards={safeCards} />
      </Column>
      {openCard && (
        <CardDetailsModal
          columnId={columnId}
          card={openCard}
          onClose={() => setOpenCardId(null)}
          tagFormSlot={<CreateTagForm />}
          renderTagActions={(tag) => (
            <DeleteTagButton tagId={tag.id} tagName={tag.name} />
          )}
        />
      )}
    </>
  );
}
