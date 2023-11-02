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
import ItineraryEvent from "@/components/Itinerary/ItineraryEvent"

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
    <div>
     <ItineraryEvent time = {"8:00"} location = {"Pixar Pier"} guestNumber = {"4"} />
    </div>
  );
}
