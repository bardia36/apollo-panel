import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import {
  ExpertRequestDetail,
  AllExpertRequestsResponse,
  ExportReportParams,
  GetRequestsParams,
  RegisterRequestBody,
  RegisterRequestResponse,
  RequestsSetting,
  AcceptRequestBody,
  ChangeStatusRequestBody,
  SendExportLinkBody,
  RejectRequestBody,
  RetrieveRequestBody,
  RequestEvidenceLackBody,
  ReminderBody,
} from "@/types/expert-requests";

const BASE_URL = "panel/inspection-request";

export const expertRequestsApi = {
  getRequests(params?: GetRequestsParams) {
    return axiosHandler<AllExpertRequestsResponse>(BASE_URL, {
      method: RequestMethod.GET,
      params: {
        ...params,
        inspection_format: "PRE_INSURANCE_BODY_INSPECTION",
      },
    });
  },

  getRequestsCount(params?: GetRequestsParams) {
    return axiosHandler<number>(BASE_URL, {
      action: "count",
      method: RequestMethod.GET,
      params,
    });
  },

  getRequestById(id: string) {
    return axiosHandler<ExpertRequestDetail>(BASE_URL, {
      action: id,
      method: RequestMethod.GET,
    });
  },

  deleteRequestById(id: string) {
    return axiosHandler(BASE_URL, {
      action: id,
      method: RequestMethod.DELETE,
    });
  },

  deleteRequests(body: { ids: string[] }) {
    return axiosHandler(BASE_URL, {
      action: "bulk",
      method: RequestMethod.DELETE,
      body,
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
    return axiosHandler<{ url: string }>(BASE_URL, {
      action: "export",
      method: RequestMethod.GET,
      params,
    });
  },

  getRequestsSetting() {
    return axiosHandler<RequestsSetting>(BASE_URL, {
      action: "settings",
      method: RequestMethod.GET,
    });
  },

  updateRequestsSetting(body: RequestsSetting) {
    return axiosHandler(BASE_URL, {
      action: "settings",
      method: RequestMethod.PUT,
      body,
    });
  },

  accept(id: string, body: AcceptRequestBody) {
    return axiosHandler(BASE_URL, {
      action: `${id}/accept`,
      method: RequestMethod.PATCH,
      body,
    });
  },

  changeStatus(id: string, body: ChangeStatusRequestBody) {
    return axiosHandler(BASE_URL, {
      action: `${id}/change-status`,
      method: RequestMethod.PATCH,
      body,
    });
  },

  sendExportLink(id: string, body: SendExportLinkBody) {
    return axiosHandler(BASE_URL, {
      action: `${id}/send-export-link`,
      method: RequestMethod.PATCH,
      body,
    });
  },

  reject(id: string, body: RejectRequestBody) {
    return axiosHandler(BASE_URL, {
      action: `${id}/reject`,
      method: RequestMethod.PATCH,
      body,
    });
  },

  retrieve(id: string, body: RetrieveRequestBody) {
    return axiosHandler(BASE_URL, {
      action: `${id}/retrieval`,
      method: RequestMethod.PATCH,
      body,
    });
  },

  requestEvidenceLack(id: string, body: RequestEvidenceLackBody) {
    return axiosHandler(BASE_URL, {
      action: `${id}/more-info`,
      method: RequestMethod.PATCH,
      body,
    });
  },

  reminder(id: string, body: ReminderBody) {
    return axiosHandler(BASE_URL, {
      action: `${id}/reminder`,
      method: RequestMethod.POST,
      body,
    });
  },
};
