import { useBoards, useColumns } from "@entities";
import { ColumnWithCards } from "./column-with-cards";
import { CreateColumnForm } from "@features/create-column";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./board-view.module.scss";
import { arrayMove } from "@dnd-kit/sortable";
import { useReorderCard } from "@features/reorder-card";
import { getReorderUpdate } from "../lib/get-reorder-update";

export function BoardView() {
  const { data: boards, isLoading } = useBoards();

  const board = boards?.[0];

  const { data: columns, isLoading: columnsLoading } = useColumns(board?.id);

  const { mutate: reorderCard } = useReorderCard();

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
        onDragEnd={({ active, over }) => {
          if (!over || active.id === over.id) {
            return;
          }

          const columnId = active.data.current?.columnId;

          const cachedCards = queryClient.getQueryData<
            { id: string; position: number }[]
          >(["cards", columnId]);

          if (!cachedCards) return;

          const positionUpdate = getReorderUpdate({
            cachedCards,
            activeId: String(active.id),
            overId: String(over.id),
          });

          if (!positionUpdate) return;

          reorderCard(positionUpdate);
        }}
      >
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
