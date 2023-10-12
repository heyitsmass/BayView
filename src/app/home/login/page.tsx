import Link from "next/link";
import Button from "./components/Button";
import UserInput from "./components/Input";
import styles from './page.module.css';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons'

export default function Page() {

  return <div className={styles.login}>
    <div className={styles.header}>
      <h1>BayView</h1>
      <Button>Click for Guest Access</Button>
    </div>
    <form>
      <a href="/register/">Don&apos;t have an account? </a>
      <UserInput inlineIcon={{ icon: faEnvelope }} type="email" placeholder="Email Address" required />
      <UserInput inlineIcon={{ icon: faKey }} type="password" placeholder="Password" required />
      <Button type="submit">Login</Button>
    </form>
  </div>;

}
