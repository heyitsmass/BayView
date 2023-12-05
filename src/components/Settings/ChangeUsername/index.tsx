import UserInput from "@/components/Input";
import styles from "./styles.module.css";
import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { PasswordInput } from "@/components/Input/Password";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import {
  PopupVariant,
  TPopupContext,
  usePopupDispatch
} from "@/context/popup";
import { changeEmail, changeUsername } from "./handler";

const useEmailValidator = (email: string) => {
  const [isValid, setIsValid] = useState(false);

  function isValidEmail(email: string) {
    let regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return regexp.test(email);
  }

  useEffect(() => {
    setIsValid(isValidEmail(email));
  }, [email]);

  return isValid;
};

enum Which {
  username = "username",
  email = "email"
}

export const UsernameChangeForm = () => {
  const [which, setWhich] = useState<Which>(Which.username);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const isValid = useEmailValidator(email);

  const setPopup = usePopupDispatch();

  const handleSubmit = async (form: FormData) => {
    const res =
      which === Which.email
        ? await changeEmail(form)
        : await changeUsername(form);

    const ok = res === "OK";

    setPopup({
      message: ok ? `${which} changed successfully!` : res,
      variant: ok ? "success" : ("error" as PopupVariant)
    });
  };

  return (
    <form
      className={styles.changeUsername}
      autoComplete="off"
      action={handleSubmit}
    >
      <h2 className="font-semibold text-2xl mb-4">
        Username Or Email{" "}
        <small className="text-sm font-normal italic">
          ( Click on the label to change modes )
        </small>
      </h2>
      <div>
        <div className="flex gap-4">
          <span
            className={styles.usernameWrapper}
            onClick={
              which === Which.email
                ? () => setWhich(Which.username)
                : undefined
            }
          >
            <UserInput
              icon={{
                icon: faUser
              }}
              className="dark:!bg-zinc-800 dark:!border-zinc-700 disabled:opacity-60"
              label="Username"
              id="username"
              name="newUsername"
              type="text"
              placeholder="New Username..."
              onClick={() => setWhich(Which.username)}
              onKeyUp={(e) => setUsername(e.currentTarget.value)}
              disabled={which === Which.email}
              required={which === Which.username || which === null}
              autoComplete="new-password"
            />
          </span>
          <span
            className={styles.emailWrapper}
            onClick={
              which === Which.username
                ? () => setWhich(Which.email)
                : undefined
            }
          >
            <UserInput
              className={[
                styles.emailInput,
                email === "" && which !== Which.email
                  ? ""
                  : isValid
                  ? "!border-green-400"
                  : `!border-rose-800`
              ].join(" ")}
              icon={{ icon: faEnvelope }}
              label="Email"
              type="email"
              id="email"
              name="newEmail"
              placeholder="New Email..."
              onClick={() => setWhich(Which.email)}
              onKeyUp={(e) => setEmail(e.currentTarget.value)}
              disabled={which === Which.username}
              required={which === Which.email || which === null}
              autoComplete="off"
            ></UserInput>
          </span>
        </div>
        <PasswordInput
          className="dark:!bg-zinc-800 dark:!border-zinc-700 disabled:hover:cursor-not-allowed disabled:opacity-60"
          name="password"
          label={`Password (for security)`}
          placeholder="Password..."
          disabled={which === Which.username}
          required={which === Which.email}
          autoComplete="off"
        />
      </div>
      <Button
        variant="secondary"
        type="submit"
        className="w-full capitalize"
        disabled={
          (which === Which.username && username === "") ||
          (which === Which.email && !isValid)
        }
      >
        {`Change ${which} `}
      </Button>
    </form>
  );
};
