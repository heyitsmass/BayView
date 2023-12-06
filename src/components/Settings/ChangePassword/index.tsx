'use client';
import Button from "@/components/Button";
import { PasswordInput } from "@/components/Input/Password";
import { usePopupDispatch } from "@/context/popup";
import { SyntheticEvent, useState } from "react";
import { changePassword, logoutOnAllDevices } from "./handler";
import styles from "./styles.module.css";

export const PasswordChangeForm = () => {
  const setPopup = usePopupDispatch();

  const [wasChanged, setWasChanged] = useState(false);

  const handleSubmit = async (form: FormData) => {
    const res = await changePassword(form);

    if (res != "OK") {
      setPopup({
        message: res,
        variant: "error"
      });
    } else {
      setPopup({
        message: "Password changed successfully!",
        variant: "success"
      });
      setWasChanged(true);
    }
  };

  const handleSessionRevoke = async (e: SyntheticEvent) => {
    e.preventDefault();
    await logoutOnAllDevices();
    window.location.href = "/auth"; //incase the redirect fails
  };

  return (
    <form
      className={styles.changePassword}
      action={handleSubmit}
      autoComplete="off"
      autoFocus={false}
    >
      <h2 className="font-semibold text-2xl mb-4">Password</h2>
      {wasChanged && (
        <div>
          <p className="w-full text-center pt-2 italic flex flex-col">
            Logout on all devices?
            <small>{"(this will log you out)"}</small>
          </p>

          <div className="flex">
            <Button
              onClick={handleSessionRevoke}
              className="!bg-green-700 hover:!bg-green-600 w-1/2 m-2"
            >
              Yes
            </Button>
            <Button
              onClick={() => setWasChanged(false)}
              variant="secondary"
              className="w-1/2 m-2"
            >
              No
            </Button>
          </div>
        </div>
      )}
      {!wasChanged && (
        <>
          <PasswordInput
            className="dark:!bg-zinc-800 dark:!border-zinc-700"
            autoComplete="off"
            label="Old Password"
            name="oldPassword"
            placeholder="Old Password..."
            required
          />
          <PasswordInput
            className="dark:!bg-zinc-800 dark:!border-zinc-700"
            autoComplete="new-password"
            autoFocus={false}
            label="New Password"
            name="newPassword"
            placeholder="New Password..."
            required
          />

          <Button variant="secondary" type="submit" className="w-full">
            Change Password
          </Button>
        </>
      )}
    </form>
  );
};
