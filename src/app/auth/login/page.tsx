"use client";
import { loginUser, registerUser } from "@/app/services/auth/local";
import Button from "@/components/Button";
import UserInput from "@/components/Input";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faIdBadge,
  faLock,
  faPeopleGroup,
  faPerson,
  faPhone,
  faUnlock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import handleLogin from "../../services/auth/google";
import styles from "./page.module.css";

const PasswordInput = () => {
  const [hidden, setHidden] = useState(false);

  return (
    <UserInput
      placeholder='Password...'
      name='password'
      type={hidden ? "password" : "text"}
      icon={{
        icon: hidden ? faLock : faUnlock,
        onClick: () => setHidden(!hidden)
      }}
      required
    />
  );
};

export default function Page() {
  const login = useGoogleLogin({
    onSuccess: async ({ code }) => {
      const tokens = await handleLogin(code);
    },
    flow: "auth-code"
  });

  /**
   * mode = 0 = false = "login"
   * mode = 1 = true = "register"
   */
  const [mode, setMode] = useState(false);

  /**
   * handleLogin = () => {}
   * handleRegister = () => {}
   */
  return (
    <div className={styles.login}>
      <div className={styles.header}>
        <h1>BayView</h1>
        <Button>Click for Guest Access</Button>
      </div>
      <form action={mode ? registerUser : loginUser}>
        <a
          onClick={(e) => {
            e.preventDefault();
            setMode(!mode);
          }}
        >
          Dont have an account?
        </a>
        {mode && (
          <>
            <UserInput
              name='username'
              icon={{ icon: faIdBadge }}
              placeholder='Username...'
              required
            />
            <UserInput
              name='first-name'
              icon={{ icon: faPerson }}
              placeholder='First Name...'
              required
            />
            <UserInput
              name='last-name'
              icon={{
                icon: faPeopleGroup
              }}
              placeholder='Last Name...'
            />
            <UserInput
              name='phone'
              icon={{
                icon: faPhone
              }}
              placeholder='Phone Number...'
            />
          </>
        )}
        <UserInput
          icon={{ icon: faEnvelope }}
          placeholder='Email/Username...'
          name='emailOrUsername'
        ></UserInput>
        <PasswordInput />
        <div className={styles.buttons}>
          <Button type='submit'>{mode ? "Register" : "Login"}</Button>
          <Button onClick={(e) => login()}>
            <FontAwesomeIcon icon={faGoogle} />
          </Button>
        </div>
      </form>
    </div>
  );
}
