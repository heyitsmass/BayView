"use client";
import { useGoogleLogin } from "@react-oauth/google";
import Button from "../../../components/Button";
import handleLogin from "../../services/auth/google";
import styles from "./page.module.css";
import UserInput from "../../../components/Input";
import {
  faEnvelope,
  faIdBadge,
  faLock,
  faPeopleGroup,
  faPerson,
  faPhone,
  faUnlock,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { loginUser, registerUser } from "@/app/services/auth/local";


export default function Page() {
  return (
    <div className={styles.login}>
      <div className={styles.header}>
        <h1>BayView</h1>
        <Button>Click for Guest Access</Button>
      </div>
    </div>
  );
}
