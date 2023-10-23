import Link from "next/link";
import UserInput from "@/components/Input";
import styles from './page.module.css';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons'



export default async function Page(){ 

    return <div className={styles.login}>
        
        <div className="admin-login">

        <h1>BayView </h1>
        <h1>Admin Login</h1>
        <form>
            <UserInput icon={{ icon: faUser }} type="text" placeholder="Username" required />
            <UserInput icon={{ icon: faKey }} type="password" placeholder="Password" required />
            <button type="submit">Login</button>
        </form>

        </div>
    </div>;
}
