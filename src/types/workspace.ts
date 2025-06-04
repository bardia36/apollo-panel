export type StatusOption = { uid: string; label: string };

export type StatusesMap = {
  [key in WorkspaceStatus]: {
    fadedBg: string;
    bg: string;
    text: string;
    label: string;
    icon: string;
  };
};

export type WorkspaceStatus =
  | "ACTIVE"
  | "TRIAL"
  | "SUSPENDED"
  | "CANCELED"
  | "EXPIRED"
  | "DELETED"
  | "ARCHIVED";

export type Workspace = {
  _id: string;
  name: string;
  slug: string;
  logo: string;
  settings: {
    timezone: string;
    language: string;
    notification: {
      email: boolean;
      slack: boolean;
    };
  };
  status: WorkspaceStatus;
  mobile: string;
  email: string;
  metadata: {
    [key: string]: any;
  };
  subscription: {
    status: "ACTIVE" | "CANCELED" | "EXPIRED" | "PAST_DUE";
    plan: {
      type: "FREE" | "PREMIUM" | "ENTERPRISE";
      name: string;
    };
  };
  createdAt: string;
  updatedAt: string;
  active_at: string;
};
