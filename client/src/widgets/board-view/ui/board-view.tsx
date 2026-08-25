import { useBoards, useColumns } from "@entities";

export function BoardView() {
  const { data: boards, isLoading } = useBoards();
  const board = boards?.[0];
  const { data: columns, isLoading: columnsLoading } = useColumns(board?.id);

  if (isLoading) return <p>Loading...</p>;
  if (!board) return <p>Нет досок</p>;
  if (columnsLoading) return <p>Загрузка колонок...</p>;

  return (
    <div>
      {board.name}: {columns?.length ?? 0} колонок
    </div>
  );
}
