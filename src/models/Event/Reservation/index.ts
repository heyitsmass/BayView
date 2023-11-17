import { Reservation } from "@/types/Event";
import { Schema } from "mongoose";
import { eventSchema } from "..";

/** Legacy !! Deprecated !! */
export const reservationSchema = new Schema<Reservation<any>>({
  ...eventSchema.obj,
});
