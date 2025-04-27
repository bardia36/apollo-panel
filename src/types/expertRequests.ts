export type Request = {
  id: string;
  model: string;
  user: { name: string; mobile?: string; image?: string };
  status: RequestStatus;
  created: string;
  branch: string;
};

export type RequestStatus =
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
