import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import { uploadParams } from "@/types/fileUpload";

const BASE_URL = "shared/files";

export const filesApi = {
  upload(body: FormData, params: uploadParams) {
    return axiosHandler<string>(BASE_URL, {
      method: RequestMethod.POST,
      body,
      params,
    });
  },
};
