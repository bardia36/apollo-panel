import {
  ActhDto,
  Auth,
  ConfirmEmail,
  LoginEntity,
  RegisterEntity,
} from "@/types/auth";
import { axiosHandler } from "./core";
import { RequestMethod } from "@/types/api";

const BASE_URL = "auth";

export const accountApi = {
  register(body: RegisterEntity) {
    return axiosHandler<string>(BASE_URL, {
      action: "register",
      method: RequestMethod.POST,
      body,
    });
  },

  login(body: LoginEntity) {
    return axiosHandler<ActhDto>(BASE_URL, {
      action: "login",
      method: RequestMethod.POST,
      body,
    });
  },

  getAccount() {
    return axiosHandler<Auth>(BASE_URL, {
      action: "my",
      method: RequestMethod.GET,
    });
  },

  userExist(body: Pick<Auth, "userName">) {
    return axiosHandler<{ exist: boolean }>(BASE_URL, {
      action: "user-exist",
      method: RequestMethod.POST,
      body,
    });
  },

  havePassword(body: Pick<Auth, "userName">) {
    return axiosHandler<{ exist: boolean }>(BASE_URL, {
      action: "have-password",
      method: RequestMethod.POST,
      body,
    });
  },

  sendConfirmEmail(body: Pick<ConfirmEmail, "email">) {
    return axiosHandler<string>(BASE_URL, {
      action: "confirm-email/send",
      method: RequestMethod.POST,
      body,
    });
  },

  verifyConfirmEmail(body: ConfirmEmail) {
    return axiosHandler<ActhDto>(BASE_URL, {
      action: "confirm-email/verify",
      method: RequestMethod.POST,
      body,
    });
  },

  githubAuthentication() {
    return axiosHandler<string>(BASE_URL, {
      action: "github",
      method: RequestMethod.GET,
    });
  },

  updateProfileInfo(body: Pick<Auth, "firstName" | "lastName" | "userName">) {
    return axiosHandler<string>(BASE_URL, {
      action: "profile/info",
      method: RequestMethod.PATCH,
      body,
    });
  },

  updateProfileEmail(body: Pick<Auth, "email">) {
    return axiosHandler<string>(BASE_URL, {
      action: "profile/email",
      method: RequestMethod.PATCH,
      body,
    });
  },
};
