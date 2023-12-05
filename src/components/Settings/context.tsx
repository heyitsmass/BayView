"use client";
import { Dispatch, SetStateAction, createContext } from "react";

import { PartyMember } from "@/types/User";

export const CurrentPartyMember = createContext<PartyMember | null>(null);
export const CurrentPartyMemberDispatch = createContext<
  Dispatch<SetStateAction<PartyMember | null>>
>(() => {});
