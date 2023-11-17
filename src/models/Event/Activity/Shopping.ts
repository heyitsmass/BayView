import { Activity, Shopping } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";

const shoppingSchema = new Schema<Activity<Shopping>>({
  ...activitySchema.obj,
  mall: String,
  stores: [String],
  openingHours: String,
  salesAndDeals: {
    type: [
      {
        name: String,
        description: String || undefined,
        _id: false,
      },
    ],
    default: [],
  },
  diningOptions: {
    type: [
      {
        name: String,
        description: String || undefined,
        _id: false,
      },
    ],
    default: [],
  },
  customerReviews: {
    type: Map,
    of: {
      store: String,
      comment: String,
      rating: Number,
      _id: false,
    },
    default: {},
  },
  shoppingBudget: Number,
});

export const ShoppingModel =
  EventModel.discriminators?.Shopping ||
  EventModel.discriminator<Activity<Shopping>>("Shopping", shoppingSchema);
