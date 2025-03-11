import type { LoginEntity } from "@/types/auth";
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
import { AppInput } from "@/components/shared/app-components/app-input/app-input";
import GoogleButton from "./google-button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { accountApi } from "@/services/api";

export default function Password({ userName, setCurrentComponent }: Props) {
  const { t } = useTranslation();
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const [progressing, setProgressing] = useState(false);

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
      rememberMe: false,
    },
    resolver: yupResolver(validationSchema),
  });

  async function submit(data: LoginEntity) {
    try {
      setProgressing(true);

      await accountApi.login(data);

      await getAccount();
      toast({ title: "test", color: "success" });
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setProgressing(false);
    }
  }

  async function getAccount() {
    const auth = await accountApi.getAccount();

    setAuth(auth);
    navigate("/dashboard");
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

      <div className="flex w-full items-center justify-between px-1">
        <Controller
          name="rememberMe"
          key="rememberMe"
          control={control}
          render={({ field: { value, onChange, ...rest } }) => (
            <Checkbox
              size="sm"
              isSelected={value}
              onValueChange={onChange}
              {...rest}
            >
              {t("auth.rememberMe")}
            </Checkbox>
          )}
        />

        <Link className="text-default-500" to="/forget-password">
          {t("auth.forgetPassword")}
        </Link>
      </div>

      <Button
        fullWidth
        color="primary"
        type="submit"
        isLoading={progressing}
        className="mb-10 mt-4"
      >
        {t("auth.login")}
      </Button>

      <Button
        fullWidth
        variant="light"
        type="submit"
        isLoading={progressing}
        className="my-4"
        endContent={
          <Icon icon="solar:chat-line-broken" className="text-default-400" />
        }
        onPress={setComponent}
      >
        {t("auth.enterWithOtp")}
      </Button>

      <div className="flex items-center gap-4 py-2 w-full">
        <Divider className="flex-1" />

        <p className="shrink-0 text-tiny text-default-500">{t("shared.or")}</p>

        <Divider className="flex-1" />
      </div>

      <GoogleButton />

      <p className="text-center text-small w-full">
        {t("auth.needToCreateAnAccount")}
        <Link to="/auth/signup" className="text-primary ms-1">
          {t("auth.signUp")}
        </Link>
      </p>
    </Form>
  );
}
