import { useDeleteColumn } from "../api/useDeleteColumn";

type Props = {
  boardId: string;
  columnId: string;
};

export function DeleteColumnButton({ boardId, columnId }: Props) {
  const { mutate } = useDeleteColumn(boardId);
  return (
    <button
      type="button"
      onClick={() => {
        if (confirm("Удалить колонку?")) {
          mutate(columnId);
        }
      }}
    >
      Удалить
    </button>
  );
}
