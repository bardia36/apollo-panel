import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import { SearchParams } from "@/types/common";
import { VehicleModel } from "@/types/expertRequests";

const BASE_URL = "panel/vehicle-model";

export const vehicleModelApi = {
  getModelsInfo(params: SearchParams) {
    return axiosHandler<VehicleModel[]>(BASE_URL, {
      action: "info",
      method: RequestMethod.GET,
      params,
    });
  },
};
