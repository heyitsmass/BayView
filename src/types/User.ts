import { Notifiers } from "@/lib/notifier";
import { Locale } from "@/utils/openWeather/langText";
import { TimeZones } from ".";

export interface UserMetadata {
  readonly username: string;
  readonly first_name: string;
  readonly last_name: string;
  readonly discord: string;
  party: Party;
}

export type TUserMetadata = UserMetadata;

type AgeRange = "Adult" | "Child";

export type Party = {
  name: string;
  members: PartyMember[];
};

export type PartyMember = {
  /** the id of the user   */
  readonly _id: string;
  /** The avatar url of the user */
  avatar: string;
  /** The name of the user */
  name: {
    /** The first name of the user */
    first: string;
    /** The last name of the user */
    last?: string;
  };
  /** THe age range of the user */
  age: AgeRange;
  /** If the user is the primary party leader */
  primary?: boolean;
  /** The notification methods enabled for the user */
  notifiers: {
    /** the type of notification */
    type: Notifiers;
    /** The id of the person to the send the notification to (requires verification to reduce spam) */
    _id: string;
  }[];
  /** The shopping budget if set*/
  shopping_budget?: number;
  /** Event Ids the user is linked to */
  events: string[]; //event ids
  /** Preferred language */
  locale: Locale;
  /** The user's timezone */
  timezone: TimeZones;
  /** Requires accessibility needs? */
  accessibility: boolean;
  /** Emergency Contact */
  emergency_contact?: {
    /** The name of the emergency contact */
    name: string;
    /** The phone number of the emergency contact */
    phone: string;
    /** The relationship to the party member */
    relationship: string;
  };
};
