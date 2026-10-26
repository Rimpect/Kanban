import { useDeleteCard } from "../api/useDeleteCard";

type Props = {
  cardId: string;
  columnId: string;
};

export function DeleteCardButton({ columnId, cardId }: Props) {
  const { mutate } = useDeleteCard(columnId);
  return (
    <button
      type="button"
      onClick={() => {
        if (confirm("Удалить карточку?")) {
          mutate(cardId);
        }
      }}
    >
      Удалить
    </button>
  );
}
