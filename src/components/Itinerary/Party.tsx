"use client";

import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import styles from "./party.module.css";
import { PartyMember } from "@/types/User";
import { Modal, useOpen } from "../Modal";

const Member = ({
  children,
  open,
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
  const { isOpen, open, close } = useOpen();

  return (
    <div className={styles.party}>
      <h2 className="text-lg">
        <b>Party</b>
      </h2>
      <FontAwesomeIcon icon={faPlus} className="absolute right-4 top-4" />
      <div className={styles.members}>
        {members.map((user, i) => (
          <Member key={i} open={open}>
            {user}
          </Member>
        ))}
      </div>
      <PartyMemberModal isOpen={isOpen} close={close}>
        {
          <div className="flex flex-col items-center justify-center">
            <p className="text-center">
              <b>Coming Soon!</b>
            </p>
          </div>
        }
      </PartyMemberModal>
    </div>
  );
};

const PartyMemberModal = ({
  isOpen,
  close,
  children,
}: {
  isOpen: boolean;
  close: () => void;
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <Modal>
      <Modal.Header title="Update Party Member" />
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <button onClick={close}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};
