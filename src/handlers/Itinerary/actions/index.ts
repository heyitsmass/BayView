"use server";
import { handleNotifierCall } from "@/lib/notifier/Handler";
import {
  RequestActions,
  getDirections,
  getMap,
  getWeather,
  handleDeleteEvent,
  handleRefresh,
  handleUpgradeEventRequest,
  shareLink,
  shareNodes,
  shareRss,
} from "./helpers";

export const handleItineraryActionRequest = async ({
  ...props
}: RequestActions): Promise<any> => {
  const { type, mode, payload } = props;
  switch (type) {
    case "info":
      switch (mode) {
        case "directions":
          return getDirections(payload);
        case "map":
          return getMap(payload);
        case "weather":
          return getWeather(payload);
      }
    case "notify":
      return handleNotifierCall(payload);
    case "share":
      switch (mode) {
        case "rss":
          return shareRss(payload);
        case "nodes":
          return shareNodes(payload);
        case "link":
          return shareLink(payload);
      }
    case "update":
      switch (mode) {
        case "refresh":
          return handleRefresh(payload);
        case "delete":
          return handleDeleteEvent(payload);
      }
    case "upgrade":
      switch (mode) {
        case "event":
          return handleUpgradeEventRequest(payload);
      }
  }
};
