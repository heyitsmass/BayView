import { PartyMember } from "@/types/User";
import * as activity from "./activity";
import * as reservation from "./reservation";
import { faker } from "@faker-js/faker";

const random = {
  activity,
  reservation,
  member: ({
    count,
    min,
    max,
  }: {
    count?: number;
    min?: number;
    max?: number;
  }) => {
    const generate = () => {
      return {
        avatar: faker.image.avatar(),
        name: faker.person.firstName(),
        age: "Adult",
        primary: false,
        notifications: ["email", "phone", "discord"],
      } as PartyMember;
    };

    if (!count && (min || max)) {
      count = faker.number.int({ min, max });
    }

    const members: PartyMember[] = [];
    for (let i = 0; i < (count || 1); i++) {
      members.push(generate());
    }
    return members;
  },
};

export default random;
