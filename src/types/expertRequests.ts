export type Request = {
  id: string;
  model: string;
  user: { name: string; mobile?: string; image?: string };
  status: RequestStatus;
  created: string;
  branch: string;
  createdAt: string;
  updatedAt: string;
};

export type RequestStatus = "active" | "paused" | "vacation";
