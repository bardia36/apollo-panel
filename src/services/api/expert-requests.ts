import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import {
  ExpertRequestDetail,
  ExpertRequestResponse,
  ExportReportParams,
  RegisterRequestBody,
  RegisterRequestResponse,
} from "@/types/expertRequests";
import { File } from "buffer";

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

  exportReport(params: ExportReportParams) {
    return axiosHandler<File>(BASE_URL, {
      action: "export",
      method: RequestMethod.GET,
      params,
    });
  },
};
