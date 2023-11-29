"use server";

import { HomepageAction } from "@/context";
import { handleItineraryActionRequest } from "@/handlers/Itinerary/actions";
import { modelTypes } from "@/lib/constants";
import { DisplayableEvent } from "@/lib/random/handler";
import ItineraryModel from "@/models/Itinerary";

type HandlerResponse<T = any, S = number> = {
  statusCode: S;
  body: T;
};

type Error = {
  message: string;
};

type ErrorResponse = HandlerResponse<Error, 500 | 400>;
type SuccessResponse = HandlerResponse<any, 200>;

export default async function Handler(
  _id: string,
  action: HomepageAction
): Promise<SuccessResponse | ErrorResponse> {
  let res: SuccessResponse | ErrorResponse = {
    statusCode: 400,
    body: {
      message: "Bad Request"
    }
  };

  let body: any;
  try {
    switch (action.type) {
      case "itinerary":
        if (action.mode === "actions") {
          body = await handleItineraryActionRequest(action.payload);
        }
        break;
      case "event":
        body = await handleEventRequest(_id, action);
        break;
    }

    res = {
      statusCode: 200,
      body
    };
  } catch (err) {
    //console.error(err.message);
    return {
      statusCode: 500,
      body: {
        message: (err as Error).message
      }
    };
  }

  return res;
}

const handleEventRequest = async (_id: string, action: HomepageAction) => {
  switch (action.mode) {
    case "add":
      return handleAddEventRequest(_id, action.payload);
    case "delete":
      return handleDeleteEventRequest(_id, action.payload);
    case "refresh":
      return handleRefreshEventRequest(_id, action.payload);
  }
};

const handleAddEventRequest = async (
  _id: string,
  event: DisplayableEvent
): Promise<any> => {
  const itinerary = await ItineraryModel.findOne({
    _id
  });

  if (!itinerary) {
    throw new Error("Itinerary does not exist.");
  }

  itinerary.events.push(new modelTypes[event.__t](event));

  await itinerary.save();

  return {
    message: "Event added to itinerary"
  };
};

const handleRefreshEventRequest = async (
  _id: string,
  event: DisplayableEvent
): Promise<any> => {
  /* Perform Work */
  return {
    message: "Event refreshed successfully",
    event
  };
};

const handleDeleteEventRequest = async (
  _id: string,
  event: DisplayableEvent
): Promise<any> => {
  await ItineraryModel.updateOne(
    {
      _id
    },
    {
      $pull: {
        events: {
          _id: event._id
        }
      }
    }
  );

  return {
    message: "Event deleted successfully"
  };
};
