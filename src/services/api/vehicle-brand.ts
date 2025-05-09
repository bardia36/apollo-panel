import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import { SearchParams } from "@/types/common";
import { VehicleBrand } from "@/types/expertRequests";

const BASE_URL = "panel/vehicle-brand";

export const vehicleBrandApi = {
  getBrandsInfo(params: SearchParams) {
    return axiosHandler<VehicleBrand[]>(BASE_URL, {
      action: "info",
      method: RequestMethod.GET,
      params,
    });
  },
};
