import type { LoginByOtpEntity, ActhDto, CookieValues } from "@/types/auth";
import type { WorkspaceCookieValues } from "@/types/workspace";

type Props = {
  username: string;
  setUsername: (username: string) => void;
  setCurrentComponent: (component: "username" | "password" | "otp") => void;
};

import { v4 } from "uuid";
import { object, string } from "yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { formOptions } from "@/utils/validations";
import { toast } from "@/utils/toast";
import { accountApi } from "@/apis/auth";
import useAuthStore from "@/stores/auth-store";
import useWorkspaceStore from "@/stores/workspace-store";
import { useValidationMessages } from "@/utils/rules";
import { exceptionHandler } from "@/apis/exception";
import { useCookies } from "react-cookie";

// components
import { Form } from "@heroui/react";
import { InputOtp } from "@heroui/react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Divider } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";

import GoogleButton from "./google-button";

export default function Otp({ username, setCurrentComponent }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const { setWorkspaceSlug } = useWorkspaceStore();
  const [, setCookie] = useCookies<"AUTH", CookieValues>(["AUTH"]);
  const [, setWorkspaceCookie] = useCookies<"WORKSPACE", WorkspaceCookieValues>(["WORKSPACE"]);
  const [progressing, setProgressing] = useState(false);

  useEffect(() => {
    getSendCode();
  }, []);

  async function getSendCode() {
    try {
      await accountApi.sendCode({ username });
    } catch (err) {
      exceptionHandler(err);
    }
  }

  function setComponent() {
    setCurrentComponent("password");
  }

  const msgs = useValidationMessages();

  const validationSchema = object({
    username: string().required(msgs.required(t("auth.emailOrPhoneNumber"))),
    code: string()
      .min(5, msgs.min(t("auth.otp"), 5))
      .required(msgs.required(t("auth.otp"))),
  }).required();

  const { handleSubmit, control, getValues } = useForm<LoginByOtpEntity>({
    ...formOptions,
    defaultValues: {
      username: username,
      code: "",
      uniqueId: v4(),
    },
    resolver: yupResolver(validationSchema),
  });

  function handleComplete() {
    const data = getValues();

    submit(data);
  }

  async function submit(data: LoginByOtpEntity) {
    try {
      setProgressing(true);

      const account = await accountApi.loginByOtp(data);
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
    setAuth(auth);
    setWorkspaceSlug(auth.workspaceSlug);
    navigate(`/${auth.workspaceSlug}/dashboard`);
    setCookie("AUTH", cookie, { path: "/", maxAge: auth.tokenExpireTime });
    setWorkspaceCookie("WORKSPACE", auth.workspaceSlug, { path: "/", maxAge: auth.tokenExpireTime });
  }

  return (
    <Form className="items-center gap-0" onSubmit={handleSubmit(submit)}>
      <Controller
        control={control}
        name="code"
        render={({ field, fieldState: { error } }) => (
          <InputOtp
            {...field}
            errorMessage={error?.message}
            isInvalid={!!error}
            length={5}
            size="lg"
            className="my-4"
            textAlign="left"
            dir="ltr"
            classNames={{
              errorMessage: "text-start otp-error-message",
            }}
            onComplete={() => handleComplete()}
          />
        )}
      />

      <Button fullWidth variant="light" type="submit" isLoading={progressing} className="my-4" startContent={<Icon icon="solar:password-linear" className="text-foreground" width="20" height="20" />} onPress={setComponent}>
        {t("auth.enterWithPassword")}
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
