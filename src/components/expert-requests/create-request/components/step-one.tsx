import { object, string } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formOptions } from "@/utils/validations";
import { useValidationMessages } from "@/utils/rules";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { t } from "i18next";
import { inspectionFormatApi } from "@/services/api/inspection-format";

// components
import { Button } from "@heroui/react";
import { Form } from "@heroui/react";
import { AppInput } from "@/components/shared/app-components/app-input";
import { AppSelect } from "@/components/shared/app-components/app-select";
import { StepperButtons } from "./stepper-buttons";

type StepOneProps = {
  onStepComplete: () => void;
  onStepBack: () => void;
};

type StepOneFormValues = {
  username: string;
  mobile: string;
  email: string;
  order_number: string;
  inspection_format: string;
};

export default function StepOne({ onStepComplete, onStepBack }: StepOneProps) {
  const [showInspectionFormatDetailCard, setShowInspectionFormatDetailCard] =
    useState(false);

  const validationSchema = object({
    username: string().required(
      useValidationMessages().required(t("shared.userName"))
    ),
    mobile: string().required(
      useValidationMessages().required(t("shared.mobile"))
    ),
    email: string()
      .email(useValidationMessages().email(".."))
      .required(useValidationMessages().required(t("shared.email"))),
    order_number: string().required(
      useValidationMessages().required(t("expertRequests.orderNumber"))
    ),
    inspection_format: string().required(
      useValidationMessages().required(t("expertRequests.reviewType"))
    ),
  }).required();

  const { control, handleSubmit } = useForm<StepOneFormValues>({
    ...formOptions,
    resolver: yupResolver(validationSchema),
  });

  const handleInspectionFormatChange = (value: string) => {
    if (value) {
      // Simulate API request
      setTimeout(() => {
        setShowInspectionFormatDetailCard(true);
      }, 500);
    } else {
      setShowInspectionFormatDetailCard(false);
    }
  };

  const submit = () => {
    console.log("step 1 submit");
    onStepComplete();
    // Handle form submission
  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-default-foreground text-3xl font-black mb-2">
          {t("expertRequests.createReviewRequest")}
        </h2>
        <p className="text-default-500">
          {t("expertRequests.createReviewRequestDescription")}
        </p>
      </div>

      <Form onSubmit={handleSubmit(submit)}>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
          <Controller
            control={control}
            name="username"
            render={({ field, fieldState: { error } }) => (
              <AppInput
                {...field}
                label={t("shared.userName")}
                labelPlacement="outside"
                placeholder={t("expertRequests.userNamePlaceholder")}
                errorMessage={error?.message}
                isInvalid={!!error}
                classNames={{
                  input: "bg-default-100 text-foreground-500",
                  label: "text-xs !text-default-600",
                }}
                endContent={
                  <Icon
                    icon="solar:user-linear"
                    className="text-default-400"
                    width="20"
                    height="20"
                  />
                }
              />
            )}
          />

          <Controller
            control={control}
            name="mobile"
            render={({ field, fieldState: { error } }) => (
              <AppInput
                {...field}
                label={t("shared.phoneNumber")}
                labelPlacement="outside"
                placeholder="0912 123 45 678"
                errorMessage={error?.message}
                isInvalid={!!error}
                classNames={{
                  input: "bg-default-100 text-foreground-500",
                  label: "text-xs !text-default-600",
                }}
                endContent={
                  <Icon
                    icon="solar:iphone-linear"
                    className="text-default-400"
                    width="20"
                    height="20"
                  />
                }
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <AppInput
                {...field}
                label={t("shared.email")}
                labelPlacement="outside"
                placeholder="test@customer.com"
                errorMessage={error?.message}
                isInvalid={!!error}
                classNames={{
                  input: "bg-default-100 text-foreground-500",
                  label: "text-xs !text-default-600",
                }}
                endContent={
                  <Icon
                    icon="hugeicons:mail-02"
                    className="text-default-400"
                    width="20"
                    height="20"
                  />
                }
              />
            )}
          />

          <Controller
            control={control}
            name="order_number"
            render={({ field, fieldState: { error } }) => (
              <AppInput
                {...field}
                label={t("expertRequests.orderNumber")}
                labelPlacement="outside"
                placeholder={t("expertRequests.orderNumberPlaceholder")}
                errorMessage={error?.message}
                isInvalid={!!error}
                classNames={{
                  input: "bg-default-100 text-foreground-500",
                  label: "text-xs !text-default-600",
                }}
                endContent={
                  <Icon
                    icon="solar:box-minimalistic-outline"
                    className="text-default-400"
                    width="20"
                    height="20"
                  />
                }
              />
            )}
          />

          <Controller
            control={control}
            name="inspection_format"
            render={({ field, fieldState: { error } }) => (
              <AppSelect
                label={t("expertRequests.reviewType")}
                fetchData={inspectionFormatApi.getFormats}
                labelPlacement="outside"
                placeholder={t("shared.choose")}
                errorMessage={error?.message}
                isInvalid={!!error}
                value={field.value}
                itemKey="key"
                itemLabel="label"
                classNames={{
                  trigger: "bg-default-100 text-foreground-500",
                  label: "text-xs !text-default-600",
                }}
                onChange={(value) => {
                  field.onChange(value);
                  handleInspectionFormatChange(value);
                }}
              />
            )}
          />

          <div className="mt-auto">
            <Button
              variant="light"
              color="warning"
              fullWidth
              className="justify-start"
            >
              <Icon icon="stash:crown-solid" width="20" height="20" />
              {t("expertRequests.activateAndUseOtherTemplates")}
            </Button>
          </div>
        </div>
      </Form>

      {showInspectionFormatDetailCard && (
        <div className="w-full bg-default-50 rounded-lg p-4 mt-4 mb-4 min-h-[100px]">
          {/* Content will be added later */}
        </div>
      )}

      <StepperButtons
        currentStep={1}
        onNextStep={submit}
        onPrevStep={onStepBack}
      />
    </>
  );
}
