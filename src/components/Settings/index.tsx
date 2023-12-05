import { useHomepage } from "@/hooks";
import { PropsWithChildren } from "react";
import { PrebuiltDialog } from "../Dialog/Prebuilt";
import { PasswordChangeForm } from "./ChangePassword";
import { UsernameChangeForm } from "./ChangeUsername";
import { PartyManager } from "./PartyManager";

type SettingsDialogProps = PropsWithChildren<{
  isOpen: boolean;
  close: () => void;
}>;

export function SettingsDialog({ ...props }: SettingsDialogProps) {
  return (
    <PrebuiltDialog
      title="Settings"
      description="Manage your account settings here!"
      open={props.isOpen}
      onClose={props.close}
    >
      <Settings />
    </PrebuiltDialog>
  );
}

const Settings = () => {
  const ctx = useHomepage();

  return (
    <div className="grid grid-cols-2 relative gap-4">
      <section className="!max-h-1/2">
        <PartyManager />
      </section>
      <section>
        <PasswordChangeForm />
      </section>
      <section>
        <UsernameChangeForm />
      </section>
      <section>
        <DeleteAccountButton />
      </section>
    </div>
  );
};

const DeleteAccountButton = () => {
  return <></>;
};
