import clsx from "clsx";
import styles from "./column.module.scss";

type Props = {
  name: string;
  children?: React.ReactNode;
  dragging?: boolean;
  headerSlot?: React.ReactNode;
} & Omit<React.ComponentProps<"div">, "onClick" | "title">;

export function Column({
  name,
  children,
  dragging = false,
  className,
  headerSlot,
  ...props
}: Props) {
  return (
    <div
      className={clsx(
        styles.column,
        { [styles.dragging]: dragging },
        className,
      )}
      {...props}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>{name}</h3>
        {headerSlot}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
