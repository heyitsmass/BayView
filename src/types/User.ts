export interface UserMetadata {
  readonly username: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly discord: string;
}

export type PartyMember = {
  avatar: string;
  name: string;
  age: "Adult" | "Child";
  primary: boolean;
  notifications: ("email" | "phone" | "discord")[];
};
