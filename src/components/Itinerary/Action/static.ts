import { Notifiers } from "@/lib/notifier";
import { InfoMethods, NotifyMethods, ShareMethods, UpdateMethods } from "@/types";
import {
  faArrowsRotate,
  faCar,
  faCloud,
  faEnvelope,
  faMapPin,
  faPhone,
  faRss,
  faShare,
  faShareNodes,
  faTrashCan
} from "@fortawesome/free-solid-svg-icons";

import {
  IconDefinition,
  faDiscord,
  faFacebook,
  faSlack,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";


export type ActionMethods =
  | InfoMethods
  | ShareMethods
  | UpdateMethods
  | NotifyMethods;

export type ActionsArr<T extends ActionMethods> = {
  type: T;
  icon: IconDefinition;
}[];

export type ActionDefinition<T extends ActionMethods = ActionMethods> = {
  labels: {
    lg: string;
    sm: string;
  };
  methods: ActionsArr<T>;
  className?: string;
};

const updateActions: ActionDefinition<UpdateMethods> = {
  labels: { lg: "Quick Updates", sm: "Updates" },
  methods: [
    { type: "del", icon: faTrashCan }
  ]
};

const informationActions: ActionDefinition<InfoMethods> = {
  labels: { lg: "Get Infomation!", sm: "Info" },
  methods: [
    { type: "map", icon: faMapPin },
    { type: "directions", icon: faCar },
    { type: "weather", icon: faCloud }
  ]
};

const shareActions: ActionDefinition<ShareMethods> = {
  labels: { lg: "Share Your Trip!", sm: "Share!" },
  methods: [
    { type: "rss", icon: faRss },
    { type: "social", icon: faShareNodes },
    { type: "link", icon: faShare }
  ],
  className: "min-w-max"
};

const notificationMethods = [
  { type: "email", icon: faEnvelope },
  { type: "sms", icon: faPhone },
  { type: "discord", icon: faDiscord },
  { type: "twitter", icon: faTwitter }
];

const getNotificationActions = ({
  notify
}: {
  notify: {
    [P in Notifiers]: boolean;
  };
}): ActionDefinition<Partial<Notifiers>> => {
  return {
    labels: { lg: "Get Notified!", sm: "Notify!" },
    methods: notificationMethods.filter(
      ({ type }) => notify[type]
    ) as ActionsArr<Partial<Notifiers>>
  };
};

export const getAvailableActions = ({
  notify
}: {
  notify: {
    [P in Notifiers]: boolean;
  };
}): ActionDefinition[] => {
  return [
    informationActions,
    getNotificationActions({ notify }),
    updateActions,
    shareActions
  ];
};
