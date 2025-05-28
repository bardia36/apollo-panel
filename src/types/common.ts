export type NameEnFa = {
  name_en: string;
  name_fa: string;
};

export type SearchParams = {
  page?: number;
  limit?: number;
  keyword?: string;
};

export type CommonListResponse<T> = {
  items: T[];
  count: number;
};
