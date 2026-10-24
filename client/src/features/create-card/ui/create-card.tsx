import { useState } from "react";
import { useCreateCard } from "../api/useCreateCard";
type Props = {
  cards: { position: number }[];
  columnId: string;
};

export function CreateCardForm({ cards, columnId }: Props) {
  const [title, setTitle] = useState("");

  const { mutate } = useCreateCard(columnId);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim().length < 3) {
      alert("Должно быть больше 2х символов!");
      return;
    }

    const nextPosition =
      cards.length > 0 ? cards[cards.length - 1].position + 1 : 1;

    const text = "";

    mutate({ title: title.trim(), text, position: nextPosition });
    setTitle("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        aria-label="Название карточки"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Подтвердить</button>
    </form>
  );
}
