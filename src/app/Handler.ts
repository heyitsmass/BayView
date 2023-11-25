"use server";

import { HomepageAction } from "@/context";
import { handleItineraryActionRequest } from "@/handlers/Itinerary/actions";

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
  action: HomepageAction
): Promise<SuccessResponse | ErrorResponse> {
  let body: HandlerResponse<any> = {
    statusCode: 400,
    body: {
      message: "Bad Request",
    },
  };

  try {
    switch (action.type) {
      case "itinerary":
        if (action.mode === "actions") {
          body = await handleItineraryActionRequest(action.payload);
        }
        break;
    }
  } catch (err) {
    console.error(err);
    body = {
      statusCode: 500,
      body: {
        message: "Internal Server Error",
      },
    };
  }

  return {
    statusCode: 200,
    body,
  };
}
