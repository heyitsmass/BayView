import { GetDirectionsPayload, getDirections } from "./getDirections";
import { GetMapPayload, getMap } from "./getMap";
import { GetWeatherPayload, getWeather } from "./getWeather";

import { ShareRssPayload, shareRss } from "./shareRss";
import { ShareLinkPayload, shareLink } from "./shareLink";
import { ShareNodesPayload, shareNodes } from "./shareNodes";

import { RefreshEventPayload, handleRefresh } from "./refreshEvent";
import { DeleteEventPayload, handleDeleteEvent } from "./deleteEvent";
import {
  UpgradeEventRequestPayload,
  handleUpgradeEventRequest,
} from "./requestEventUpgrade";
import { Notifiers } from "@/lib/notifier";
import { NotifierPayload } from "@/lib/notifier/Handler";

export type RequestActions =
  | ({
      type: "info";
    } & (
      | {
          mode: "directions";
          payload: GetDirectionsPayload;
        }
      | {
          mode: "map";
          payload: GetMapPayload;
        }
      | {
          mode: "weather";
          payload: GetWeatherPayload;
        }
    ))
  | ({
      type: "notify";
    } & {
      mode: Notifiers;
      payload: NotifierPayload;
    })
  | ({
      type: "share";
    } & (
      | {
          mode: "rss";
          payload: ShareRssPayload;
        }
      | {
          mode: "nodes";
          payload: ShareNodesPayload;
        }
      | {
          mode: "link";
          payload: ShareLinkPayload;
        }
    ))
  | ({
      type: "update";
    } & (
      | {
          mode: "refresh";
          payload: RefreshEventPayload;
        }
      | {
          mode: "delete";
          payload: DeleteEventPayload;
        }
    ))
  | {
      type: "upgrade";
      mode: "event";
      payload: UpgradeEventRequestPayload;
    };

export {
  getDirections,
  getMap,
  getWeather,
  shareRss,
  shareLink,
  shareNodes,
  handleRefresh,
  handleDeleteEvent,
  handleUpgradeEventRequest,
};
