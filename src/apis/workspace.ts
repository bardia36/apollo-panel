import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";
import { SearchParams } from "@/types/common";
import { Workspace } from "@/types/workspace";

const BASE_URL = "panel/workspaces";

export const workspaceApi = {
  getWorkspaces(params: SearchParams) {
    return axiosHandler<Workspace[]>(BASE_URL, {
      method: RequestMethod.GET,
      params,
    });
  },
  getWorkspaceById(id: string) {
    return axiosHandler<Workspace>(`${BASE_URL}/${id}`, {
      method: RequestMethod.GET,
    });
  },
  getWorkspaceBySlug(slug: string) {
    return axiosHandler<Workspace>(`${BASE_URL}/slug/${slug}`, {
      method: RequestMethod.GET,
    });
  },
};
