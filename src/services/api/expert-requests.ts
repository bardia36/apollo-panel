import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import {
  CreateRequestInfoBody,
  ExpertRequestDetail,
  ExpertRequestResponse,
  UpdateRequestLinkBody,
  UpdateRequestFinalBody,
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

  // create - step 1
  createRequest(body: CreateRequestInfoBody) {
    return axiosHandler<{ id: string }>(BASE_URL, {
      method: RequestMethod.POST,
      body,
    });
  },

  // create - step 2
  updateRequestLink(id: string, body: UpdateRequestLinkBody) {
    return axiosHandler(BASE_URL, {
      action: `${id}/link-step`,
      method: RequestMethod.PATCH,
      body,
    });
  },

  // create - step 3
  updateRequestFinal(id: string, body: UpdateRequestFinalBody) {
    return axiosHandler(BASE_URL, {
      action: `${id}/final-step`,
      method: RequestMethod.PATCH,
      body,
    });
  },

  registerRequest(id: string, body: RegisterRequestBody) {
    return axiosHandler<RegisterRequestResponse>(BASE_URL, {
      action: id,
      method: RequestMethod.POST,
      body,
    });
  },
};
