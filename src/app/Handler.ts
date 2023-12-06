"use server";

import { DisplayableEvent } from "@/components/HomePage/EventFinder";
import { HomepageAction } from "@/context";
import { handleItineraryActionRequest } from "@/handlers/Itinerary/actions";
import { modelTypes } from "@/lib/constants";

import ItineraryModel from "@/models/Itinerary";
import { TUserMetadata } from "@/types/User";
import { getSSRSession } from "@/utils/session/getSSRSession";
import UserMetadata from "supertokens-node/recipe/usermetadata";
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
        } else {
          switch (action.mode) {
            case "update":
              await ItineraryModel.updateOne(
                {
                  _id
                },
                {
                  $set: action.payload
                }
              );
              body = {
                message: `Itinerary ${Object.keys(
                  action.payload
                )} updated successfully`
              };
          }
        }
        break;
      case "event":
        body = await handleEventRequest(_id, action);
        break;

      case "event_party":
        switch (action.mode) {
          case "add":
            body = await handleAddPartyMemberToEvent(_id, action.payload);
            break;
          case "remove":
            body = await handleRemovePartyMemberFromEvent(
              _id,
              action.payload
            );
            break;
        }

      case "party_member":
        switch (action.mode) {
          case "delete":
            body = await handleDeletePartyMember(_id, action.payload);
            break;
        }
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

const handleDeletePartyMember = async (
  _id: string,
  payload: {
    member_id: string;
  }
) => {
  const res = await ItineraryModel.updateOne(
    //delete the id from any events in mongo
    {
      _id
    },
    {
      $pull: {
        events: {
          party: payload.member_id
        }
      }
    }
  );

  const { session } = await getSSRSession();

  if (!session) throw new Error("Session not found");

  const userId = session?.getUserId();

  const { metadata } = (await UserMetadata.getUserMetadata(userId)) as {
    metadata: TUserMetadata;
  };

  if (
    metadata.party.members.length <= 0 ||
    !metadata.party.members.find(
      (member) => member._id === payload.member_id
    )
  ) {
    return {
      message: "Party member does not exist in this itinerary"
    };
  }

  await UserMetadata.updateUserMetadata(userId, {
    ...metadata,
    party: {
      ...metadata.party,
      members: metadata.party.members.filter(
        (member) => member._id !== payload.member_id
      )
    }
  });

  return {
    message: "Party member deleted from itinerary"
  };
};
const handleRemovePartyMemberFromEvent = async (
  _id: string,
  payload: {
    event_id: string;
    member_id: string;
  }
) => {
  const res = await ItineraryModel.updateOne(
    {
      _id,
      "events._id": payload.event_id
    },
    {
      $pull: {
        "events.$.party": payload.member_id
      }
    }
  );

  return {
    message: "Party member removed from event"
  };
};

const handleAddPartyMemberToEvent = async (
  _id: string,
  payload: {
    event_id: string;
    member_id: string;
  }
) => {
  const res = await ItineraryModel.updateOne(
    {
      _id,
      "events._id": payload.event_id
    },
    {
      $push: {
        "events.$.party": payload.member_id
      }
    }
  );

  return {
    message: "Party member added to event"
  };
};

const handleEventRequest = async (_id: string, action) => {
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
