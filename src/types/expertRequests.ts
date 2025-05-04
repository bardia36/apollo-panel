import { NameEnFa } from "./common";

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
  _id: string;
  order_number: string;
  inspection_type: {
    name: string;
    logo: string;
    type: InspectionType;
    description: string;
  };
  owner: {
    image?: string;
    userName: string;
    phoneNumber?: string;
    email?: string;
  };
  tags?: [string];
  createdAt: string;
  inspection_data: {
    vehicle_brand?: NameEnFa;
    vehicle_model?: NameEnFa;
    vehicle_compony?: NameEnFa;
  };
  unit: {
    level: string;
    title: string;
    _id: string;
  };
  status: ExpertRequestStatus;
};

export type InspectionType =
  | "VEHICLE"
  | "PROPERTY"
  | "PERSONAL"
  | "LIABILITY"
  | "COMMERCIAL"
  | "SPECIALIZED"
  | "CYBER";

export type ExpertRequestStatus =
  | "DRAFT"
  | "PENDING"
  | "OPENED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "REVIEWED"
  | "ACCEPTED"
  | "REJECTED"
  | "FAILED"
  | "EXPIRED"
  | "CANCELED"
  | "ARCHIVED";

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
    icon: string;
  };
};
