import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import { SearchParams } from "@/types/common";
import { VehicleCategories } from "@/types/expert-requests";

const BASE_URL = "panel/vehicle-category";

export const vehicleCategoryApi = {
  getCategoriesInfo(params: SearchParams) {
    return axiosHandler<VehicleCategories>(BASE_URL, {
      action: "info",
      method: RequestMethod.GET,
      params,
    });
  },
};
