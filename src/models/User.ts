import { IUser } from "@/types/User";
import { itinerarySchema } from "./Itinerary";
import { coordinatedItinerarySchema } from "./CoordinatedItinerary";
import mongoose, { HydratedDocument, Schema } from "mongoose";
import { Credentials } from "google-auth-library";

import { RefreshAccessTokenResponse } from "google-auth-library/build/src/auth/oauth2client";
import { getCredentials } from "@/app/services/auth/utils";

export const credentialsSchema = new Schema<Credentials>(
  {
    access_token: { type: String, required: true },
    refresh_token: { type: String, required: true },
    expiry_date: { type: Number, required: true },
    id_token: { type: String, required: true }
  },
  {
    _id: false
  }
);

export const userSchema = new Schema<IUser>({
  name: {
    first: { type: String, required: true },
    last: { type: String, required: false, default: null },
    middle: { type: String, required: false, default: null }
  },
  authType: { type: String, required: true },
  credentials: { type: credentialsSchema, required: false, default: null },
  username: { type: String, required: false, default: null },
  phone: { type: String, required: false, default: null },
  email: { type: String, required: true },
  password: { type: String, required: false, default: null },
  itinerary: {
    type: itinerarySchema,
    default: null
  },
  coordinatedItineraries: {
    type: [coordinatedItinerarySchema],
    default: null
  },
  discordId: { type: String, required: false, default: null },
  discordDMChannel: { type: String, required: false, default: null }
});

userSchema.method(
  "refreshAccessToken",
  async function (this: HydratedDocument<IUser>) {
    const { credentials } = getCredentials(
      this.username,
      this._id.toString()
    );

    this.credentials = credentials;
    await this.save();
  }
);

type IUserQueryHelpers = {};

type IUserMethods = {
  refreshAccessToken: () => Promise<
    Pick<RefreshAccessTokenResponse, "credentials">
  >;
};

type IUserVirtuals = {};

const Users: mongoose.Model<
  IUser,
  IUserQueryHelpers,
  IUserMethods,
  IUserVirtuals
> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default Users;
