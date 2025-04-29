import { Templates } from "@/types/templates";
import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";

const BASE_URL = "panel/template";

export const templatesApi = {
  //   register(
  //     body: RegisterEntity,
  //     serverType: ServerType = "AUTHENTICATION_SERVER",
  //     tokenLess: boolean = true
  //   ) {
  //     return axiosHandler<ActhDto>(BASE_URL, {
  //       action: "register",
  //       method: RequestMethod.POST,
  //       body,
  //       serverType,
  //       tokenLess,
  //     });
  //   },

  getTemplates() {
    return axiosHandler<Templates>(BASE_URL, { method: RequestMethod.GET });
  },
};
