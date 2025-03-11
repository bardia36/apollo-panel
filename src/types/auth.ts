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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  uniqueId?: string | null;
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
  rememberMe?: boolean;
};

export type ActhDto = {
  workspace: string;
};

export type UserExist = Pick<Auth, "userName">;
