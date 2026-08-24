import styles from "./visually-hidden.module.scss";

export function VisuallyHidden({
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={styles.visuallyHidden} {...props}>
      {children}
    </span>
  );
}
