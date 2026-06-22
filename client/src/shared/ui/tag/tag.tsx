import clsx from "clsx";
import styles from "./tag.module.scss";

type Props = {
  tone?: "blue" | "green" | "amber" | "red" | "gray";
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
