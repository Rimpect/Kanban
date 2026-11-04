import { useBoards, useColumns } from "@entities";
import { ColumnWithCards } from "./column-with-cards";
import { CreateColumnForm } from "@features/create-column";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./board-view.module.scss";
import { useReorderCard } from "@features/reorder-card";
import { getReorderUpdate } from "../lib/get-reorder-update";
import { getMoveToColumnUpdate } from "../lib/get-move-to-column-update";
import { getAppendToColumnUpdate } from "../lib/get-append-to-column-update";
import { useState } from "react";
import { Card } from "@entities";
export function BoardView() {
  const { data: boards, isLoading } = useBoards();

  const board = boards?.[0];

  const { data: columns, isLoading: columnsLoading } = useColumns(board?.id);

  const { mutate: reorderCard } = useReorderCard();

  const [activeCard, setActiveCard] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const queryClient = useQueryClient();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  if (isLoading) return <p>Loading...</p>;
  if (!board) return <p>Нет досок</p>;
  if (columnsLoading) return <p>Загрузка колонок...</p>;

  const safeColumns = columns ?? [];

  return (
    <div className={styles.board}>
      <DndContext
        sensors={sensors}
        onDragStart={({ active }) => {
          const columnId = active.data.current?.columnId;

          const cachedCards = queryClient.getQueryData<
            { id: string; title: string }[]
          >(["cards", columnId]);

          if (!cachedCards) return;

          const findThisCard = cachedCards.find(
            (card) => card.id === active.id,
          );

          if (!findThisCard) setActiveCard(null);
          else setActiveCard(findThisCard);
        }}
        onDragEnd={({ active, over }) => {
          setActiveCard(null);

          if (!over || active.id === over.id) {
            return;
          }

          const columnId = active.data.current?.columnId;

          const cachedCards = queryClient.getQueryData<
            { id: string; position: number }[]
          >(["cards", columnId]);

          if (!cachedCards) return;

          const overColumnId = over.data.current?.columnId;
          const overIsColumnItself = over.id === overColumnId;

          if (overIsColumnItself) {
            const cachedCardsOverColumn = queryClient.getQueryData<
              { id: string; position: number }[]
            >(["cards", overColumnId]);

            if (!cachedCardsOverColumn) return;

            const positionUpdate = getAppendToColumnUpdate({
              cachedCardsOverColumn,
              activeId: String(active.id),
              overColumnId,
            });

            reorderCard(positionUpdate, {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ["cards", columnId],
                });
              },
            });
          } else if (columnId !== overColumnId) {
            const cachedCardsOverColumn = queryClient.getQueryData<
              { id: string; position: number }[]
            >(["cards", overColumnId]);

            if (!cachedCardsOverColumn) return;

            const positionUpdate = getMoveToColumnUpdate({
              cachedCardsOverColumn,
              activeId: String(active.id),
              overId: String(over.id),
              overColumnId,
            });

            if (!positionUpdate) return;

            reorderCard(positionUpdate, {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ["cards", columnId],
                });
              },
            });
          } else {
            const positionUpdate = getReorderUpdate({
              cachedCards,
              activeId: String(active.id),
              overId: String(over.id),
            });

            if (!positionUpdate) return;

            reorderCard(positionUpdate);
          }
        }}
        onDragCancel={() => {
          setActiveCard(null);
        }}
      >
        <DragOverlay>
          {activeCard ? <Card title={activeCard.title} dragging /> : null}
        </DragOverlay>

        {safeColumns.map((col) => (
          <ColumnWithCards
            key={col.id}
            columnId={col.id}
            name={col.name}
            boardId={board.id}
          />
        ))}

        <CreateColumnForm boardId={board.id} columns={safeColumns} />
      </DndContext>
    </div>
  );
}
