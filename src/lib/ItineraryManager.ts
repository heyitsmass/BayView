import Itineraries from "@/models/Itinerary";
import { IItinerary } from "@/types/Itinerary";
import { HydratedDocument } from "mongoose";

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

class UninitializedFlow implements State {
  type: FlowState = "uninitialized";
}

class InitializedFlow implements State {
  type: FlowState = "initialized";
}

class PlanningFlow implements State {
  type: FlowState = "planning";
}

class ReservingFlow implements State {
  type: FlowState = "reserving";
}

class UpdatingFlow implements State {
  type: FlowState = "updating";
}

class UpdatedFlow implements State {
  type: FlowState = "updated";
}

class PlannedFlow implements State {
  type: FlowState = "planned";
}

class BookedFlow implements State {
  type: FlowState = "booked";
}

class CompletedFlow implements State {
  type: FlowState = "completed";
}

class ArchivedFlow implements State {
  type: FlowState = "archived";
}


export class ItineraryFlow {
  private identity: IdentityState = "anonymous";
  private stage: FlowState = "uninitialized";
  private storage: StorageMethod = "local";
  private state: State = new LoginFlow();

  private user?: {
    authorization: string;
    username: string;
  };

  private constructor(user: HydratedDocument<{}>) {
    console.log("In the flow.");
  }

  public static findUserInDatabase(username: string) {
    /** find the user */

    console.log("Finding user...", username);

    const user = {} as HydratedDocument<{}>;
    console.log("Found user...");
    return new ItineraryFlow(user);
  }

  private get_next_state() {
    /** Gets the next flow state */
    let nextState: FlowState;
    switch (this.get_state()) {

      case "login": return nextState = "registration";
      case "registration": return nextState = "uninitialized";
      case "uninitialized": return nextState = "initialized";
      case "initialized": return nextState = "planning";
      case "planning": return nextState = "reserving";
      case "reserving": return nextState = "updating";
      case "updating": return nextState = "updated";
      case "updated": return nextState = "planned";
      case "planned": return nextState = "booked";
      case "booked": return nextState = "completed";
      case "completed": return nextState = "archived";
        // there is no state after archived, refer to archived as next for archived.
      case "archived": return nextState = "archived";
    }
  }

  private get_previous_state() {
    /** Gets the previous flow state */
    let previousState: FlowState;
    switch (this.get_state()) {
      // there is no state before login, refer to "login" as previous for "login
      case "login":
      case "registration": return previousState = "login";
      case "uninitialized": return previousState = "registration";
      case "initialized": return previousState = "uninitialized";
      case "planning": return previousState = "initialized";
      case "reserving": return previousState = "planning";
      case "updating": return previousState = "reserving";
      case "updated": return previousState = "updating";
      case "planned": return previousState = "updated";
      case "booked": return previousState = "planned";
      case "completed": return previousState = "booked";
      case "archived": return previousState = "completed";
    }
  }

  private visit_state(state: State) {
    /** Visits the state */
    this.state = state;
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
    if (!this.user) {
      console.log("There is currently no user set.");
      return "anonymous";
    }
    return this.identity;
  }

  private set_identity(
    identity: IdentityState,
    user?: { authorization: string; username: string }
  ) {
    /** Sets the current identity */
    // if user identity is to be set to anonymous, the current user
    // referance should be null.
    if (identity === "anonymous") {
      this.identity = identity;
      this.user = undefined;
      console.log("Identity set to anonymous. No user is is assigned.");
      return;
    } else {
      this.identity = identity;
    }

    // assuming user was authenticated and now must be set
    if (this.identity === "authenticated") {
      this.user = user;
      console.log(`User is set to: ${user}`);
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
    if (this.flow.get_state() == "login") {
      const itinerary = (await Itineraries.create(
        new Itineraries()
      )) as HydratedDocument<IItinerary>;
      console.log(
        "Created new itinerary:\n",
        itinerary.toJSON({ flattenObjectIds: true })
      );
    }
    // else, push info on doc to local cache
    else {
      //localStorage.setItem("CurrentFlow", newItinerary);
      console.log(
        "save to the local cache: still needs to be implemented properly"
      );
    }

    // state is changed to this itinerary
    console.log(
      "change state to be this itinerary: still needs to be implemented"
    );
    //this.flow.set_state();

    // context data is returned to the flow
    //this.flow./*something*/ = newItinerary.context
    console.log("Creation complete");
    console.log(
      "return required data from created entry to flow: still needs to be implemented"
    );
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

/** Itinerary class */
export class Itinerary extends EventManager {
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
