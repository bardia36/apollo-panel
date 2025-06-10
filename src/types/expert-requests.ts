import { CommonListResponse, NameEnFa } from "./common";
import { Template, TemplateField } from "./templates";

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
  _id: string;
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
    level: UnitLevel;
  };
  tags?: string[];
  createdAt: string;
  inspection_data: {
    vehicle_brand?: NameEnFa;
    vehicle_model?: NameEnFa;
    vehicle_company?: NameEnFa;
  };
};

export type ExpertRequestDetail = {
  _id: string;
  status: ExpertRequestStatus;
  req_id: string;
  order_number: string;
  tags: string[];
  unit: {
    title: string;
    level: UnitLevel;
    parent: {
      title: string;
      level: UnitLevel;
    };
  };
  key: string;
  price: number;
  request_log: {
    admin: {
      userName: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    };
    operation: string;
    browser: string;
    os: string;
    platform: string;
    source: string;
    ip: string;
    beforeStatus: ExpertRequestStatus;
    status: ExpertRequestStatus;
    createdAt: string;
    updatedAt: string;
  }[];
  last_location: {
    lat: string;
    lng: string;
    address: string;
    createdAt: string;
    updatedAt: string;
  };
  locations: {
    lat: string;
    lng: string;
    address: string;
    createdAt: string;
    updatedAt: string;
  }[];
  template_id: Omit<Template, "fields">;
  previous_inspection: string;
  previous_inspections: [
    {
      inspection_request_id: string;
      createdAt: string;
      updatedAt: string;
    },
  ];
  lead_specialist: {
    email: string;
    phoneNumber: string;
    unit: {
      level: UnitLevel;
      title: string;
      _id: string;
    };
    userName: string;
    _id: string;
  };
  createdAt: string;
  inspection_format: {
    _id: string;
    name: string;
    type: "PRE_INSURANCE_BODY_INSPECTION";
  };
  video: string[];
  gallery: TemplateField[]; // fields and images
  owner: {
    userName: string;
    email: string;
    phoneNumber: string;
    _id: string;
  };
  reviewers: {
    owner: {
      userName: string;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    };
    unit: {
      title: string;
      level: UnitLevel;
    };
  }[];
  status_history: {
    admin: string;
    createdAt: string;
    description: string;
    status: ExpertRequestStatus;
    updatedAt: string;
  }[];
  inspection_data: {
    vehicle_brand?: NameEnFa;
    vehicle_model?: NameEnFa;
    vehicle_company?: NameEnFa & { _id: string };
    color: {
      name: string;
      code: string;
      color: string;
    };
    vehicle_fuel: {
      name: string;
      fuelType: FuelType;
      unit: string;
    };
    vehicle_category: {
      name: string;
      code: string;
      description: string;
    };
    vehicle_usage: {
      name: string;
      code: string;
      description: string;
    };
    license_plate_number: LicensePlateNumber;
    motor_code: string;
    chassis_number: string;
    vin: string;
    fanavaran_vin: string;
  };
};

export type UnitLevel = {
  _id?: string;
  name: string;
  level_number: number;
};

export type LicensePlateNumber = {
  left_number: string;
  right_number: string;
  letter: string;
  province_code: string;
};

export type FuelType =
  | "GASOLINE"
  | "DIESEL"
  | "LPG"
  | "CNG"
  | "ELECTRIC"
  | "HYBRID";

export type RequestCommonInfo = {
  name: string;
  title: string;
  path: string;
  _id: string;
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

export type StatusesMap = {
  [key in ExpertRequestStatus]: {
    fadedBg: string;
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
  workspace_id?: string;
};

export type RequiredFields = {
  type: "IMAGE" | "FILE" | "OTHER"; // OTHER is for ui usages;
  title: string;
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
  required_fields: RequiredFields[];
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

export type ExportReportParams = {
  book_type: "xlsx" | "csv";
  status: string;
  from_date: string;
  to_date: string;
  inspection_format?: string;
};

export type GetRequestsParams = {
  id?: string;
  status?: ExpertRequestStatus;
  order_number?: string;
  reference_id?: string;
  key?: string;
  is_archive?: boolean;
  price?: number;
  keyword?: string;
  page?: number;
  limit?: number;
  sortValue?: "1" | "-1";
  sortColumn?: string;
  inspection_format?: "PRE_INSURANCE_BODY_INSPECTION";
};

export type RequestsSetting = {
  expiration_time?: SettingExpirationTime;
  photo_deadline?: SettingPhotoDeadline;
  random_picture?: boolean;
  more_fields?: {
    title: string;
    type: "INPUT" | "SELECT" | "CHECKBOX" | "RADIO" | "DATE" | "TIME";
  }[];
};

export type SettingExpirationTime =
  | "UNTIL_DAY_END"
  | "24H"
  | "48H"
  | "UNLIMITED";

export type SettingPhotoDeadline = "30" | "40" | "50" | "60" | "120" | "180";

export type AcceptRequestBody = {
  vehicle_fuel: string;
  color: string;
  motor_code: string;
  vin: string;
  chassis_number: string;
  right_number: string;
  left_number: string;
  letter: string;
  province_code: string;
  notify_user: boolean;
  tags: string[];
};

export type ChangeStatusRequestBody = {
  status: ExpertRequestStatus;
  change_mind: boolean;
  send_notification: boolean;
  cant_send_notification: boolean;
  tags: string[];
};

export type SendExportLinkBody = {
  lead_specialist: string;
  forwarding_time: string;
  send_sms?: boolean;
  send_email?: boolean;
  tags?: string[];
  mobile?: string;
  email?: string;
};

export type RejectRequestBody = {
  reasons: string[];
  tags?: string[];
  send_notification: boolean;
};

export type RetrieveRequestBody = {
  status: ExpertRequestStatus;
};

export type RequestEvidenceLackBody = {
  required_fields: TemplateField[];
  tags: string[];
};

export type ReminderBody = {
  send_sms?: boolean;
  send_email?: boolean;
};
