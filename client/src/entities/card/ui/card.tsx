import type { Tag as TagModel } from "@kanban/shared";
import { Tag } from "@shared/ui";
import clsx from "clsx";
import styles from "./card.module.scss";

type Props = {
  title: string;
  tags?: TagModel[];
  dragging?: boolean;
  selected?: boolean;

  onOpen?: () => void;
} & Omit<React.ComponentProps<"div">, "onClick" | "title">;

export function Card({
  title,
  tags = [],
  dragging = false,
  selected = false,
  onOpen,
  children,
  className,
  ref,
  ...props
}: Props) {
  return (
    <div
      ref={ref}
      className={clsx(
        styles.card,
        {
          [styles.dragging]: dragging,
          [styles.selected]: selected,
        },
        className,
      )}
      {...props}
    >
      {tags.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag) => (
            <Tag key={tag.id} tone={tag.color ?? undefined}>
              {tag.name}
            </Tag>
          ))}
        </div>
      )}

      <button type="button" className={styles.title} onClick={onOpen}>
        {title}
      </button>

      {children}
    </div>
  );
}
