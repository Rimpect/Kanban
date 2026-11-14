import { useState } from "react";
import type { Column } from "@kanban/shared";
import { useCreateColumn } from "../api/useCreateColumn";
import styles from "./create-column.module.scss";

type Props = {
  columns: Column[];
  boardId: string;
};

export function CreateColumnForm({ columns, boardId }: Props) {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { mutate } = useCreateColumn(boardId);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim().length < 3) {
      alert("Должно быть больше 2х символов!");
      return;
    }

    const nextPosition =
      columns.length > 0 ? columns[columns.length - 1].position + 1 : 1;

    mutate(
      { name: name.trim(), position: nextPosition },
      {
        onSuccess: () => {
          setName("");
          setIsOpen(false);
        },
      },
    );
  };
  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={styles.trigger}
      >
        + Добавить колонку
      </button>
    );
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        autoFocus
        aria-label="Название колонки"
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
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
            setName("");
          }}
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
