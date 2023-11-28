import { ActionMethods } from "../Actions";
/** Info */
import map from "./map";
import directions from "./directions";
import weather from "./weather";
/** Updates */
import del from "./del";
import refresh from "./refresh";
/** Share */
import link from "./link";
import rss from "./rss";
import social from "./social";

/** Notify */
import facebook from "./facebook";
import discord from "./discord";
import twitter from "./twitter";
import email from "./email";
import sms from "./sms";
import slack from "./slack";

type ActionDialogProps = {
  readonly title: string;
  readonly description: string;
  readonly Component: (props?: any) => JSX.Element;
};

const dialogs: {
  [P in ActionMethods]: ActionDialogProps;
} = {
  map,
  directions,
  weather,
  del,
  refresh,
  link,
  rss,
  social,
  facebook,
  discord,
  twitter,
  email,
  sms,
  slack
};

export default dialogs;
