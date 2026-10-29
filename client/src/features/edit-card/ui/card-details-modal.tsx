import { useEffect, useRef, useState } from "react";
import { useUpdateCard } from "../api/useUpdateCard";
import { DeleteCardButton } from "@features/delete-card";
import styles from "./card-details-modal.module.scss";

type Props = {
  columnId: string;
  card: { id: string; title: string; text: string };
  onClose: () => void;
};

export function CardDetailsModal({ columnId, card, onClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [text, setText] = useState(card.text);
  const { mutate: updateCard } = useUpdateCard(columnId, card.id);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleSave = () => {
    updateCard({ text });
    dialogRef.current?.close();
  };

  return (
    <dialog ref={dialogRef} onClose={onClose} className={styles.dialog}>
      <h3>{card.title}</h3>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <footer>
        <DeleteCardButton
          columnId={columnId}
          cardId={card.id}
          onDeleted={() => dialogRef.current?.close()}
        />
        <button type="button" onClick={() => dialogRef.current?.close()}>
          Отмена
        </button>
        <button type="button" onClick={handleSave}>
          Сохранить
        </button>
      </footer>
    </dialog>
  );
}
