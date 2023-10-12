import { Status } from "discord.js";
import { HTTPResponse } from "./http";

type ReadableStatus =
  | "Ready"
  | "Connecting"
  | "Reconnecting"
  | "Idle"
  | "Nearly"
  | "Disconnected"
  | "WaitingForGuilds"
  | "Identifying"
  | "Resuming";

export enum TestMap {
  "Ready",
  "Connecting",
  "Reconnecting",
  "Idle",
  "Nearly",
  "Disconnected",
  "WaitingForGuilds",
  "Identifying",
  "Resuming"
}

export type StatusResponse = HTTPResponse<{
  code: Status;
  status: ReadableStatus
}>;
