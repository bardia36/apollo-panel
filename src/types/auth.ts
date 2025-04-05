export type User = {
  has_set_password: boolean;
  status: boolean;
  email_status: boolean;
  last_login: string;
  name: string;
  role: string;
};

export type Auth = {
  _id: string;
  firstName: string;
  lastName: string;
  image: string;
  userName: string;
  email: string;
  defaultWorkspace?: {
    _id: string;
    name: string;
    slug: string;
    image: string;
    plane: "FREE" | "PRO";
  };
  confirmEmail: string;
  phoneNumber: string;
  suspended: boolean;
  role: string[];
};

export type RegisterEntity = {
  userName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  uniqueId?: string | null;
};

export type ForgetPasswordEntity = {
  email: string;
};

export type ResetPasswordEntity = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type ConfirmEmail = {
  email?: string;
  code: number;
  isRegister?: boolean;
};

export type LoginEntity = {
  userName: string;
  password: string;
  uniqueId?: string;
};

export type LoginByOtpEntity = {
  userName: string;
  code: string;
  uniqueId?: string;
};

export type ActhDto = {
  profile: Pick<
    Auth,
    "firstName" | "lastName" | "phoneNumber" | "email" | "userName"
  >;
  token: string;
  refreshToken: string;
  tokenExpireTime: number;
  refreshTokenExpireTime: number;
};

export type UserExist = Pick<Auth, "userName">;
