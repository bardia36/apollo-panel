import {
  ActhDto,
  Auth,
  ForgetPasswordEntity,
  LoginByOtpEntity,
  LoginEntity,
  RegisterEntity,
  ResetPasswordEntity,
} from "@/types/auth";
import { axiosHandler } from "./core";
import { RequestMethod, ServerType } from "@/types/api";

const BASE_URL = "auth";

export const accountApi = {
  register(
    body: RegisterEntity,
    serverType: ServerType = "AUTHENTICATION_SERVER",
    tokenLess: boolean = true
  ) {
    return axiosHandler<ActhDto>(BASE_URL, {
      action: "register",
      method: RequestMethod.POST,
      body,
      serverType,
      tokenLess,
    });
  },

  login(
    body: LoginEntity,
    tokenLess: boolean = true,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<ActhDto>(BASE_URL, {
      action: "login",
      method: RequestMethod.POST,
      body,
      serverType,
      tokenLess,
    });
  },

  forgetPassword(
    body: ForgetPasswordEntity,
    tokenLess: boolean = true,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<string>(BASE_URL, {
      action: "forget-password/send",
      method: RequestMethod.POST,
      body,
      tokenLess,
      serverType,
    });
  },

  resetPassword(
    body: ResetPasswordEntity,
    tokenLess: boolean = true,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<string>(BASE_URL, {
      action: "reset-password",
      method: RequestMethod.POST,
      body,
      tokenLess,
      serverType,
    });
  },

  loginByOtp(
    body: LoginByOtpEntity,
    tokenLess: boolean = true,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<ActhDto>(BASE_URL, {
      action: "otp-login",
      method: RequestMethod.POST,
      body,
      tokenLess,
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
    tokenLess: boolean = true,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<Auth>(BASE_URL, {
      action: "confirm-email/send",
      body,
      method: RequestMethod.POST,
      tokenLess,
      serverType,
    });
  },

  userExist(
    body: Pick<Auth, "userName">,
    tokenLess: boolean = true,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<{
      exist: boolean;
      profile: Pick<Auth, "userName" | "image">;
    }>(BASE_URL, {
      action: "user-exist",
      method: RequestMethod.POST,
      body,
      tokenLess,
      serverType,
    });
  },

  sendCode(
    body: Pick<Auth, "userName">,
    tokenLess: boolean = true,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<{ exist: boolean }>(BASE_URL, {
      action: "send-code",
      method: RequestMethod.POST,
      body,
      tokenLess,
      serverType,
    });
  },

  havePassword(
    body: Pick<Auth, "userName">,
    tokenLess: boolean = true,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<{ exist: boolean }>(BASE_URL, {
      action: "have-password",
      method: RequestMethod.POST,
      body,
      tokenLess,
      serverType,
    });
  },

  loginByGoogle(
    tokenLess: boolean = true,
    serverType: ServerType = "AUTHENTICATION_SERVER"
  ) {
    return axiosHandler<string>(BASE_URL, {
      action: "google",
      method: RequestMethod.GET,
      tokenLess,
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
};
