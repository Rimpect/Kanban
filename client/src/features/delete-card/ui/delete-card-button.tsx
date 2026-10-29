import { useDeleteCard } from "../api/useDeleteCard";

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
