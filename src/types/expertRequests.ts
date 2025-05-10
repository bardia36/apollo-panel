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

export type InspectionFormatParams = {
  inspection_category_id?: string;
};

export type InspectionFormatInfo = {
  items: InspectionDataItem[];
  count: number;
};

export type InspectionDataItem = {
  key: string;
  label: string;
  logo: string;
  description: string;
};

export type CreateRequestBody = {
  username: string;
  mobile: string;
  email: string;
  order_number: string;
  inspection_format: string;
  inspection_data: {
    // inspection_data hard coded for now for handling vehicle data, in the future it will be dynamic based on the inspection format
    vehicle_brand: string;
    vehicle_model: string;
    vehicle_compony: string;
    vin: string;
    color: string;
  };
};

export type VehicleCategories = {
  items: VehicleCategory[];
  count: number;
};

export type VehicleCategory = {
  name: string;
  key: string;
  label: string;
};

export type VehicleBrands = {
  items: VehicleBrand[];
  count: number;
};

export type VehicleBrand = {
  key: string;
  label: string;
};

export type VehicleModels = {
  items: VehicleModel[];
  count: number;
};

export type VehicleModel = {
  key: string;
  name_en: string;
  label: string;
};


export type Colors = {
  items: Color[];
  count: number;
};

export type Color = {
  key: string;
  label: string;
};
