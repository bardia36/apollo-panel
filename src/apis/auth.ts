import {
  ActhDto,
  Auth,
  ForgetPasswordEntity,
  LoginByOtpEntity,
  LoginEntity,
  RegisterEntity,
  ResetPasswordEntity,
  UsersInfo,
} from "@/types/auth";
import { axiosHandler } from "./core";
import { RequestMethod, ServerType } from "@/types/api";
import { SearchParams } from "@/types/common";

const BASE_URL = "auth";

export const accountApi = {
  register(
    body: RegisterEntity,
    serverType: ServerType = "AUTHENTICATION_SERVER",
  ) {
    return axiosHandler<ActhDto>(BASE_URL, {
      action: "register",
      method: RequestMethod.POST,
      body,
      serverType,
    });
  },

  login(
    body: LoginEntity,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<ActhDto>(BASE_URL, {
      action: "login",
      method: RequestMethod.POST,
      body,
      serverType,
    });
  },

  forgetPassword(
    body: ForgetPasswordEntity,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<string>(BASE_URL, {
      action: "forget-password/send",
      method: RequestMethod.POST,
      body,
      serverType,
    });
  },

  resetPassword(
    body: ResetPasswordEntity,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<string>(BASE_URL, {
      action: "reset-password",
      method: RequestMethod.POST,
      body,
      serverType,
    });
  },

  loginByOtp(
    body: LoginByOtpEntity,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<ActhDto>(BASE_URL, {
      action: "otp-login",
      method: RequestMethod.POST,
      body,
      serverType,
    });
  },

  getAccount(serverType: ServerType = "AUTHENTICATION_SERVER") {
    return axiosHandler<Auth>(BASE_URL, {
      action: "my",
      method: RequestMethod.GET,
      serverType,
    });
  },

  sendConfirmEmail(
    body: Pick<Auth, "email">,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<Auth>(BASE_URL, {
      action: "confirm-email/send",
      body,
      method: RequestMethod.POST,
      serverType,
    });
  },

  userExist(
    body: Pick<Auth, "username">,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<{
      exist: boolean;
      profile: Pick<Auth, "username" | "image">;
    }>(BASE_URL, {
      action: "user-exist",
      method: RequestMethod.POST,
      body,
      serverType,
    });
  },

  sendCode(
    body: Pick<Auth, "username">,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<{ exist: boolean }>(BASE_URL, {
      action: "send-code",
      method: RequestMethod.POST,
      body,
      serverType,
    });
  },

  havePassword(
    body: Pick<Auth, "username">,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<{ exist: boolean }>(BASE_URL, {
      action: "have-password",
      method: RequestMethod.POST,
      body,
      serverType,
    });
  },

  loginByGoogle(
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<string>(BASE_URL, {
      action: "google",
      method: RequestMethod.GET,
      serverType,
    });
  },

  logout(serverType: ServerType = "AUTHENTICATION_SERVER") {
    return axiosHandler<string>(BASE_URL, {
      action: "logout",
      method: RequestMethod.POST,
      serverType,
    });
  },

  usersInfo(
    params: SearchParams,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<UsersInfo>(BASE_URL, {
      action: "info",
      method: RequestMethod.GET,
      serverType,
      params,
    });
  },
};
