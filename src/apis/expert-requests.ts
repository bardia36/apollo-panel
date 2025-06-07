import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import {
  ExpertRequestDetail,
  ExpertRequestResponse,
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
} from "@/types/expert-requests";

const BASE_URL = "panel/inspection-request";

export const expertRequestsApi = {
  getRequests(params?: GetRequestsParams) {
    return axiosHandler<ExpertRequestResponse>(BASE_URL, {
      method: RequestMethod.GET,
      params: {
        ...params,
        inspection_format: "PRE_INSURANCE_BODY_INSPECTION",
      },
    });
  },

  getRequestById(id: string) {
    return axiosHandler<ExpertRequestDetail>(BASE_URL, {
      action: id,
      method: RequestMethod.GET,
    });
  },

  deleteRequestById(id: string) {
    return axiosHandler<ExpertRequestDetail>(BASE_URL, {
      action: id,
      method: RequestMethod.DELETE,
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
    return axiosHandler(BASE_URL, {
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
    return axiosHandler<RequestsSetting>(BASE_URL, {
      action: "settings",
      method: RequestMethod.PUT,
      body,
    });
  },

  acceptRequest(id: string, body: AcceptRequestBody) {
    return axiosHandler<RequestsSetting>(BASE_URL, {
      action: `${id}/accept`,
      method: RequestMethod.PATCH,
      body,
    });
  },

  changeStatusRequest(id: string, body: ChangeStatusRequestBody) {
    return axiosHandler<RequestsSetting>(BASE_URL, {
      action: `${id}/change-status`,
      method: RequestMethod.PATCH,
      body,
    });
  },

  sendExportLinkRequest(id: string, body: SendExportLinkBody) {
    return axiosHandler<RequestsSetting>(BASE_URL, {
      action: `${id}/send-export-link`,
      method: RequestMethod.PATCH,
      body,
    });
  },

  rejectRequest(id: string, body: RejectRequestBody) {
    return axiosHandler<RequestsSetting>(BASE_URL, {
      action: `${id}/send-export-link`,
      method: RequestMethod.PATCH,
      body,
    });
  },

  retrieveRequest(id: string, body: RetrieveRequestBody) {
    return axiosHandler<RequestsSetting>(BASE_URL, {
      action: `${id}/retrieval`,
      method: RequestMethod.PATCH,
      body,
    });
  },

  requestEvidenceLack(id: string, body: RequestEvidenceLackBody) {
    return axiosHandler<RequestsSetting>(BASE_URL, {
      action: `${id}/more-info`,
      method: RequestMethod.PATCH,
      body,
    });
  },
};
