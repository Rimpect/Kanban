import { useDeleteColumn } from "../api/useDeleteColumn";
import styles from "./delete-column-button.module.scss";

type Props = {
  boardId: string;
  columnId: string;
};

export function DeleteColumnButton({ boardId, columnId }: Props) {
  const { mutate } = useDeleteColumn(boardId);
  return (
    <button
      type="button"
      className={styles.button}
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
