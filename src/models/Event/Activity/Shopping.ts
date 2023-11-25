import { Activity, Shopping } from "@/types/Event";
import { Schema } from "mongoose";
import { EventModel } from "..";
import { activitySchema } from ".";
import { PeekData } from "@/types";

const shoppingSchema = new Schema<Activity<Shopping>>({
  ...activitySchema.obj,
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/shopping.png",
  },
  mall: String,
  stores: [String],
  openingHours: String,
  salesAndDeals: {
    type: [
      {
        name: String,
        description: String || undefined,
        _id: false
      }
    ],
    default: []
  },
  diningOptions: {
    type: [
      {
        name: String,
        description: String || undefined,
        _id: false
      }
    ],
    default: []
  },
  customerReviews: {
    type: Map,
    of: {
      store: String,
      comment: String,
      rating: Number,
      _id: false
    },
    default: {}
  },
  shoppingBudget: Number
});

shoppingSchema.virtual("displayData").get(function (this: Activity<Shopping>) {
  const sale = this.salesAndDeals[0];
  const diningOption = this.diningOptions[0];
  const review = this.customerReviews[Object.keys(this.customerReviews)[0]];
  return {
    "Mall Name": this.name,
    Address: [this.location.street, this.location.street].join(", "),
    Mall: this.mall,
    Store: this.stores[0],
    "Opening Hours": this.openingHours,
    "Sale Name": sale.name,
    "Shopping Budget": this.shoppingBudget
  };
});

shoppingSchema
  .virtual("upgradeOptions")
  .get(function (this: Activity<Shopping>) {
    /** Modify Budget */
    /** Modify Wishlist */
    /** Sale Sniper */
  });

shoppingSchema
  .virtual("peek")
  .get(function (this: Activity<Shopping>): PeekData {
    const currency = "$";
    return [
      {
        label: "Shopping",
        value: this.date.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric"
        })
      },
      {
        value: this.mall
      },
      {
        label: "Open",
        value: this.openingHours
      },
      {
        label: "Hot Sale",
        value: this.salesAndDeals[0].name
      },
      {
        label: "Budget",
        value: `${currency}${this.shoppingBudget}`
      }
    ];
  });

export const ShoppingModel =
  EventModel.discriminators?.Shopping ||
  EventModel.discriminator<Activity<Shopping>>("Shopping", shoppingSchema);
