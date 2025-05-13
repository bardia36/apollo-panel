import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import { SearchParams } from "@/types/common";
import {
  InspectionFormatInfo,
  InspectionFormatParams,
} from "@/types/expertRequests";

const BASE_URL = "panel/inspection-format";

export const inspectionFormatApi = {
  getFormats(params: SearchParams & InspectionFormatParams) {
    return axiosHandler<InspectionFormatInfo>(BASE_URL, {
      action: "info",
      method: RequestMethod.GET,
      params,
    });
  },
};
