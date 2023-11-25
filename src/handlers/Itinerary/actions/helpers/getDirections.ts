"use server";
/** Get directions to the location */

export type GetDirectionsPayload = {
  _id: string;
  event_id: string;
};

const getDirections = async ({ ...props }: GetDirectionsPayload) => {};

export { getDirections };
