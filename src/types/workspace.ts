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

export type Owner = {
  username: string;
  mobile: string;
  email?: string;
  phoneNumber?: string;
  _id: string;
  role: {
    _id: string;
    name: string;
  };
  unit: {
    _id: string;
    name: string;
    code: string;
  };
};

export type Subscription = {
  status: "ACTIVE" | "CANCELED" | "EXPIRED" | "PAST_DUE";
  start_date: string;
  end_date: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  total_requests: number;
  included_requests_used: number;
  additional_requests: number;
  current_billing_amount: number;
  current_billing_currency: "EUR" | "USD" | "GBP" | "RIAL" | "BITCOIN";
  billing_frequency: "MONTHLY" | "YEARLY";
  trial_days: number;
  plan: {
    type: "FREE" | "PREMIUM" | "ENTERPRISE";
    name: string;
  };
};

export type Workspace = {
  _id: string;
  name_fa: string;
  name_en: string;
  slug: string;
  description: string;
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
  subscription: Subscription;
  owner: Owner;
  creator: Owner;
  createdAt: string;
  updatedAt: string;
  active_at: string;
};

export type WorkspaceCookieValues = {
  WORKSPACE?: string;
};
