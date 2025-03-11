import type { UserExist } from "@/types/auth";

type Props = {
  setCurrentComponent: (component: "userName" | "password" | "otp") => void;
  setUserName: (userName: string) => void;
  userName: string;
};

import { object, string } from "yup";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { formOptions } from "@/utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { useValidationMessages } from "@/utils/rules";
import { accountApi } from "@/services/api";
import { exceptionHandler } from "@/services/api/exception";
import { useState } from "react";

// Components
import { Link } from "react-router-dom";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { AppInput } from "@/components/shared/app-components/app-input/app-input";
import GoogleButton from "./google-button";

export default function Username(props: Props) {
  const { t } = useTranslation();
  const [progressing, setProgressing] = useState(false);

  const validationSchema = object({
    userName: string().required(
      useValidationMessages().required(t("auth.emailOrPhoneNumber"))
    ),
  }).required();

  const { handleSubmit, control } = useForm<UserExist>({
    ...formOptions,
    defaultValues: {
      userName: "",
    },
    resolver: yupResolver(validationSchema),
  });

  async function submit(data: UserExist) {
    setProgressing(true);
    props.setUserName(data.userName);
    const exist = await userExist(data);

    if (exist) {
      const havePass = await havePassword(data);

      if (havePass) props.setCurrentComponent("password");
      else props.setCurrentComponent("otp");
    } else props.setCurrentComponent("otp");

    setProgressing(false);
  }

  async function userExist(data: UserExist) {
    try {
      const { userName } = data;

      const { exist } = await accountApi.userExist({ userName });

      return exist;
    } catch (err) {
      exceptionHandler(err);
    }
  }

  async function havePassword(data: UserExist) {
    try {
      const { userName } = data;

      const { exist } = await accountApi.havePassword({ userName });

      return exist;
    } catch (err) {
      exceptionHandler(err);
    }
  }

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Controller
        name="userName"
        key="username"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <AppInput
            label={t("auth.emailOrPhoneNumber")}
            {...field}
            error={error}
            variant="flat"
            autoFocus
            className="my-4"
          />
        )}
      />

      <Button
        fullWidth
        color="primary"
        type="submit"
        isLoading={progressing}
        className="mb-10"
      >
        {t("auth.login")}
      </Button>

      <div className="flex items-center gap-4 py-2 w-full">
        <Divider className="flex-1" />

        <p className="shrink-0 text-tiny text-default-500">{t("shared.or")}</p>

        <Divider className="flex-1" />
      </div>

      <GoogleButton />

      <p className="text-center text-small">
        {t("auth.needToCreateAnAccount")}
        <Link to="/auth/signup" className="text-primary ms-1">
          {t("auth.signUp")}
        </Link>
      </p>
    </Form>
  );
}
