import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import {
  ExpertRequestDetail,
  ExpertRequestResponse,
  RegisterRequestBody,
  RegisterRequestResponse,
} from "@/types/expertRequests";

const BASE_URL = "panel/inspection-request";

export const expertRequestsApi = {
  getRequests(params: { inspection_format: "PRE_INSURANCE_BODY_INSPECTION" }) {
    return axiosHandler<ExpertRequestResponse>(BASE_URL, {
      method: RequestMethod.GET,
      params,
    });
  },

  getRequestsById(id: string) {
    return axiosHandler<ExpertRequestDetail>(BASE_URL, {
      action: id,
      method: RequestMethod.GET,
    });
  },

  registerRequest(id: string, body: RegisterRequestBody) {
    return axiosHandler<RegisterRequestResponse>(BASE_URL, {
      action: id,
      method: RequestMethod.PUT,
      body,
    });
  },
};
