import { useBoards, useColumns } from "@entities";
import { ColumnWithCards } from "./column-with-cards";
import { CreateColumnForm } from "@features/create-column";
import styles from "./board-view.module.scss";
export function BoardView() {
  const { data: boards, isLoading } = useBoards();
  const board = boards?.[0];
  const { data: columns, isLoading: columnsLoading } = useColumns(board?.id);

  if (isLoading) return <p>Loading...</p>;
  if (!board) return <p>Нет досок</p>;
  if (columnsLoading) return <p>Загрузка колонок...</p>;

  const safeColumns = columns ?? [];

  return (
    <div className={styles.board}>
      {safeColumns.map((col) => (
        <ColumnWithCards
          key={col.id}
          columnId={col.id}
          name={col.name}
          boardId={board.id}
        />
      ))}
      <CreateColumnForm boardId={board.id} columns={safeColumns} />
    </div>
  );
}
