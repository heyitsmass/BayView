import { Offer, PeekData } from "@/types";
import { Event, Shopping } from "@/types/Event";
import { faker } from "@faker-js/faker";
import { Schema } from "mongoose";
import { EventModel, eventSchema } from "..";

const helper = {
  name: String,
  description: String || undefined,
  _id: false
};
const shoppingSchema = new Schema<Event<Shopping>>({
  ...(eventSchema.obj as Object),
  picture_url: {
    type: String,
    immutable: true,
    default: "/assets/events/shopping.png"
  },
  mall: String,
  store: String,
  openingHours: String,
  kind: String,
  sale: helper,
  deal: helper,
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

shoppingSchema.virtual("displayData").get(function (this: Event<Shopping>) {
  const sale = this.sale;
  const deal = this.deal;
  const review = this.customerReviews[Object.keys(this.customerReviews)[0]];
  return {
    "Mall Name": this.mall,
    Address: [this.location.street, this.location.street].join(", "),
    Store: this.store,
    "Opening Hours": this.openingHours,
    "Deal Name": deal.name,
    "Sale Name": sale.name,
    "Shopping Budget": this.shoppingBudget
  };
});

shoppingSchema
  .virtual("upgradeOptions")
  .get(function (this: Event<Shopping>) {
    /** Modify Budget */
    /** Modify Wishlist */
    /** Sale Sniper */
  });

shoppingSchema
  .virtual("peek")
  .get(function (this: Event<Shopping>): PeekData {
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
        value: this.sale.name
      },

      {
        label: "Budget",
        value: `${currency}${this.shoppingBudget}`
      }
    ];
  });

shoppingSchema
  .virtual("offer")
  .get(function (this: Event<Shopping>): Offer {
    return [
      faker.string.uuid(),
      (
        this.date || faker.date.soon({ refDate: new Date(Date.now()) })
      ).toLocaleString(undefined, {
        month: "numeric",
        day: "numeric"
      }),
      this.mall,
      this.sale.name,
      this.deal.name,
      null,
      this.shoppingBudget || "N/A"
    ];
  });

export const ShoppingModel =
  EventModel.discriminators?.Shopping ||
  EventModel.discriminator<Event<Shopping>>("Shopping", shoppingSchema);
