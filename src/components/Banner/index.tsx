import styles from "./banner.module.css";

export default async function Banner({ className }: { className?: string }) {
  return <div className={[styles.banner, className].join(" ")} />;
}