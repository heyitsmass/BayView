"use client";

import { faBars, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import styles from "./party.module.css";
import { PartyMember } from "@/types/User";

const Member = ({ children }: { children: PartyMember }) => {
  const { avatar, name } = children;

  return (
    <div className={styles.party_member}>
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
  return (
    <div className={styles.party}>
      <h2 className="text-lg">
        <b>Party</b>
      </h2>
      <FontAwesomeIcon icon={faPlus} className="absolute right-4 top-4" />
      <div className={styles.members}>
        {members.map((user, i) => (
          <Member key={i}>{user}</Member>
        ))}
      </div>
    </div>
  );
};
