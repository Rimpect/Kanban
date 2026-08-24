import clsx from "clsx";
import styles from "./column.module.scss";

type Props = {
  name: string;
  children?: React.ReactNode;
  dragging?: boolean;
} & Omit<React.ComponentProps<"div">, "onClick" | "title">;

export function Column({
  name,
  children,
  dragging = false,
  className,
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
      <h3 className={styles.title}>{name}</h3>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
