import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import { SearchParams } from "@/types/common";
import { VehicleModels } from "@/types/expert-requests";

const BASE_URL = "panel/vehicle-model";

export const vehicleModelApi = {
  getModelsInfo(params: SearchParams) {
    return axiosHandler<VehicleModels>(BASE_URL, {
      action: "info",
      method: RequestMethod.GET,
      params,
    });
  },
};
