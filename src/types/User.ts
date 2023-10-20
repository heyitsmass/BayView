import { Credentials } from "google-auth-library";
import { ICoordinatedItinerary } from "./CoordinatedItinerary";

type AuthTypes = "email" | "google" | "admin";

export type IUser<T extends AuthTypes = AuthTypes> = {
  name: {
    /** The user's first name */
    first: string;
    /** The user's last name */
    last?: string;
    /** The user's middle name */
    middle?: string;
  };
  /** The user's google credentials */
  credentials: Credentials;
  /** The username associated with the account */
  username: string;
  /** The user's phone number */
  phone: string;
  /** The user's email address */
  email: string;
  /** The user's itinerary */
  itinerary: IItinerary;
  /** The user's coordinated itineraries */
  coordinatedItineraries: ICoordinatedItinerary[];
  /** The user's authentication type */
  authType: T;
  /** The user's password */
  password: T extends "email" ? string : undefined;
  /** The users' discord Id */
  discordId?: string;
  /** The current DM Channel Id */
  discordDMChannel?: String;
};

export type EmailUser = IUser<"email">;
export type GoogleUser = IUser<"google">;
export type AdminUser = IUser<"admin">;
