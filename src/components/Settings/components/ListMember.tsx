"use client";
import {
  IconDefinition,
  faBars,
  faEnvelope,
  faSms,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence } from "framer-motion";
import styles from "./listMember.module.css";
import { useOpen } from "@/hooks";
import {
  faDiscord,
  faFacebook,
  faSlack,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { Notifiers } from "@/lib/notifier";
import { PartyMember } from "@/types/User";
import { DeleteMember } from "./Dialogs/DeleteMember";
import { useCurrentPartyMemberDispatch } from "../hooks/useCurrentPartyMember";

export const ListMember = ({
  ...props
}: PartyMember & {
  withActions?: boolean;
}) => {
  props.withActions = props.withActions ?? true;
  
  const setPartyMember = useCurrentPartyMemberDispatch();

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

  const [isOpen, open, close] = useOpen();

  const actions = [
    {
      icon: faTrash,
      onClick: () => open()
    },
    {
      icon: faBars,
      onClick: () => setPartyMember(props)
    }
  ] as const;

  return (
    <>
      <div className={styles.listMember}>
        <div
          className="flex items-center w-full"
          onClick={() => setPartyMember(props)}
        >
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

        {props.withActions && (
          <div
            id="actions"
            className="flex justify-end w-max gap-4 ml-4 text-lg"
          >
            {actions.map((action) => (
              <FontAwesomeIcon
                key={action.icon.iconName}
                {...action}
                className=" dark:hover:text-zinc-300 dark:text-zinc-100"
              />
            ))}
          </div>
        )}
      </div>
      {props.withActions && (
        <AnimatePresence>
          {isOpen && (
            <DeleteMember
              {...props}
              open={isOpen}
              onClose={() => close()}
            ></DeleteMember>
          )}
        </AnimatePresence>
      )}
    </>
  );
};
