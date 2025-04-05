import type { ForgetPasswordEntity } from "@/types/auth";
type Props = {
  setEmail: Dispatch<SetStateAction<string>>;
  setCurrentComponent: Dispatch<SetStateAction<"confirmEmail" | "form">>;
};

import { object, string } from "yup";
import { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { useValidationMessages } from "@/utils/rules";
import { formOptions } from "@/utils/validations";
import { Controller, useForm } from "react-hook-form";
import { exceptionHandler } from "@/services/api/exception";
import { accountApi } from "@/services/api";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import { Form } from "@heroui/form";
import { AppInput } from "@/components/shared/app-components/app-input";
import { Button } from "@heroui/button";
import { Link } from "react-router-dom";
import { Divider } from "@heroui/divider";
import GoogleButton from "@/components/auth/login/login-form/google-button";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function SignupForm({ setCurrentComponent, setEmail }: Props) {
  const { t } = useTranslation();
  const [progressing, setProgressing] = useState(false);

  const validationSchema = object({
    email: string()
      .required(useValidationMessages().required(t("auth.email")))
      .email(useValidationMessages().email(t("auth.email"))),
  }).required();

  const { handleSubmit, control } = useForm<ForgetPasswordEntity>({
    ...formOptions,
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validationSchema),
  });

  async function submit(data: ForgetPasswordEntity) {
    try {
      setProgressing(true);

      await accountApi.forgetPassword(data);

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
        name="email"
        key="email"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <AppInput
            label={t("auth.email")}
            {...field}
            error={error}
            size="lg"
            variant="flat"
            className="my-4"
            endContent={
              <Icon
                icon="solar:letter-outline"
                width="20"
                height="20"
                className="mb-2 text-default-400"
              />
            }
          />
        )}
      />

      <Button
        fullWidth
        color="primary"
        type="submit"
        isLoading={progressing}
        className="mb-5"
      >
        {t("auth.sendRecoveryLink")}
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
