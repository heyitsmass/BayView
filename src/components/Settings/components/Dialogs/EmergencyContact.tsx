import { AnimationComponent } from "@/components/Animations/AnimatePresenceComponent";
import Button from "@/components/Button";
import { GenericDialogPanel } from "@/components/Dialog/GenericPanel";
import UserInput from "@/components/Input";
import { useOpen } from "@/hooks";
import {
  faPeopleGroup,
  faPhone,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { Dialog } from "@headlessui/react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { handleEmergencyContactSubmit } from "./Handler";

type EmergencyContact = {
  name: string;
  phone: string;
  relationship: string;
};

export const EmergencyContactForm = ({
  name,
  phone,
  relationship,
  isNew
}: Partial<EmergencyContact> & {
  isNew?: boolean;
}) => {
  const [isOpen, open, close] = useOpen();

  const [contact, setContact] = useState({
    name: "",
    phone: "",
    relationship: ""
  } as EmergencyContact);

  const handleEmergencyContact = async (form: FormData) => {
    await handleEmergencyContactSubmit(form);
  };

  return (
    <>
      <Button
        variant="secondary"
        className="h-max"
        type="button"
        onClick={open}
      >
        {isNew ? "Create" : "Update"} Emergency Contacts
      </Button>

      <AnimatePresence>
        {isOpen && (
          <Dialog
            className="border w-max p-4 rounded-2xl dark:bg-zinc-700 dark:border-zinc-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "
            open={isOpen}
            onClose={close}
          >
            <AnimationComponent>
              <Dialog.Backdrop
                onClick={close}
                className="bg-black bg-opacity-50 absolute top-0 left-0 right-0 bottom-0 backdrop-blur-lg"
              />
            </AnimationComponent>
            <AnimationComponent>
              <GenericDialogPanel
                title="Emergency Contact"
                description="Update emergency contact information"
              >
                <form
                  action={handleEmergencyContact}
                  className="grid-cols-span h-3/4"
                >
                  <section className="borderdark:bg-zinc-800 rounded-2xl p-4 dark:border-zinc-700">
                    <h2 className="text-lg font-semibold">
                      Emergency Contact
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                      <UserInput
                        name="name"
                        label="Name"
                        placeholder="John Doe"
                        icon={{ icon: faUser }}
                        defaultValue={name}
                      />
                      <UserInput
                        name="phone"
                        label="Phone"
                        placeholder="555-555-5555"
                        icon={{ icon: faPhone }}
                        defaultValue={phone}
                      />
                      <UserInput
                        name="relationship"
                        label="Relationship"
                        placeholder="Mother, Father, ..."
                        icon={{ icon: faPeopleGroup }}
                        defaultValue={relationship}
                      />
                      <Button
                        type="submit"
                        variant="secondary"
                        className="h-min mt-8 w-3/4 justify-self-center dark:!border-rose-600"
                      >
                        {isNew ? "Save" : "Update"}
                      </Button>
                    </div>
                  </section>
                </form>
              </GenericDialogPanel>
            </AnimationComponent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};
