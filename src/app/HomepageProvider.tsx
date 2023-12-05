"use client";

import {
  HomepageAction,
  HomepageContext,
  HomepageDispatch,
  HomepageManager,
  THomepageContext
} from "@/context";
import { useReducer } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import Handler from "./Handler";
import { usePopupDispatch } from "@/context/popup";

type HomepageProviderProps = {
  value: THomepageContext;
  children?: React.ReactNode;
};

export default function Provider({ ...props }: HomepageProviderProps) {
  const { value, children } = props;

  const [ctx, dispatch] = useReducer(Reducer, value);
  const createPopup = usePopupDispatch();

  const Manager = async (action: HomepageAction) => {
    const { _id } = ctx.user;

    const { statusCode, body } = await Handler(_id, action);

    if (statusCode !== 200) {
      return createPopup({
        variant: "error",
        message: body.message
      });
    } else {
      switch (action.type) {
        case "event":
          if (action.mode === "refresh") {
            action.payload = body.event;
          }
          break;
        default:
          break;
      }

      createPopup({
        variant: "success",
        message: body.message
      });
    }

    return dispatch(action);
  };

  return (
    <HomepageContext.Provider value={ctx}>
      <HomepageDispatch.Provider value={dispatch}>
        <HomepageManager.Provider value={Manager}>
          <SessionAuth>{children}</SessionAuth>
        </HomepageManager.Provider>
      </HomepageDispatch.Provider>
    </HomepageContext.Provider>
  );
}

export const Reducer = (
  subject: THomepageContext,
  action: HomepageAction
) => {
  switch (action.type) {
    case "party_member":
      switch (action.mode) {
        case "delete":
          return {
            ...subject,
            user: {
              ...subject.user,
              metadata: {
                ...subject.user.metadata,
                party: {
                  ...subject.user.metadata.party,
                  members: subject.user.metadata.party.members.filter(
                    (member) => member._id !== action.payload.member_id
                  )
                }
              }
            },
            itinerary: {
              ...subject.itinerary,
              events: subject.itinerary.events.map((event) => {
                return {
                  ...event,
                  party: event.party.filter(
                    (member) => member !== action.payload.member_id
                  )
                };
              })
            }
          };
      }

    case "event_party":
      switch (action.mode) {
        case "add":
          return {
            ...subject,
            itinerary: {
              ...subject.itinerary,
              events: subject.itinerary.events.map((event) => {
                if (event._id === action.payload.event_id) {
                  return {
                    ...event,
                    party: [...event.party, action.payload.member_id]
                  };
                }
                return event;
              })
            }
          };
        case "remove":
          return {
            ...subject,
            itinerary: {
              ...subject.itinerary,
              events: subject.itinerary.events.map((event) => {
                if (event._id === action.payload.event_id) {
                  return {
                    ...event,
                    party: event.party.filter(
                      (member) => member !== action.payload.member_id
                    )
                  };
                }
                return event;
              })
            }
          };
        default:
          return subject;
      }
    case "itinerary":
      switch (action.mode) {
        case "update":
          return {
            ...subject,
            itinerary: {
              ...subject.itinerary,
              ...action.payload
            }
          };
        default:
          return subject;
      }

    case "event":
      const { itinerary } = subject;

      switch (action.mode) {
        case "refresh":
          return {
            ...subject,
            itinerary: {
              ...itinerary,
              events: [
                ...itinerary.events.filter(
                  (event) => event._id !== action.payload._id
                ),
                action.payload
              ]
            }
          };
        case "add":
          return {
            ...subject,
            itinerary: {
              ...itinerary,
              events: [...itinerary.events, action.payload]
            }
          };
        case "delete":
          return {
            ...subject,
            itinerary: {
              ...itinerary,
              events: [
                ...itinerary.events.filter(
                  (event) => event._id !== action.payload._id
                )
              ]
            }
          };
        default:
          return subject;
      }
  }

  return subject;
};
