import { useState } from "react";
import { useCreateTag } from "../api/useCreateTag";
import type { TagColor } from "@kanban/shared";
import styles from "./create-tag.module.scss";

export function CreateTagForm() {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState<TagColor | null>(null);
  const { mutate } = useCreateTag();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim().length < 3) {
      alert("Должно быть больше 2х символов!");
      return;
    }

    mutate({ name: title.trim(), color });
    setColor(null);
    setTitle("");
  };
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        aria-label="Название тега"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />
      <select
        className={styles.select}
        aria-label="выбор цвета тега"
        value={color ?? ""}
        onChange={(e) => {
          const value = e.target.value;
          setColor(value === "" ? null : (value as TagColor));
        }}
      >
        <option value="">Без цвета</option>
        <option value="blue">Синий</option>
        <option value="green">Зеленый</option>
        <option value="amber">Янтарный</option>
        <option value="red">Красный</option>
        <option value="gray">Серый</option>
      </select>
      <button className={styles.submit} type="submit">
        Подтвердить
      </button>
    </form>
  );
}
