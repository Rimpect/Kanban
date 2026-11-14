import { useEffect, useRef, useState } from "react";
import { useUpdateCard } from "../api/useUpdateCard";
import { useTags } from "@entities";
import { DeleteCardButton } from "@features/delete-card";
import { Tag } from "@shared/ui";
import type { Tag as TagModel } from "@kanban/shared";

import clsx from "clsx";
import styles from "./card-details-modal.module.scss";

type Props = {
  columnId: string;
  card: { id: string; title: string; text: string; tags: TagModel[] };
  onClose: () => void;
  tagFormSlot?: React.ReactNode;
};

export function CardDetailsModal({
  columnId,
  card,
  onClose,
  tagFormSlot,
}: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [text, setText] = useState(card.text);
  const { mutate: updateCard } = useUpdateCard(columnId, card.id);
  const { data: tags } = useTags();

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleSave = () => {
    updateCard({ text });
    dialogRef.current?.close();
  };

  const toggleTag = (tagId: string) => {
    const currentIds = card.tags.map((tag) => tag.id);
    let newIds;
    if (currentIds.find((id) => id === tagId)) {
      newIds = currentIds.filter((id) => id !== tagId);
    } else {
      newIds = [...currentIds, tagId];
    }
    updateCard({ tagIds: newIds });
  };
  const safeTags = tags ?? [];

  return (
    <dialog ref={dialogRef} onClose={onClose} className={styles.dialog}>
      <h3 className={styles.title}>{card.title}</h3>
      <textarea
        className={styles.textarea}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.tagList}>
        {safeTags.map((tag) => {
          const isAssigned = card.tags.find((t) => t.id === tag.id);
          return (
            <button
              key={tag.id}
              type="button"
              onClick={() => toggleTag(tag.id)}
              className={clsx(styles.tagButton, {
                [styles.unassigned]: !isAssigned,
              })}
            >
              <Tag tone={tag.color ?? undefined}>{tag.name}</Tag>
            </button>
          );
        })}
      </div>
      {tagFormSlot}
      <footer className={styles.footer}>
        <DeleteCardButton
          columnId={columnId}
          cardId={card.id}
          onDeleted={() => dialogRef.current?.close()}
        />
        <button
          type="button"
          className={styles.cancel}
          onClick={() => dialogRef.current?.close()}
        >
          Отмена
        </button>
        <button type="button" className={styles.save} onClick={handleSave}>
          Сохранить
        </button>
      </footer>
    </dialog>
  );
}
