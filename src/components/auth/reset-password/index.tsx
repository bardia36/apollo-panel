import type { ResetPasswordEntity } from "@/types/auth";
type Props = {
  email?: string;
};

import { object, ref, string } from "yup";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useValidationMessages } from "@/utils/rules";
import { formOptions } from "@/utils/validations";
import { Controller, useForm } from "react-hook-form";
import { exceptionHandler } from "@/services/api/exception";
import { accountApi } from "@/services/api";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "@/utils/toast";

// components
import { Form } from "@heroui/form";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import { Image } from "@heroui/image";
import { Icon } from "@iconify/react/dist/iconify.js";

import { AppInput } from "@/components/shared/app-components/app-input";

export default function SignupForm({ email }: Props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isPassword, setIsPassword] = useState(true);
  const [isConfirmPassword, setIsConfirmPassword] = useState(true);
  const [progressing, setProgressing] = useState(false);

  const validationSchema = object({
    email: string()
      .required(useValidationMessages().required(t("auth.email")))
      .email(useValidationMessages().email(t("auth.email"))),
    password: string()
      .min(6, useValidationMessages().min(t("auth.password"), 6))
      .required(useValidationMessages().required(t("auth.password"))),
    confirmPassword: string()
      .oneOf([ref("password")], useValidationMessages().confirmPassword())
      .min(6, useValidationMessages().min(t("auth.confirmPassword"), 6))
      .required(useValidationMessages().required(t("auth.confirmPassword"))),
  }).required();

  const { handleSubmit, control } = useForm<ResetPasswordEntity>({
    ...formOptions,
    defaultValues: {
      email: email,
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(validationSchema),
  });

  async function submit(data: ResetPasswordEntity) {
    try {
      setProgressing(true);

      await accountApi.resetPassword(data);

      toast({ title: t("auth.resetPasswordSuccessfully"), color: "success" });

      navigate("/login");
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setProgressing(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Image
        src="/images/logo.svg"
        alt="Logo"
        classNames={{ wrapper: "mb-6 mt-6 mt-md-0" }}
      />

      <Card
        fullWidth
        className="w-full max-w-sm mb-6 border border-default-100 rounded-large shadow-small mb-md-0"
      >
        <CardBody className="px-8 py-0">
          <h1 className="pb-2 mt-6 mb-2 text-xl text-content3-foreground text-start">
            {t("auth.resetPassword")}
          </h1>

          <Form className="gap-0" onSubmit={handleSubmit(submit)}>
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
                        <Icon
                          icon="clarity:eye-hide-line"
                          width="24"
                          height="24"
                        />
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
                        <Icon
                          icon="clarity:eye-hide-line"
                          width="24"
                          height="24"
                        />
                      )}
                    </div>
                  }
                />
              )}
            />

            <Card
              fullWidth
              shadow="none"
              radius="lg"
              className="border-0 mb-10"
            >
              <CardBody className="p-3 bg-default-100">
                <div className="flex items-center justify-start">
                  <Icon
                    icon="solar:info-circle-bold"
                    width="24"
                    height="24"
                    className="me-4"
                  />

                  <p className="text-small text-start text-foreground font-normal">
                    {t("auth.resetPasswordDescription")}
                  </p>
                </div>
              </CardBody>
            </Card>

            <Button
              variant="bordered"
              fullWidth
              className="mb-4"
              startContent={
                <Icon
                  icon="solar:alt-arrow-right-linear"
                  width="24"
                  height="24"
                />
              }
              onPress={() => navigate("/forget-password")}
            >
              {t("shared.back")}
            </Button>

            <Button
              fullWidth
              color="primary"
              type="submit"
              className="mb-10"
              isLoading={progressing}
            >
              {t("auth.registerANewPassword")}
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
