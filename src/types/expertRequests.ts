import { CommonListResponse, NameEnFa } from "./common";
import { Template, TemplateField, TemplateFieldType } from "./templates";

export type ExpertRequestResponse = {
  docs: ExpertRequestInfo[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  page: number;
  totalDocs: number;
  totalPage: number;
};

export type ExpertRequestInfo = {
  status: ExpertRequestStatus;
  inspection_format: {
    name: string;
    logo: string;
    description: string;
  };
  order_number: string;
  owner: {
    image?: string;
    userName: string;
    phoneNumber?: string;
    email?: string;
  };
  lead_specialist: {
    image?: string;
    userName: string;
    phoneNumber?: string;
    email?: string;
    _id?: string;
  };
  unit: {
    title: string;
    level: {
      name: string;
      level_number: number;
    };
  };
  tags?: string[];
  createdAt: string;
  inspection_data: {
    vehicle_brand?: NameEnFa;
    vehicle_model?: NameEnFa;
    vehicle_company?: NameEnFa;
  };
};

export type ExpertRequestDetail = ExpertRequestInfo & {
  _id: string;
  key: string;
  price: number;
  documents?: {
    img?: RequestCommonInfo[];
    video?: RequestCommonInfo[];
  };
  car_info: {
    img?: RequestCommonInfo[];
    sequence: RequestCommonInfo[];
  };
  required_fields: TemplateField[];
  // request_log
  // locations
  template_fields_count: number;
  template_id: Omit<Template, "_id">;
  // previous_inspection;
  // reviewers
  inspection_data: ExpertRequestInfo["inspection_data"] & {
    color?: {
      name: string;
      code: string;
      color: string;
    };
    // vehicle_fuel;
    // vehicle_category
    // vehicle_usage;
    // license_plate_number
    // motor_code
    // chassis_number
    vin?: string;
    // fanavaran_vin
  };
};

export type RequestCommonInfo = {
  name: string;
  title: string;
  path: string;
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

export type InspectionFormatInfo = CommonListResponse<InspectionDataItem>;

export type InspectionDataItem = {
  key: string;
  label: string;
  logo: string;
  description: string;
};

export type VehicleCategories = CommonListResponse<VehicleCategory>;

export type VehicleCategory = {
  name: string;
  key: string;
  label: string;
};

export type VehicleBrands = CommonListResponse<VehicleBrand>;

export type VehicleBrand = {
  key: string;
  label: string;
};

export type VehicleModels = CommonListResponse<VehicleModel>;

export type VehicleModel = {
  key: string;
  name_en: string;
  label: string;
};

export type Colors = CommonListResponse<Color>;

export type Color = {
  key: string;
  label: string;
};

export type RegisterRequestStep = "INFO" | "LINK" | "FINAL";

export type CreateRequestInfoBody = {
  username: string;
  mobile?: string;
  email?: string;
  order_number?: string;
  inspection_format?: string;
  inspection_data?: {
    // inspection_data hard coded for now for handling vehicle data, in the future it will be dynamic based on the inspection format
    vehicle_brand?: string;
    vehicle_model?: string;
    vehicle_company?: string;
    vin?: string;
    color?: string;
  };
};

export type UpdateRequestLinkBody = {
  template_id: string;
  fields: Pick<TemplateField, "title" | "type">[];
};

export type UpdateRequestFinalBody = {
  send_sms?: boolean;
  send_email?: boolean;
  mobile?: string;
  email?: string;
  lead_specialist?: string;
  tags?: (string | undefined)[];
  forwarding_time?: string;
};

export type RegisterRequestBody = (
  | CreateRequestInfoBody
  | UpdateRequestLinkBody
  | UpdateRequestFinalBody
) & {
  step: RegisterRequestStep;
};

export type RegisterRequestResponse = {
  _id: string;
  username: string;
  mobile: string;
  email: string;
  order_number: string;
  inspection_format: {
    name: string;
    _id: string;
  };
  template_id: {
    fields: TemplateField[];
    name: string;
    _id: string;
  };
  required_fields: [
    {
      type: TemplateFieldType;
      title: string;
    },
  ];
  created_at: string;
  updated_at: string;
  lead_specialist: {
    image?: string;
    userName: string;
    phoneNumber?: string;
    email?: string;
    _id?: string;
  };
  owner: string;
  status: ExpertRequestStatus;
  step: RegisterRequestStep;
  unit: string;
  inspection_data: {
    vin: string;
    vehicle_brand: {
      name_en: string;
      name_fa: string;
      _id: string;
    };
    vehicle_model: {
      name_en: string;
      name_fa: string;
      _id: string;
    };
    vehicle_company: {
      name: string;
      name_local: string;
      _id: string;
    };
    color: {
      name: string;
      _id: string;
    };
  };
};
