"use client";

import { AnimationComponent } from "@/components/Animations/AnimatePresenceComponent";
import { GenericDialogPanel } from "@/components/Dialog/GenericPanel";
import UserInput from "@/components/Input";
import { PartyMember } from "@/types/User";
import { faker } from "@faker-js/faker";
import { Dialog } from "@headlessui/react";
import {
  AgeDropdown,
  LocaleDropdown,
  TimezoneDropdown
} from "../Dropdowns";
import Button from "@/components/Button";
import { useMemo, useState } from "react";
import { EmergencyContactForm } from "./EmergencyContact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faPeopleGroup,
  faSave,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { useOpen } from "@/hooks";
import { ProfilePicture } from "./UpdateProfileURL";

export const AddMemberForm = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  /** party member addition has to be reduced. */

  const member = useMemo(
    () => ({
      _id: faker.string.uuid(),
      avatar: faker.image.avatarGitHub(),
      name: {
        first: "",
        last: undefined
      },
      age: "Adult",
      primary: false,
      notifiers: [],
      shopping_budget: undefined,
      events: [],
      locale: "en",
      timezone: "America/New_York",
      accessibility: false,
      emergency_contact: undefined
    }),
    []
  );

  const [firstName, setName] = useState("");

  const handleAddMember = async (form: FormData) => {
    const _id = faker.string.uuid();
    const formData = Object.fromEntries(form) as Partial<PartyMember>;

    const member = {
      _id,
      avatar: faker.image.avatarGitHub() || (formData.avatar as string),
      name: {
        first: formData.name!.first as string,
        last: formData.name!.last as string | null
      },
      age: formData.age as string,
      primary: formData.primary as boolean,
      notifiers: [],
      shopping_budget: undefined,
      events: [],
      locale: formData.locale as string,
      timezone: formData.timezone as string,
      accessibility: formData.accessibility as boolean,
      emergency_contact: undefined
    };
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className="z-0 border w-max p-4 rounded-2xl dark:bg-zinc-700 dark:border-zinc-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
    >
      <AnimationComponent>
        <Dialog.Backdrop
          onClick={onClose}
          className="bg-black bg-opacity-50 absolute top-0 left-0 right-0 bottom-0 backdrop-blur-lg"
        ></Dialog.Backdrop>
      </AnimationComponent>
      <AnimationComponent>
        <GenericDialogPanel
          title="Add Party Member"
          description="Add a new party member!"
        >
          <form action={handleAddMember} className="relative z-0">
            <FontAwesomeIcon
              icon={faSave}
              className="absolute -top-16 right-10 text-2xl dark:hover:text-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900 cursor-pointer p-3 border rounded-2xl dark:bg-zinc-800 dark:border-zinc-700 shadow-lg"
            />
            <div id="top" className="flex p-4 gap-4 flex-row z-10">
              <ProfilePicture avatar={member.avatar} />
              <UserInput
                icon={{ icon: faUser }}
                label="First Name"
                onKeyUp={(e) => {
                  setName(e.currentTarget.value);
                }}
                required
                placeholder="First Name..."
              />
              <UserInput
                icon={{ icon: faPeopleGroup }}
                label="Last Name"
                placeholder="Last Name..."
              />
            </div>
            <div className="flex p-4 justify-around z-10">
              <AgeDropdown age="Adult"></AgeDropdown>
              <LocaleDropdown locale="en"></LocaleDropdown>
              <TimezoneDropdown
                timezone={"America/New_York"}
              ></TimezoneDropdown>
            </div>

            <div className="flex p-4 gap-4 z-10">
              <UserInput label="Accessibility?" type="checkbox" />
              <UserInput label="Primary Member" type="checkbox" />
              <EmergencyContactForm isNew />
            </div>
          </form>
        </GenericDialogPanel>
      </AnimationComponent>
    </Dialog>
  );
};
