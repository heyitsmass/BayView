"use client";

import { PartyMember } from "@/types/User";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import styles from "./party.module.css";
import { useOpen } from "@/hooks";
import { ContainedDialog, GenericDialog } from "../ContainedDialog";
import { Dialog } from "@headlessui/react";

const Member = ({
  children,
  open
}: {
  children: PartyMember;
  open: () => void;
}) => {
  const { avatar, name } = children;

  return (
    <div className={styles.party_member} onClick={open}>
      <Image
        src={avatar}
        height={30}
        width={30}
        alt={name[0].toLocaleUpperCase()}
        className="rounded-full m-2 "
      />
      <p className="w-full truncate ellipsis">{name}</p>
      <span className="px-2">
        <FontAwesomeIcon icon={faBars} />
      </span>
    </div>
  );
};

type PartyProps = {
  members: PartyMember[];
};

export const Party = ({ members }: PartyProps) => {
  const [isOpen, open, close] = useOpen();

  return (
    <div className={styles.party}>
      <h2 className="text-lg">
        <b>Party</b>
      </h2>
      <AddMemberDialog btn={<FontAwesomeIcon icon={faPlus} />} />
      <div className={styles.members}>
        {members.map((user, i) => (
          <Member key={i} open={open}>
            {user}
          </Member>
        ))}
      </div>
      <UpdateMemberDialog isOpen={isOpen} close={close} />
    </div>
  );
};

const AddMemberDialog = ({ btn }: { btn: JSX.Element }) => {
  const data = {
    title: "Add Party Member",
    description: "Add a party member to your event!"
  };

  return (
    <ContainedDialog btn={btn}>
      <GenericDialog {...data}></GenericDialog>
    </ContainedDialog>
  );
};

type UpdateMemberDialogProps = {
  isOpen: boolean;
  close: () => void;
};

const UpdateMemberDialog = ({ isOpen, close }: UpdateMemberDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={close}>
      <Dialog.Title>Update Member</Dialog.Title>
      <Dialog.Description>
        <div className="flex flex-col items-center justify-center p-4">
          <p className="text-center">
            <b>Coming Soon!</b>
          </p>
        </div>
      </Dialog.Description>
    </Dialog>
  );
};
