import { IUser } from "@/types/User";
import { itinerarySchema } from "./Itinerary";
import { coordinatedItinerarySchema } from "./CoordinatedItinerary";
import mongoose, { HydratedDocument, Schema } from "mongoose";
import { Credentials } from "google-auth-library";

import { RefreshAccessTokenResponse } from "google-auth-library/build/src/auth/oauth2client";
import { getCredentials } from "@/app/services/auth/utils";


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
  }
});

type IUserQueryHelpers = {};

type IUserMethods = {
};

type IUserVirtuals = {};

const Users: mongoose.Model<
  IUser,
  IUserQueryHelpers,
  IUserMethods,
  IUserVirtuals
> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default Users;
