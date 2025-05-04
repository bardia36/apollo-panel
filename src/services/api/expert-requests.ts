import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import { ExpertRequestResponse, InspectionType } from "@/types/expertRequests";

const BASE_URL = "panel/inspection-request";

export const expertRequestsApi = {
  getRequests(params: { inspection_type: InspectionType }) {
    return axiosHandler<ExpertRequestResponse>(BASE_URL, {
      method: RequestMethod.GET,
      params,
    });
  },
};
