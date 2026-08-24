import type { TagColor } from "@kanban/shared";
import clsx from "clsx";
import styles from "./tag.module.scss";
export type TagTone = TagColor;
type Props = {
  tone?: TagTone;
  dot?: boolean;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLSpanElement>;

export function Tag({
  tone = "gray",
  dot = false,
  children,
  className,
  ...props
}: Props) {
  return (
    <span className={clsx(styles.tag, styles[tone], className)} {...props}>
      {dot && <span className={styles.dot} />}
      {children}
    </span>
  );
}
