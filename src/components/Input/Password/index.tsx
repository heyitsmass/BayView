import { useState } from "react";
import UserInput, { UserInputProps } from "..";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";

export const PasswordInput = ({
  ...props
}: UserInputProps & {
  ref: React.Ref<HTMLInputElement>;
}) => {
  const [hidden, setHidden] = useState(true);

  return (
    <UserInput
      {...props}
      type={hidden ? "password" : "text"}
      icon={{
        icon: hidden ? faLock : faUnlock,
        onClick: () => setHidden(!hidden)
      }}
      required
    />
  );
};
