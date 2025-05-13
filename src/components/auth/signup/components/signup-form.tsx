import type { RegisterEntity } from "@/types/auth";
type Props = {
  setEmail: Dispatch<SetStateAction<string>>;
  setCurrentComponent: Dispatch<SetStateAction<"confirmEmail" | "form">>;
};

import { object, ref, string } from "yup";
import { v4 } from "uuid";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useValidationMessages } from "@/utils/rules";
import { formOptions } from "@/utils/validations";
import { Controller, useForm } from "react-hook-form";
import { exceptionHandler } from "@/services/api/exception";
import { accountApi } from "@/services/api/auth";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import { Form } from "@heroui/react";
import { AppInput } from "@/components/shared/app-components/app-input";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Checkbox } from "@heroui/react";
import { Link } from "react-router-dom";
import { Divider } from "@heroui/react";
import GoogleButton from "@/components/auth/login/login-form/google-button";

export default function SignupForm({ setCurrentComponent, setEmail }: Props) {
  const { t } = useTranslation();
  const msgs = useValidationMessages();
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [progressing, setProgressing] = useState(false);

  const validationSchema = object({
    userName: string().required(msgs.required(t("auth.name"))),
    email: string()
      .email(msgs.isNotValid(t("auth.email")))
      .required(msgs.required(t("auth.email"))),
    phoneNumber: string()
      .matches(/(?:\+98|0098|0)?9\d{9}/, msgs.isNotValid(t("auth.mobile")))
      .required(msgs.required(t("auth.mobile"))),
    password: string()
      .min(6, msgs.min(t("auth.password"), 6))
      .required(msgs.required(t("auth.password"))),
    confirmPassword: string()
      .oneOf([ref("password")], msgs.confirmPassword())
      .min(6, msgs.min(t("auth.confirmPassword"), 6))
      .required(msgs.required(t("auth.confirmPassword"))),
  }).required();

  const { handleSubmit, control } = useForm<RegisterEntity>({
    ...formOptions,
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      phoneNumber: "",
      confirmPassword: "",
      uniqueId: v4(),
    },
    resolver: yupResolver(validationSchema),
  });

  async function submit(data: RegisterEntity) {
    try {
      setProgressing(true);

      await accountApi.register(data);

      await accountApi.sendConfirmEmail({ email: data.email });

      setEmail(data.email);

      setCurrentComponent("confirmEmail");
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setProgressing(false);
    }
  }

  return (
    <Form className="gap-0" onSubmit={handleSubmit(submit)}>
      <Controller
        name="userName"
        key="username"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <AppInput
            label={t("auth.name")}
            autoFocus
            {...field}
            error={error}
            variant="flat"
            size="sm"
            className="my-4"
          />
        )}
      />

      <Controller
        name="email"
        key="email"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <AppInput
            label={t("auth.email")}
            {...field}
            error={error}
            size="sm"
            dir="ltr"
            variant="flat"
            className="mb-4"
          />
        )}
      />

      <Controller
        name="phoneNumber"
        key="phoneNumber"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <AppInput
            label={t("auth.mobile")}
            {...field}
            error={error}
            variant="flat"
            className="mb-4"
            size="sm"
            minLength={11}
            maxLength={11}
          />
        )}
      />

      <Controller
        name="password"
        key="password"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <AppInput
            label={t("auth.password")}
            {...field}
            error={error}
            type={isPassword ? "password" : "text"}
            className="mb-4"
            size="sm"
            minLength={6}
            endContent={
              <div
                className="mb-1 cursor-pointer"
                onClick={() => setIsPassword(!isPassword)}
              >
                {isPassword ? (
                  <Icon icon="clarity:eye-line" width="24" height="24" />
                ) : (
                  <Icon icon="clarity:eye-hide-line" width="24" height="24" />
                )}
              </div>
            }
          />
        )}
      />

      <Controller
        name="confirmPassword"
        key="confirmPassword"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <AppInput
            label={t("auth.confirmPassword")}
            {...field}
            error={error}
            type={isConfirmPassword ? "password" : "text"}
            className="mb-4"
            size="sm"
            minLength={6}
            endContent={
              <div
                className="mb-1 cursor-pointer"
                onClick={() => setIsConfirmPassword(!isConfirmPassword)}
              >
                {isConfirmPassword ? (
                  <Icon icon="clarity:eye-line" width="24" height="24" />
                ) : (
                  <Icon icon="clarity:eye-hide-line" width="24" height="24" />
                )}
              </div>
            }
          />
        )}
      />

      <Checkbox
        size="sm"
        className="mb-2"
        isSelected={acceptPolicy}
        onValueChange={setAcceptPolicy}
      >
        <p className="text-medium text-start">
          <Link to="#" className="text-primary">
            {t("auth.termsAndConditions")}
          </Link>

          {t("auth.iHaveReadAndAccept")}
        </p>
      </Checkbox>

      <Button
        fullWidth
        color="primary"
        type="submit"
        isDisabled={!acceptPolicy}
        isLoading={progressing}
        className="mb-10"
      >
        {t("auth.signUp")}
      </Button>

      <div className="flex items-center w-full gap-4 py-2">
        <Divider className="flex-1" />

        <p className="shrink-0 text-tiny text-default-500">{t("shared.or")}</p>

        <Divider className="flex-1" />
      </div>

      <GoogleButton />

      <p className="w-full text-center text-small">
        {t("auth.haveYouAlreadyRegistered")}

        <Link to="/login" className="text-primary ms-1">
          {t("auth.login")}
        </Link>
      </p>
    </Form>
  );
}
