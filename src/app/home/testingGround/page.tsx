import styles from "./page.module.css";
import Button from "../../Components/CounterButton"


export default function Page() {

  return <div className={styles.Page}>
    <Button className={styles.red}></Button>
    <Button className={styles.green}></Button>
    <Button className={styles.blue}></Button>
    <Button className={styles.yellow}></Button>
  </div>;
}