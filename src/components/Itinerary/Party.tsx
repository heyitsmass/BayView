"use client";

import { useOpen } from "@/hooks";
import { PartyMember } from "@/types/User";
import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { AnimatedDialog, ContainedDialog, PrebuiltDialog } from "../Dialog";
import styles from "./party.module.css";
import { useState } from "react";

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
        height={25}
        width={25}
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

  const [index, setUser] = useState(0);

  return (
    <div className={styles.party}>
      <h2 className="text-lg flex justify-between items-center w-full px-2">
        <p className="font-bold">Party</p>
        <AddMemberDialog btn={<FontAwesomeIcon icon={faPlus} />} />
      </h2>
      <div className={styles.members}>
        {members.map((user, i) => (
          <Member key={i} open={open}>
            {user}
          </Member>
        ))}
      </div>
      <UpdateMemberDialog
        isOpen={isOpen}
        close={close}
        user={members[index]}
      />
    </div>
  );
};

const AddMemberDialog = ({ btn }: { btn: JSX.Element }) => {
  const data = {
    title: "Add Party Member",
    description: "Add a party member to your event!"
  };

  return <ContainedDialog btn={btn} {...data} />;
};

type UpdateMemberDialogProps = {
  isOpen: boolean;
  close: () => void;
  user: PartyMember;
};

const UpdateMemberDialog = ({
  isOpen,
  close,
  user
}: UpdateMemberDialogProps) => {
  return (
    <PrebuiltDialog
      title="Update Member"
      description={`Modify the reservation for ${user.name}`}
      open={isOpen}
      onClose={close}
    ></PrebuiltDialog>
  );
};
