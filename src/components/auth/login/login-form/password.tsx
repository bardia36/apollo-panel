import type { LoginEntity, ActhDto, CookieValues } from "@/types/auth";

type Props = {
  username: string;
  setUsername: (username: string) => void;
  setCurrentComponent: (component: "username" | "password" | "otp") => void;
};

import { useState } from "react";
import { object, string } from "yup";
import { v4 } from "uuid";
import { useTranslation } from "react-i18next";
import { exceptionHandler } from "@/apis/exception";
import { formOptions } from "@/utils/validations";
import { Controller, useForm } from "react-hook-form";
import { useValidationMessages } from "@/utils/rules";
import { toast } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthStore from "@/stores/auth-store";
import { useCookies } from "react-cookie";

// components
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@heroui/react";
import { Form } from "@heroui/react";
import { Button } from "@heroui/react";
import { Checkbox } from "@heroui/react";
import { AppInput } from "@/components/shared/app-components/app-input";
import GoogleButton from "./google-button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { accountApi } from "@/apis/auth";

export default function Password({ username, setCurrentComponent }: Props) {
  const { t } = useTranslation();
  const { setAuth } = useAuthStore();
  const [_, setCookie] = useCookies<"AUTH", CookieValues>(["AUTH"]);
  const navigate = useNavigate();
  const [progressing, setProgressing] = useState(false);

  const msgs = useValidationMessages();

  const validationSchema = object({
    username: string().required(msgs.required(t("auth.emailOrPhoneNumber"))),
    password: string()
      .min(6, msgs.min(t("auth.password"), 6))
      .required(msgs.required(t("auth.password"))),
  }).required();

  const { handleSubmit, control } = useForm<LoginEntity>({
    ...formOptions,
    defaultValues: {
      username: username,
      password: "",
      uniqueId: v4(),
      rememberMe: false,
    },
    resolver: yupResolver(validationSchema),
  });

  async function submit(data: LoginEntity) {
    try {
      setProgressing(true);

      const account = await accountApi.login(data);
      setAccount(account);

      toast({ title: t("auth.youLoginSuccessfully"), color: "success" });
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setProgressing(false);
    }
  }

  async function setAccount(auth: ActhDto) {
    const cookie = {
      profile: {
        username: auth.profile.username,
        role: {
          name: auth.profile.role.name,
        },
      },
      token: auth.token,
      refreshToken: auth.refreshToken,
      tokenExpireTime: auth.tokenExpireTime,
      refreshTokenExpireTime: auth.refreshTokenExpireTime,
    };
    setCookie("AUTH", cookie, { maxAge: auth.tokenExpireTime });
    setAuth(auth);
    navigate("/dashboard");
  }

  function setComponent() {
    setCurrentComponent("otp");
  }

  return (
    <Form className="gap-0" onSubmit={handleSubmit(submit)}>
      <Controller name="password" key="password" control={control} render={({ field, fieldState: { error } }) => <AppInput label={t("auth.password")} {...field} error={error} autoFocus type="password" className="my-4" />} />

      <div className="flex justify-between items-center px-1 w-full">
        <Controller
          name="rememberMe"
          key="rememberMe"
          control={control}
          render={({ field }) => (
            <Checkbox size="sm" isSelected={field.value} onValueChange={field.onChange}>
              {t("auth.rememberMe")}
            </Checkbox>
          )}
        />

        <Link className="font-light text-default-500 text-small" to="/forget-password">
          {t("auth.forgetPassword")}
        </Link>
      </div>

      <Button fullWidth color="primary" type="submit" isLoading={progressing} className="mt-4 mb-10">
        {t("auth.login")}
      </Button>

      <Button fullWidth variant="light" type="submit" isLoading={progressing} startContent={<Icon icon="solar:chat-round-line-outline" className="text-foreground" width="20" height="20" />} onPress={setComponent}>
        {t("auth.enterWithOtp")}
      </Button>

      <div className="flex items-center gap-4 py-2 w-full">
        <Divider className="flex-1" />

        <p className="text-default-500 text-tiny shrink-0">{t("shared.or")}</p>

        <Divider className="flex-1" />
      </div>

      <GoogleButton />

      <p className="w-full text-small text-center">
        {t("auth.needToCreateAnAccount")}
        <Link to="/signup" className="ms-1 text-primary">
          {t("auth.register")}
        </Link>
      </p>
    </Form>
  );
}
