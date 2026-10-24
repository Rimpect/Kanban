import { useState } from "react";
import type { Column } from "@kanban/shared";
import { useCreateColumn } from "../api/useCreateColumn";

type Props = {
  columns: Column[];
  boardId: string;
};

export function CreateColumnForm({ columns, boardId }: Props) {
  const [name, setName] = useState("");

  const { mutate } = useCreateColumn(boardId);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim().length < 3) {
      alert("Должно быть больше 2х символов!");
      return;
    }

    const nextPosition =
      columns.length > 0 ? columns[columns.length - 1].position + 1 : 1;

    mutate({ name: name.trim(), position: nextPosition });
    setName("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        aria-label="Название колонки"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Подтвердить</button>
    </form>
  );
}
