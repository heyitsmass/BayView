"use client";
import {
  faBars,
  faEnvelope,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import styles from "./party.module.css";
import { faker } from "@faker-js/faker";

export type PartyMember = {
  avatar: string;
  name: string;
  age: "Adult" | "Child";
  primary: boolean;
  notifications: ("email" | "phone" | "discord")[];
};

const PartyMember = ({ children }: { children: PartyMember }) => {
  const { avatar, name, age, primary, notifications } = children;

  return (
    <div
      className={
        styles.party_member +
        " flex items-center bg-zinc-800 shadow-lg rounded-lg relative p-1 mt-2"
      }
    >
      <span className="w-max p-2">
        <Image
          src={avatar}
          height={30}
          width={30}
          alt="avatar"
          className="rounded-full"
        />
      </span>
      <span className={styles.wrapper + " flex w-full"}>
        <span className="w-full">
          <p>{name}</p>
        </span>
        <span className="px-4 self-end">
          <FontAwesomeIcon icon={faBars} />
        </span>
      </span>
    </div>
  );
};

type PartyProps = {
  members: PartyMember[];
};

export const Party = ({ members }: PartyProps) => {
  return (
    <div
      className={
        styles.party +
        " h-5/6 w-full text-white bg-zinc-700 border border-zinc-600 rounded-2xl relative p-4 pt-2 mt-2"
      }
    >
      <h2 className="text-lg">
        <b>Party</b>
      </h2>
      <FontAwesomeIcon icon={faPlus} className="absolute right-4 top-4" />
      <div className={styles.members + " h-min"}>
        {members.map((user, i) => (
          <PartyMember key={i}>{user}</PartyMember>
        ))}
      </div>
    </div>
  );
};
