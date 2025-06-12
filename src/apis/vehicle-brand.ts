import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import { SearchParams } from "@/types/common";
import { VehicleBrands } from "@/types/expert-requests";

const BASE_URL = "panel/vehicle-brand";

export const vehicleBrandApi = {
  getBrandsInfo(params: SearchParams) {
    return axiosHandler<VehicleBrands>(BASE_URL, {
      action: "info",
      method: RequestMethod.GET,
      params,
    });
  },
};
