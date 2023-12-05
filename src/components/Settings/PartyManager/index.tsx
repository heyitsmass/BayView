import Button from "@/components/Button";
import { useHomepage } from "@/hooks";
import { PartyMember } from "@/types/User";
import { AnimatePresence } from "framer-motion";
import { FocusEvent, useState } from "react";
import { ScrollableData } from "../components/ScrollableData";
import { CurrentPartyMember, CurrentPartyMemberDispatch } from "../context";
import styles from "./styles.module.css";
import { ListMember } from "../components/ListMember";
import { MemberDisplay } from "../components/Dialogs/MemberDisplay";
import { AddMemberForm } from "../components/Dialogs/AddMember";

export const PartyManager = () => {
  const ctx = useHomepage();

  const { metadata } = ctx.user;

  const { party } = metadata;

  const { members } = party;

  const handlePartyNameChange = async (
    e: FocusEvent<HTMLInputElement, Element>
  ) => {
    const { value } = e.target;
  };

  const [currentMember, setCurrentMember] = useState(
    null as PartyMember | null
  );

  const [isAddMemberFormOpen, setAddMemberFormOpen] = useState(false);

  return (
    <CurrentPartyMember.Provider value={currentMember}>
      <CurrentPartyMemberDispatch.Provider value={setCurrentMember}>
        <div className={styles.partyManager}>
          <h2 className="text-2xl font-semibold flex justify-between pb-4">
            Party Manager
            {currentMember && (
              <Button
                className="text-sm h-min"
                variant="secondary"
                onClick={() => setCurrentMember(null)}
              >
                Back to List
              </Button>
            )}
          </h2>
          <div className={styles.content}>
            <ScrollableData data={members} Component={ListMember} />
            <Button
              className="w-full mt-2 h-min !p-1 !text-sm"
              variant="secondary"
              onClick={() => setAddMemberFormOpen(true)}
            >
              Add Member
            </Button>
            <AnimatePresence>
              {currentMember && (
                <MemberDisplay
                  {...currentMember}
                  open={currentMember !== null}
                  onClose={() => setCurrentMember(null)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
        <AnimatePresence>
          {isAddMemberFormOpen && (
            <div className="absolute top-5 left-0 right-0">
              <AddMemberForm
                open={isAddMemberFormOpen}
                onClose={() => setAddMemberFormOpen(false)}
              />
            </div>
          )}
        </AnimatePresence>
      </CurrentPartyMemberDispatch.Provider>
    </CurrentPartyMember.Provider>
  );
};
