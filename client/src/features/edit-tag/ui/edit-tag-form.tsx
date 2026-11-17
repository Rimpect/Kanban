import { useState } from "react";
import { useUpdateTag } from "../api/useUpdateTag";
import type { TagColor, Tag as TagModel } from "@kanban/shared";
import { toast } from "sonner";
import styles from "./edit-tag-form.module.scss";
type Props = {
  tag: TagModel;
};

export function EditTagForm({ tag }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(tag.name);
  const [color, setColor] = useState<TagColor | null>(tag.color);
  const { mutate } = useUpdateTag(tag.id);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim().length < 3) {
      toast.error("Должно быть больше 2х символов!");
      return;
    }

    mutate({ name: name.trim(), color }, { onSuccess: () => setIsOpen(false) });
  };

  if (!isOpen) {
    return (
      <button
        aria-label={`Изменить тег ${tag.name}`}
        type="button"
        onClick={() => setIsOpen(true)}
        className={styles.trigger}
      >
        ✎
      </button>
    );
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        autoFocus
        aria-label="Название тега"
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        className={styles.select}
        aria-label="цвет тега"
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

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          Подтвердить
        </button>
        <button
          type="button"
          className={styles.cancel}
          onClick={() => {
            setIsOpen(false);
            setName(tag.name);
            setColor(tag.color);
          }}
        >
          Отмена
        </button>
      </div>
    </form>
  );
}
