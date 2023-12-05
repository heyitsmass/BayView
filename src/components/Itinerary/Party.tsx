"use client";

import {
  useCurrentEvent,
  useHomepage,
  useHomepageManager,
  useOpen
} from "@/hooks";
import { Notifiers } from "@/lib/notifier";
import { PartyMember } from "@/types/User";
import {
  IconDefinition,
  faDiscord,
  faFacebook,
  faSlack,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPlus,
  faSms,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Button from "../Button";
import { ContainedDialog, PrebuiltDialog } from "../Dialog";
import { ScrollableData } from "../Settings/components/ScrollableData";
import styles from "./party.module.css";

export const Party = () => {
  const { party } = useHomepage().user.metadata;

  const currentEvent = useCurrentEvent();
  if (!currentEvent) return null;

  return (
    <div className={styles.party}>
      <h2 className="text-lg flex justify-between items-center w-full px-2">
        <p className="font-bold">Party</p>
        <AddMemberDialog btn={<FontAwesomeIcon icon={faPlus} />} />
      </h2>
      <div className={styles.members}>
        {party.members
          .filter((member) =>
            (currentEvent.party || []).includes(member._id)
          )
          .map((member, i) => (
            <Member key={i} {...member} />
          ))}
      </div>
    </div>
  );
};

const Member = ({ ...props }: PartyMember) => {
  const [isOpen, open, close] = useOpen();

  const { _id, avatar, name } = props;
  return (
    <div className={styles.party_member} onClick={open}>
      <Image
        src={avatar}
        height={25}
        width={25}
        alt={name.first[0].toLocaleUpperCase()}
        className="rounded-full m-2 "
      />
      <p className="w-full truncate ellipsis">{name.first}</p>
      <span className="px-2">
        <FontAwesomeIcon icon={faTrash} />
      </span>
      <RemoveMemberDialog _id={_id} isOpen={isOpen} close={close} />
    </div>
  );
};

const ConfirmMemberRemoval = ({
  onDelete,
  onCancel
}: {
  onDelete: (e?) => void;
  onCancel: (e?) => void;
}) => {
  return (
    <div className="flex gap-4">
      <Button onClick={onDelete} variant="secondary">
        Delete
      </Button>
      <Button onClick={onCancel} variant="primary">
        Cancel
      </Button>
    </div>
  );
};

const RemoveMemberDialog = ({
  _id,
  isOpen,
  close
}: {
  _id: string;
  isOpen: boolean;
  close: () => void;
}) => {
  const { party } = useHomepage().user.metadata;

  const currentEvent = useCurrentEvent();
  const manager = useHomepageManager();

  if (!currentEvent) return null;

  const member = party.members.find((member) => member._id === _id);

  const data = {
    title: `Remove ${member?.name.first}`,
    description:
      "Are you sure you want to remove them from your event party?"
  };

  const handleRemovePartyMemberFromEvent = async (e) => {
    try {
      if (!currentEvent) return;

      await manager({
        type: "event_party",
        mode: "remove",
        payload: {
          event_id: currentEvent!._id,
          member_id: _id
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isOpen && (
        <PrebuiltDialog {...data} open={isOpen} onClose={close}>
          <ConfirmMemberRemoval
            onDelete={handleRemovePartyMemberFromEvent}
            onCancel={close}
          ></ConfirmMemberRemoval>
        </PrebuiltDialog>
      )}
    </>
  );
};

const AddMemberDialog = ({ btn }: { btn: JSX.Element }) => {
  const { party } = useHomepage().user.metadata;

  const currentEvent = useCurrentEvent();

  if (!currentEvent) return null;

  // List of ids
  const currentParty = currentEvent.party || [];

  const data = {
    title: "Add Party Member",
    description: "Add a party member to your event!"
  };

  return (
    <ContainedDialog btn={btn} {...data}>
      <ScrollableData
        Component={PartialListMember}
        data={party.members.filter(
          (member) => !currentParty.includes(member._id)
        )}
      ></ScrollableData>
    </ContainedDialog>
  );
};

const PartialListMember = ({ ...props }: PartyMember) => {
  const notifierMap = {
    facebook: faFacebook,
    slack: faSlack,
    discord: faDiscord,
    twitter: faTwitter,
    email: faEnvelope,
    sms: faSms
  } as {
    [P in Notifiers]: IconDefinition;
  };

  const manger = useHomepageManager();
  const currEvent = useCurrentEvent();

  const handleAddPartyMemberToEvent = async (e) => {
    try {
      if (!currEvent) return;

      await manger({
        type: "event_party",
        mode: "add",
        payload: {
          event_id: currEvent!._id,
          member_id: props._id
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.listMember}>
      <div className="flex items-center w-full">
        <div className="flex w-1/3 items-center text-xl min-w-max">
          <div
            className="!h-[30px] !w-[30px] border rounded-full"
            style={{
              backgroundImage: `url(${props.avatar})`,
              backgroundSize: "cover"
            }}
          />
          <span className="font-semibold px-4">{props.name.first}</span>
        </div>
        <div
          id="notifiers"
          className="min-w-max flex items-center w-full justify-center gap-4 text-lg"
        >
          {props.notifiers.map((notifier) => {
            return (
              <FontAwesomeIcon
                className="opacity-75"
                key={notifier.type}
                icon={notifierMap[notifier.type]}
              />
            );
          })}
        </div>
      </div>
      <div id="actions" className="min-w-max">
        <FontAwesomeIcon
          icon={faPlus}
          className="pl-4 text-lg dark:hover:text-zinc-300 dark:text-zinc-100"
          onClick={handleAddPartyMemberToEvent}
        />
      </div>
    </div>
  );
};
