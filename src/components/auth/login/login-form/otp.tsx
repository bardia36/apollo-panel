import type { ActhDto, LoginByOtpEntity } from "@/types/auth";
type CookieValues = {
  auth?: ActhDto;
};
type Props = {
  userName: string;
  setUserName: (userName: string) => void;
  setCurrentComponent: (component: "userName" | "password" | "otp") => void;
};

import { v4 } from "uuid";
import { object, string } from "yup";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { formOptions } from "@/utils/validations";
import { toast } from "@/utils/toast";
import { accountApi } from "@/services/api/auth";
import { useCookies } from "react-cookie";
import useAuthStore from "@/stores/auth-store";
import { useValidationMessages } from "@/utils/rules";
import { exceptionHandler } from "@/services/api/exception";

// components
import { Form } from "@heroui/form";
import { InputOtp } from "@heroui/input-otp";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Divider } from "@heroui/divider";
import { Link, useNavigate } from "react-router-dom";

import GoogleButton from "./google-button";

export default function Otp({ userName, setCurrentComponent }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();
  const [_, setCookie] = useCookies<"AUTH", CookieValues>(["AUTH"]);
  const [progressing, setProgressing] = useState(false);

  useEffect(() => {
    getSendCode();
  }, []);

  async function getSendCode() {
    try {
      await accountApi.sendCode({ userName });
    } catch (err) {
      exceptionHandler(err);
    }
  }

  function setComponent() {
    setCurrentComponent("password");
  }

  const validationSchema = object({
    userName: string().required(
      useValidationMessages().required(t("auth.emailOrPhoneNumber"))
    ),
    code: string()
      .min(5, useValidationMessages().min(t("auth.otp"), 5))
      .required(useValidationMessages().required(t("auth.otp"))),
  }).required();

  const { handleSubmit, control, getValues } = useForm<LoginByOtpEntity>({
    ...formOptions,
    defaultValues: {
      userName: userName,
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

      const auth = await accountApi.loginByOtp(data);

      setAuth(auth);
      navigate("/dashboard");

      toast({ title: t("auth.youLoginSuccessfully"), color: "success" });

      setCookie("AUTH", auth, { path: "/", maxAge: auth.tokenExpireTime });
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setProgressing(false);
    }
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

      <Button
        fullWidth
        variant="light"
        type="submit"
        isLoading={progressing}
        className="my-4"
        startContent={
          <Icon
            icon="solar:password-linear"
            className="text-foreground"
            width="20"
            height="20"
          />
        }
        onPress={setComponent}
      >
        {t("auth.enterWithPassword")}
      </Button>

      <div className="flex items-center w-full gap-4 py-2">
        <Divider className="flex-1" />

        <p className="shrink-0 text-tiny text-default-500">{t("shared.or")}</p>

        <Divider className="flex-1" />
      </div>

      <GoogleButton />

      <p className="w-full text-center text-small">
        {t("auth.needToCreateAnAccount")}
        <Link to="/signup" className="text-primary ms-1">
          {t("auth.register")}
        </Link>
      </p>
    </Form>
  );
}
