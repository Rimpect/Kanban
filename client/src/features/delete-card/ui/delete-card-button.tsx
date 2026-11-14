import { useDeleteCard } from "../api/useDeleteCard";
import styles from "./delete-card-button.module.scss";

type Props = {
  cardId: string;
  columnId: string;
  onDeleted?: () => void;
};

export function DeleteCardButton({ columnId, cardId, onDeleted }: Props) {
  const { mutate } = useDeleteCard(columnId);
  return (
    <button
      type="button"
      className={styles.button}
      onClick={() => {
        if (confirm("Удалить карточку?")) {
          mutate(cardId);
          onDeleted?.();
        }
      }}
    >
      Удалить
    </button>
  );
}
