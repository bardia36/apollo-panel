import { Template, Templates } from "@/types/templates";
import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";

const BASE_URL = "panel/template";

export const templatesApi = {
  getTemplates() {
    return axiosHandler<Templates>(BASE_URL, { method: RequestMethod.GET });
  },

  updateTemplates(body: Template[]) {
    return axiosHandler<boolean>(BASE_URL, {
      method: RequestMethod.PATCH,
      body,
    });
  },
};
