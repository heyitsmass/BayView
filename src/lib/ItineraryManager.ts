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
      case "login":
        return (nextState = "registration");
      case "registration":
        return (nextState = "uninitialized");
      case "uninitialized":
        return (nextState = "initialized");
      case "initialized":
        return (nextState = "planning");
      case "planning":
        return (nextState = "reserving");
      case "reserving":
        return (nextState = "updating");
      case "updating":
        return (nextState = "updated");
      case "updated":
        return (nextState = "planned");
      case "planned":
        return (nextState = "booked");
      case "booked":
        return (nextState = "completed");
      case "completed":
        return (nextState = "archived");
      // there is no state after archived, refer to archived as next for archived.
      case "archived":
        return (nextState = "archived");
    }
  }

  private get_previous_state() {
    /** Gets the previous flow state */
    let previousState: FlowState;
    switch (this.get_state()) {
      // there is no state before login, refer to "login" as previous for "login
      case "login":
      case "registration":
        return (previousState = "login");
      case "uninitialized":
        return (previousState = "registration");
      case "initialized":
        return (previousState = "uninitialized");
      case "planning":
        return (previousState = "initialized");
      case "reserving":
        return (previousState = "planning");
      case "updating":
        return (previousState = "reserving");
      case "updated":
        return (previousState = "updating");
      case "planned":
        return (previousState = "updated");
      case "booked":
        return (previousState = "planned");
      case "completed":
        return (previousState = "booked");
      case "archived":
        return (previousState = "completed");
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
