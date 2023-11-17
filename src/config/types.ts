export type DiscordResponse = {
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
  avatar_decoration_data: {
    asset: string;
    sku_id: string;
  };
  banner_color: string;
  mfa_enabled: false;
  locale: string;
  email: string;
  verified: boolean;
};

export type FacebookResponse = {
  id: string;
  age_range: {
    min: 21;
  };
  first_name: string;
  last_name: string;
  email: string;
  picture: {
    data: {
      url: string;
    };
  };
};

export type GoogleResponse = {
  sub: string;
  /** <First> <middle?> <last> */
  name: string;
  /** First name */
  given_name: string;
  /** Last name */
  family_name: string;
  /** Picture url */
  picture: string;
  /** Email */
  email: string;
  /** Email verified */
  email_verified: boolean;
  /** Locale language */
  locale: string;
  /** Host Domain */
  hd: string;
};

type GithubEmail = {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: "private" | "public" | null;
};
type GithubPlan = {
  name: string;
  space: number;
  collaborators: number;
  private_repos: number;
};
type GithubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  hireable: boolean;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: GithubPlan;
};

export type GithubResponse = {
  emails: GithubEmail[];
  user: GithubUser;
};
