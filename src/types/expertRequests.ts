export type ExpertRequestResponse = {
  docs: ExpertRequest[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  page: number;
  totalDocs: number;
  totalPage: number;
};

export type ExpertRequest = {
  id: string;
  model: { name: string; brand: string };
  user: { name: string; mobile?: string; image?: string };
  status: ExpertRequestStatus;
  created: string;
  branch: string;
};

export type ExpertRequestStatus =
  | "DRAFT"
  | "PENDING"
  | "OPENED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REVIEWED"
  | "ACCEPTED"
  | "REJECTED"
  | "EXPIRED"
  | "FAILED"
  | "ARCHIVED"
  | "CANCELED";

export type TableColumns = {
  name: string;
  uid: string;
  sortable?: boolean;
  label?: string;
}[];

export type StatusOptions = { uid: string; label: string }[];

export type StatusesMap = {
  [key in ExpertRequestStatus]: {
    bg: string;
    text: string;
    label: string;
  };
};
