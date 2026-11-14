import { useState } from "react";
import { useCreateCard } from "../api/useCreateCard";
import styles from "./create-card.module.scss";
type Props = {
  cards: { position: number }[];
  columnId: string;
};

export function CreateCardForm({ cards, columnId }: Props) {
  const [title, setTitle] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={styles.trigger}
      >
        + Добавить карточку
      </button>
    );
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        autoFocus
        aria-label="Название карточки"
        className={styles.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          Подтвердить
        </button>
        <button
          type="button"
          className={styles.cancel}
          onClick={() => {
            setIsOpen(false);
            setTitle("");
          }}
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
