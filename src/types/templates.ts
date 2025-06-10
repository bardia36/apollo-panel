export type Templates = {
  docs: Template[];
  limit: number;
  page: number;
  totalPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalDocs: number;
};

export type Template = {
  _id: string;
  name: string;
  logo: string;
  default: boolean;
  fields: TemplateField[];
};

export type TemplateField = {
  _id: string;
  type: TemplateType;
  title: string;
  title_en?: string;
  category?: TemplateCategory;
  children?: TemplateField[]; // only has children if type is GENERAL
  hint?: string;
  vehicle_component_type?: "EXTERIOR" | "INTERIOR";
  name?: string;
  path?: string[];
  upload_at?: string[];
  active?: boolean; // front-end usage only
};

export type TemplateCategory =
  | "GENERAL_VIEWS"
  | "INTERIOR_VIEWS"
  | "EXTERIOR_PARTS"
  | "IDENTITY_DOCUMENTS"
  | "ENGINE_VIEWS"
  | "OTHER";

export type TemplateType =
  | "GALLERY" // تصاویر قالب و عکس های کارشناسی
  | "GENERAL" // تصاویر قالب و چیلدرنش عکس های اطراف
  | "DOCUMENT" // عمومی قالب ها و مدارک و داکیومنت عکس ها
  | "CUSTOM"; // اضافه شده
