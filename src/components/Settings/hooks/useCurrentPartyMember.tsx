import { useContext } from "react";
import { CurrentPartyMember, CurrentPartyMemberDispatch } from "../context";

export const useCurrentPartyMember = () => {
  return useContext(CurrentPartyMember);
};

export const useCurrentPartyMemberDispatch = () => {
  return useContext(CurrentPartyMemberDispatch);
};
