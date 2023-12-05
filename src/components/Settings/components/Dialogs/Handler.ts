"use server";

import { TUserMetadata } from "@/types/User";
import { getSSRSession } from "@/utils/session/getSSRSession";
import UserMetadata from "supertokens-node/recipe/usermetadata";

const handleEmergencyContactSubmit = async (form: FormData) => {
  console.log("submit", Object.fromEntries(form));

  const obj = Object.fromEntries(form) as {
    name: string;
    phone: string;
    relationship: string;
  };

  const { name, phone, relationship } = obj;

  const { session } = await getSSRSession();

  if (!session)
    return {
      message: "Session not found"
    };

  const userId = session.getUserId();

  const { metadata } = (await UserMetadata.getUserMetadata(userId)) as {
    metadata: TUserMetadata;
  };

  const { party } = metadata;

  const { members } = party;

  const member = members.find((member) => member._id === userId);

  if (!member)
    return {
      message: "Member not found"
    };

  await UserMetadata.updateUserMetadata(userId, {
    emergency_contact: {
      name,
      phone,
      relationship
    }
  });

  return {
    message: "Emergency contact updated"
  };
};

export { handleEmergencyContactSubmit };
