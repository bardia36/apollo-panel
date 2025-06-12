import type { ErrorExceptions, RequestOptions, ServerType } from "@/types/api";
import { stringify } from "qs";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";
import useAuthStore from "@/stores/auth-store";
import { ErrorException } from "@/types/api";
import useAppConfig from "@/config/app-config";
import { accountApi } from "./auth";

const tryWithoutToken = [425];
const statusConfig = {
  loginRedirect: [406, 407, 401, 403],
  logout: [406, 407, 401, 403, 425, 502],
  failed: [500, 501, 502, 503, 504],
};

function requestConfig(
  endpointBaseUrl: string,
  options: RequestOptions
): AxiosRequestConfig {
  const restUrl: string = [endpointBaseUrl, options.action]
    .filter((item) => !!item)
    .join("/");

  const axiosRequestConfig: AxiosRequestConfig = {
    baseURL: getBaseUrl(options.serverType),
    url: restUrl,
    method: options.method,
    params: options.params,
    signal: options.signal,
    withCredentials: true,
    data: options.body,
    paramsSerializer: (params: any) =>
      stringify(params, { arrayFormat: "repeat" }),
  };

  return axiosRequestConfig;
}

export async function axiosHandler<T>(
  url: string,
  options: RequestOptions
): Promise<T> {
  const req = requestConfig(url, options);

  try {
    const res = await axios(req);
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err))
      throw await errorHandler(
        err as AxiosError<ErrorExceptions>,
        url,
        options
      );
    else throw [] as ErrorExceptions;
  }
}

function getBaseUrl(serverType?: ServerType) {
  if (serverType === "AUTHENTICATION_SERVER")
    return useAppConfig().authenticationServerUrl;

  return useAppConfig().apiServerUrl;
}

async function errorHandler(
  err: AxiosError<ErrorExceptions>,
  url: string,
  options: RequestOptions
): Promise<ErrorExceptions> {
  if (
    err.message.includes("ENETUNREACH") ||
    err.message.includes("Network Error")
  ) {
    return Promise.resolve([]);
  }

  const error = err.response;
  if (!error) {
    const clientError = new ErrorException(
      "client error",
      "CLIENT_ERROR",
      -1,
      -1
    );
    throw clientError;
  }

  if (tryWithoutToken.includes(error.status)) {
    return axiosHandler(url, options);
  }

  if (statusConfig.logout.includes(error.status)) {
    handleLogout();
  }

  throw error.data;
}

async function handleLogout() {
  try {
    await accountApi.logout();
  } catch (error) {
    console.error("Logout API call failed:", error);
  } finally {
    useAuthStore.getState().removeAuth();
    window.location.href = "/login";
  }
}
