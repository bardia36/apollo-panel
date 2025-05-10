import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import {
  CreateRequestBody,
  ExpertRequestResponse,
} from "@/types/expertRequests";

const BASE_URL = "panel/inspection-request";

export const expertRequestsApi = {
  getRequests(params: { inspection_format: "PRE_INSURANCE_BODY_INSPECTION" }) {
    return axiosHandler<ExpertRequestResponse>(BASE_URL, {
      method: RequestMethod.GET,
      params,
    });
  },

  createRequest(body: CreateRequestBody) {
    return axiosHandler<{ id: string }>(BASE_URL, {
      method: RequestMethod.POST,
      body,
    });
  },
};
