import styles from "./banner.module.css";

export default function Banner() {
  
  return (
    <div className={styles.banner + " absolute top-0 right-0 left-0 h-[200px] z-0 flex flex-col"} />
  );
}
