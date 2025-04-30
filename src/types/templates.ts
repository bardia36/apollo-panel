export type Template = {
  _id: string;
  name: string;
  logo: string;
  fields: TemplateField[];
};

export type TemplateField = {
  type: TemplateFieldType;
  title: string;
  _id: string;
};

export type TemplateFieldType = "IMAGE" | "FILE";

export type Templates = {
  docs: Template[];
  limit: number;
  page: number;
  totalPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalDocs: number;
};
