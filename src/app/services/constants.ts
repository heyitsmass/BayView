export const SCOPES = {
  GUEST: {
    default: ["read.guestpage"],
    asString: ""
  },
  ADMIN: {
    default: ["admin.adminpage", "admin.guestpage", "admin.userpage"],
    asString: ""
  },
  USER: {
    default: ["read.userpage"],
    asString: ""
  }
};
