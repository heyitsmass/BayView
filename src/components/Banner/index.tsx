import styles from "./banner.module.css";

export default function Banner({ className }: { className?: string }) {
  return <div className={[styles.banner, className].join(" ")} />;
}