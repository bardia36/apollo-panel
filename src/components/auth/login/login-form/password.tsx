import type { ActhDto, LoginEntity } from "@/types/auth";
type CookieValues = {
  AUTH?: ActhDto;
};
type Props = {
  setCurrentComponent: (component: "userName" | "password" | "otp") => void;
  setUserName: (userName: string) => void;
  userName: string;
};

import { useState } from "react";
import { object, string } from "yup";
import { v4 } from "uuid";
import { useTranslation } from "react-i18next";
import { exceptionHandler } from "@/services/api/exception";
import { formOptions } from "@/utils/validations";
import { Controller, useForm } from "react-hook-form";
import { useValidationMessages } from "@/utils/rules";
import { toast } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuthStore from "@/stores/authStore";

// components
import { Link, useNavigate } from "react-router-dom";
import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { AppInput } from "@/components/shared/app-components/app-input";
import GoogleButton from "./google-button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { accountApi } from "@/services/api";
import { useCookies } from "react-cookie";

export default function Password({ userName, setCurrentComponent }: Props) {
  const { t } = useTranslation();
  const { setAuth } = useAuthStore();
  const [_, setCookie] = useCookies<"AUTH", CookieValues>(["AUTH"]);
  const navigate = useNavigate();
  const [progressing, setProgressing] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validationSchema = object({
    userName: string().required(
      useValidationMessages().required(t("auth.emailOrPhoneNumber"))
    ),
    password: string()
      .min(6, useValidationMessages().min(t("auth.password"), 6))
      .required(useValidationMessages().required(t("auth.password"))),
  }).required();

  const { handleSubmit, control } = useForm<LoginEntity>({
    ...formOptions,
    defaultValues: {
      userName: userName,
      password: "",
      uniqueId: v4(),
    },
    resolver: yupResolver(validationSchema),
  });

  async function submit(data: LoginEntity) {
    try {
      setProgressing(true);

      const auth = await accountApi.login(data);
      setAuth(auth);
      navigate("/dashboard");

      toast({ title: t("auth.youLoginSuccessfully"), color: "success" });

      if (rememberMe)
        setCookie("AUTH", auth, { path: "/", maxAge: auth.tokenExpireTime });
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setProgressing(false);
    }
  }

  function setComponent() {
    setCurrentComponent("otp");
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Controller
        name="password"
        key="password"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <AppInput
            label={t("auth.password")}
            {...field}
            error={error}
            type="password"
            className="my-4"
          />
        )}
      />

      <div className="flex items-center justify-between w-full px-1">
        <Checkbox
          size="sm"
          isSelected={rememberMe}
          onValueChange={setRememberMe}
        >
          {t("auth.rememberMe")}
        </Checkbox>

        <Link className="text-default-500" to="/forget-password">
          {t("auth.forgetPassword")}
        </Link>
      </div>

      <Button
        fullWidth
        color="primary"
        type="submit"
        isLoading={progressing}
        className="mt-4 mb-5"
      >
        {t("auth.login")}
      </Button>

      <Button
        fullWidth
        variant="light"
        type="submit"
        isLoading={progressing}
        startContent={
          <Icon
            icon="solar:chat-round-line-outline"
            className="text-foreground"
            width="20"
            height="20"
          />
        }
        onPress={setComponent}
      >
        {t("auth.enterWithOtp")}
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
