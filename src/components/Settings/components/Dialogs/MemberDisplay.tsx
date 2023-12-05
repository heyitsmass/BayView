import { AnimationComponent } from "@/components/Animations/AnimatePresenceComponent";
import { GenericDialogPanel } from "@/components/Dialog/GenericPanel";
import { Dialog } from "@headlessui/react";
import styles from "./MemberDisplay.module.css";
import {
  faPeopleGroup,
  faSquare,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import UserInput from "@/components/Input";
import { EmergencyContactForm } from "./EmergencyContact";
import {
  AgeDropdown,
  LocaleDropdown,
  TimezoneDropdown
} from "../Dropdowns";
import { PartyMember } from "@/types/User";
import { ProfilePicture } from "./UpdateProfileURL";
import Button from "@/components/Button";
import { useRef } from "react";

export const MemberDisplay = ({
  ...props
}: PartyMember & {
  open: boolean;
  onClose: () => void;
}) => {
  const {
    _id,
    avatar,
    name,
    age,
    locale,
    timezone,
    accessibility,
    emergency_contact,
    primary
  } = props;

  const handleMemberUpdate = async (form: FormData) => {
    console.log(Object.fromEntries(form));
  };

  return (
    <Dialog
      className="border w-max p-4 rounded-2xl dark:bg-zinc-700 dark:border-zinc-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
      open={props.open}
      onClose={props.onClose}
    >
      <AnimationComponent>
        <Dialog.Backdrop
          onClick={props.onClose}
          className="bg-black bg-opacity-50 absolute top-0 left-0 right-0 bottom-0 backdrop-blur-lg"
        ></Dialog.Backdrop>
      </AnimationComponent>

      <AnimationComponent>
        <GenericDialogPanel
          title="Update Member"
          description="Manage your party member here!"
        >
          <form className="flex flex-col gap-4" action={handleMemberUpdate}>
            <div className="flex gap-4">
              <ProfilePicture avatar={avatar} className="w-min h-min" />
              <UserInput
                label="First Name"
                icon={{ icon: faUser }}
                defaultValue={name.first}
              />
              <UserInput
                label="Last Name"
                icon={{ icon: faPeopleGroup }}
                defaultValue={name.last}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <TimezoneDropdown timezone={timezone} />
              <div className="flex justify-between">
                <LocaleDropdown locale={locale} />
                <AgeDropdown age={age} />
              </div>
            </div>

            <div className="flex gap-4">
              <UserInput
                className="h-min !w-full"
                type="checkbox"
                label="Accessibility Required"
                isselected={accessibility ? "true" : "false"}
                icon={{
                  icon: faSquare,
                  onClick: () => {}
                }}
              />
              <UserInput
                className="h-min !w-full"
                type="checkbox"
                label="Primary Member"
                isselected={primary ? "true" : "false"}
                icon={{
                  icon: faSquare,
                  onClick: () => {}
                }}
              />
            </div>
            <div className="flex justify-center">
              <EmergencyContactForm
                {...emergency_contact}
                isNew={!emergency_contact}
              />
            </div>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </form>
        </GenericDialogPanel>
      </AnimationComponent>
    </Dialog>
  );
};
