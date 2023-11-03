import { IUser } from "./User";
import mongoose, { HydratedDocument, Schema } from "mongoose";
import Itineraries from "@/models/Itinerary";
import { IItinerary } from "@/types/Itinerary";

type IdentityState = "anonymous" | "registered" | "authenticated";
type FlowState =
  | "login"
  | "registration"
  | "uninitialized"
  | "initialized"
  | "planning"
  | "reserving"
  | "updating"
  | "updated"
  | "planned"
  | "booked"
  | "completed"
  | "archived";
type StorageMethod = "local" | "cloud" | "database" | "server" | "file";

interface State {
  type: FlowState;
}

class LoginFlow implements State {
  type: FlowState = "login";
}

class RegistrationFlow implements State {
  type: FlowState = "registration";
}

export class ItineraryFlow {
  private identity: IdentityState = "anonymous";
  private stage: FlowState = "uninitialized";
  private storage: StorageMethod = "local";
  private state: State = new LoginFlow();

  private user: {
    authorization: string;
    username: string;
  } | null = null;

  private constructor(user: HydratedDocument<IUser>) {
    console.log("In the flow.");
  }

  public static findUserInDatabase(username: string) {
    /** find the user */

    console.log("Finding user...", username);

    const user = {} as HydratedDocument<IUser>;
    console.log("Found user...");
    return new ItineraryFlow(user);
  }

  private get_next_state() {
    /** Gets the next flow state */
  }

  private get_previous_state() {
    /** Gets the previous flow state */
  }

  private visit_state(state: State) {
    /** Visits the state */
  }

  public get_state() {
    /** Gets the current state */
    return this.state.type; 
  }

  public set_state(state: State) {
    /** Sets the current state */
    return this.visit_state(state);
  }

  private get_identity() {
    /** Gets the current identity */
    if(this.user ==  null || identity == "anonymous"){
      console.log("There is currently no user set.");
      return
    }
    return this.user;
  }

  private set_identity(
    identity: IdentityState,
    user?: { authorization: string; username: string }
  ) {
    /** Sets the current identity */
    // if user identity is to be set to anonymous, the current user
    // referance should be null.
    if(identity == "anonymous" ) {
      this.identity = identity;
      this.user = null;
      console.log("Identity set to anonymous. No user is is assigned.")
      return;
    } else {
      this.identity = identity;
    }


    // assuming user was authenticated and now must be set
    if (this.identity == "authenticated") {
      this.user = user;
      console.log(`User is set to: ${ItineraryFlow.user}`);
      return;
    }

  }

  private get_storage() {
    /** Gets the current storage method */
  }

  private set_storage(storage: StorageMethod) {
    /** Sets the current storage method */
  }
}

export class ItineraryManager {
  public static itineraries: Itinerary[];
  public flow;

  private constructor(flow: ItineraryFlow) {
    console.log("in im constructor");
    this.flow = flow;
  }

  public static getItineraryByUser(username: string) {
    console.log("Hello from im: ", username);

    const flow = ItineraryFlow.findUserInDatabase(username);

    console.log("Finished creating flow.");
    return new ItineraryManager(flow);
  }

  public loadItineraries() {
    /** Fetches the itineraries from the database. */
  }
  public saveItineraries() {
    /** Flushes the database with the current list of itineraries */
  }

  public addItinerary(itinerary: Itinerary) {
    /** Adds an itinerary to the database */
  }

  public removeItinerary(itinerary: Itinerary) {
    /** Removes an itinerary from the current storage method */
  }

  public modifyItinerary(itinerary: Itinerary) {}

  public getItineraries() {
    /** Returns the current list of itineraries */
  }

  public getItinerary(itinerary: Itinerary) {
    /** Locates the itinerary in the cache*/
  }

  // TODOs:
  // testing needed
  // change start and end dates to be accurate to
  //            the list of events.
  // save itinerary to local cache in the event that state type is not login
  // change the current flow state to be that of this new created itinerary
  //
  public async createItinerary() {

    // on login flow
    // push new doc to database
    if(this.flow.get_state() == "login"){
        const itinerary = await Itineraries.create(new Itineraries()) as HydratedDocument<IItinerary>
        console.log("Created new itinerary:\n", itinerary.toJSON({flattenObjectIds:true}))
    }
    // else, push info on doc to local cache
    else {
      //localStorage.setItem("CurrentFlow", newItinerary);
      console.log("save to the local cache: still needs to be implemented properly");
    }

    // state is changed to this itinerary
    console.log("change state to be this itinerary: still needs to be implemented")
    //this.flow.set_state();

    // context data is returned to the flow
    //this.flow./*something*/ = newItinerary.context
    console.log("Creation complete");
    console.log("return required data from created entry to flow: still needs to be implemented");


  }
  public initializeFlow() {
    this.flow.set_state({ type: "login" });
    return this.flow.get_state(); //login
  }
}

/** Event Manager class (Event Context Manager)*/
export class EventManager {
  /** Context manager functions */
  private event!: Event; //state
  private events!: Event[]; //current events in the manager
  private $history!: Event[]; //history of events in the manager
  private transition_to_next_event() {
    /** Transitions current state to the next event */
    const state = this.events.pop();
    if (!state) return;
    this.$history.push(this.event);
    return (this.event = state);
  }

  private switch_to_event(event: Event) {
    /** Switches the current event to the specified event */
    this.$history.push(this.event);
    return (this.event = event);
  }

  private transition_to_previous_event() {
    /** Transitions current state to the previous event */
    const state = this.$history.pop();
    if (!state) return;
    return (this.event = state);
  }
}

export class Group extends EventManager {
  public get_current_event() {
    /** Returns the currently active event */
  }

  public get_next_event() {
    /** Returns the next event */
  }

  public get_previous_event() {
    /** Returns the previous event */
  }

  public get_events() {
    /** Returns the events in the group */
  }

  public add_event(event: Event) {
    /** Adds an event to the group */
  }

  public remove_event(event: Event) {
    /** Removes an event from the group */
  }

  public modify_event(event: Event) {
    /** Modifies an event in the group */
  }

  public get_start_time() {
    /** Returns the start time of the current event */
  }

  public get_end_time() {
    /** Returns the end time of the current event */
  }

  public get_location() {
    /** Retusn the location of the current event */
  }

  public get_transportation() {
    /**Returns the transportation attatched to the event */
  }
  public get_transportation_url() {
    /**Returns the current transportation urls attached to the evet */
  }
}

/** Itinerary class */
export class Itinerary extends Group {}

/** Coordinated Interiary class */
export class CoordinatedItinerary extends Itinerary {
  public get_coordinators() {
    /** Returns the coordinators in the itinerary */
  }

  public add_coordinator() {
    /** Adds a coordinator to the itinerary */
  }

  public get_groups() {
    /** Returns the groups in the itinerary */
  }

  public add_group(group: Group) {
    /** Adds a group to the itinerary */
  }

  public remove_group(group: Group) {
    /** Removes a group from the itinerary */
  }

  public modify_group(group: Group) {
    /** Modifies a group in the itinerary */
  }
}

/** Notifier interface for the Notifiers */
interface Notifier {
  /** Sends a notification to the user */
  send_notification(): void;
}

class SMSNotifier implements Notifier {
  /** SMS Notifier implementation */
  public send_notification() {
    /** Sends a notification to the users phone */
  }
}

class EmailNotifier implements Notifier {
  /** Email Notifier implementation */
  public send_notification() {
    /** Sends a notification to the users email */
  }
}

class TwitterNotifier implements Notifier {
  /** Twitter Notifier implementation */
  public send_notification() {
    /** Sends a notification to the users twitter account */
  }
}

type DiscordHeaderType = {
  "Content-Type": "application/json",
  Authorization: string;
}

type DiscordDMChannel = {
  id: string;
  type: number;
  last_message_id: string| null;
  flags: number;
  recipients: DiscordDMRecipient[];
}

type DiscordDMRecipient = {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  premium_type: number;
  flags: number;
  banner: string;
  accent_color: number;
  global_name: string;
  avatar_decoration_data: [Object];
  banner_color: string;
}
export class DiscordNotifier implements Notifier {
  /** Discord Notifier implementation */


  private static DISCORD_API = 'https://discord.com/api/v10';
  private static HEADERS:DiscordHeaderType = {
    "Content-Type": "application/json",
    Authorization: `Bot ${process.env.DISCORD_API_TOKEN}`
  };
  private channel_id: number | string;
  private recipient_id: number | string;

  public send_notification() {
    /** Sends a notification to the users discord account */

  }

  private constructor(recipient_id: number | string, channel_id:number | string) {
    this.recipient_id = recipient_id;
    this.channel_id = channel_id;
  }
  public async send_dm(content: string){
    await fetch(
        `${DiscordNotifier.DISCORD_API}/channels/${this.channel_id}/messages`,
        {
          method: "POST",
          headers: DiscordNotifier.HEADERS,
          body: JSON.stringify({ content })
        }
    );
  }

  public static async send_dm(
      recipient_id: number | string,
      content: string
  ) {
    //Create the endpoint
    const endpoint = `${this.DISCORD_API}/users/@me/channels`;

    const channel_id = await fetch(endpoint, {
      method: "POST",
      headers: this.HEADERS,
      body: JSON.stringify({ recipient_id })
    }) // Open the DM channel with recipient
        .then(async (res) => {
          const channel: DiscordDMChannel = await res.json();

           await fetch(
              `${this.DISCORD_API}/channels/${channel.id}/messages`,
              {
                method: "POST",
                headers: this.HEADERS,
                body: JSON.stringify({ content })
              }
          ); // Send the message to recipient

          return channel.id
        })
        .catch((err) => console.log((err as Error).message));
    if(!channel_id){
      throw new Error("Please try again.");
    }

    return new DiscordNotifier(recipient_id, channel_id);
  }

}

class FacebookNotifier implements Notifier {
  /** Facebook Notifier implementation */
  public send_notification() {
    /** Sends a notification to the users facebook account */
  }
}

class SlackNotifier implements Notifier {
  /** Slack Notifier implementation */
  public send_notification() {
    /** Sends a notification to the users slack account */
  }
}

interface Person {
  /** Generic person representation. */
  name: {
    first: string;
    last: string;
    middle?: string;
    username?: string;
  };
  email: string;
  phone: string;
  discord: {
    username: string;
    id: number | string;
  };
  /** Gets the name as a string */
  get_name: () => string;
  add_notifier: (notifier: Notifier) => void;
}

interface IEvent {
  /** Gets the reseration link associated with the event */
  get_url: () => string;
}

/** Event interface for the Events */
abstract class Event {
  public add_person(user: Person) {
    /** Adds a person to the event */
  }

  public get_persons() {
    /** Returns the persons in the event */
  }

  public remove_person(user: Person) {
    /** Removes a person from the event */
  }

  public notify_persons() {
    /** Notifies all persons in the event */
  }

  public notify_person(user: Person) {
    /** Notifies a person in the event */
  }

  public get_start_time() {
    /** Returns the start time of the event */
  }
  public get_end_time() {
    /** Returns the end time of the event */
  }

  public get_location() {
    /** Returns the location of the event */
  }

  public get_transportation() {
    /** Returns the transportation for the event */
  }

  public get_event() {
    /** Returns the event */
  }
}
export class Hotel extends Event implements IEvent {
  /** Hotel class for the Events */

  public get_url() {
    /** Returns the reservation link for the hotel */
    return "";
  }
}

export class Restaurant extends Event implements IEvent {
  /** Restaurant class for the Events */

  public get_url() {
    /** Returns the reservation link for the restaurant */
    return "";
  }
}

export class Activity extends Event implements IEvent {
  /** Activity class for the Events */

  public get_url() {
    /** Returns the reservation link for the activity */
    return "";
  }
}

export class Flight extends Event implements IEvent {
  /** Flight class for the Events */

  public get_url() {
    /** Returns the reservation link for the flight */
    return "";
  }
}

export class Ticket extends Event implements IEvent {
  /** Ticket class for the Events */

  public get_url() {
    /** Returns the purchase link for the ticket */
    return "";
  }
}

export class Pass extends Event implements IEvent {
  /** Pass class for the Events */

  public get_url() {
    /** Returns the purchase link for the park pass */
    return "";
  }
}

/** Transportation interface for the Events */
interface Transportation extends IEvent {}

export class Uber implements Transportation {
  /** Uber class for the Events */

  public get_url() {
    /** Returns the reservation link for the uber */
    return "";
  }
}

export class Lyft implements Transportation {
  /** Lyft class for the Events */

  public get_url() {
    /** Returns the reservation link for the lyft */
    return "";
  }
}
