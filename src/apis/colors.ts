import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import { SearchParams } from "@/types/common";
import { Colors } from "@/types/expert-requests";

const BASE_URL = "panel/color";

export const colorApi = {
  getColorsInfo(params: SearchParams) {
    return axiosHandler<Colors>(BASE_URL, {
      action: "info",
      method: RequestMethod.GET,
      params,
    });
  },
};
