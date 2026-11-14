import { useDeleteTag } from "../api/useDeleteTag";
import styles from "./delete-tag-button.module.scss";

type Props = {
  tagId: string;
  tagName: string;
};

export function DeleteTagButton({ tagId, tagName }: Props) {
  const { mutate } = useDeleteTag();
  return (
    <button
      type="button"
      aria-label={`Удалить тег ${tagName}`}
      className={styles.button}
      onClick={() => {
        if (confirm("Удалить тег?")) {
          mutate(tagId);
        }
      }}
    >
      ×
    </button>
  );
}
