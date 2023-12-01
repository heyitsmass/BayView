/** Info */
import directions from "./directions";
import map from "./map";
import weather from "./weather";
/** Updates */
import del from "./del";
import refresh from "./refresh";
/** Share */
import link from "./link";
import rss from "./rss";
import social from "./social";

/** Notify */

import discord from "./discord";
import email from "./email";
import facebook from "./facebook";
import slack from "./slack";
import sms from "./sms";
import twitter from "./twitter";
import { ActionMethods } from "../Action/static";

const dialogs: {
  [P in ActionMethods]: {
    readonly title: string;
    readonly description: string;
    readonly Component: (props?: any) => JSX.Element | null;
  };
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
