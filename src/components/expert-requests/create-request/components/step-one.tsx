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
import { Avatar, Button } from "@heroui/react";
import { Form } from "@heroui/react";
import { AppInput } from "@/components/shared/app-components/app-input";
import { AppSelect } from "@/components/shared/app-components/app-select";
import { StepperButtons } from "./stepper-buttons";
import { InspectionDataItem } from "@/types/expertRequests";
import { LazyImage } from "@/components/shared/lazy-image";
import { truncateString } from "@/utils/base";
import { useBreakpoint } from "@/hook/useBreakpoint";

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
  const [activeFormat, setActiveFormat] = useState<InspectionDataItem>();
  const { isMdAndUp } = useBreakpoint();

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
      setTimeout(() => {
        setShowInspectionFormatDetailCard(true);
      }, 200);
    } else setShowInspectionFormatDetailCard(false);
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
                onItemSelect={(value) => {
                  setActiveFormat(value);
                }}
                fetchData={inspectionFormatApi.getFormats}
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

      {showInspectionFormatDetailCard && activeFormat && (
        <div className="bg-default-50 rounded-lg p-4 mt-4 shadow-lg">
          <div className="flex items-center gap-2 mb-8">
            <Avatar
              showFallback
              className="w-12 h-12 rounded-large bg-default-100"
              fallback={
                <LazyImage
                  src={activeFormat.logo}
                  alt={activeFormat.label}
                  width={24}
                  height={24}
                  className="min-w-[24px] min-h-[24px]"
                />
              }
            />

            <div>
              <h6 className="font-semibold text-foreground-700">
                {activeFormat.label}
              </h6>
              <p className="text-sm text-foreground-500">
                {truncateString(activeFormat.description, isMdAndUp ? 60 : 20)}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-x-3 gap-y-4 mb-4">
            <Controller
              control={control}
              name="inspection_format"
              render={({ field, fieldState: { error } }) => (
                <AppSelect
                  label={t("expertRequests.carGroup")}
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
                  onItemSelect={(value) => {
                    setActiveFormat(value);
                  }}
                  fetchData={inspectionFormatApi.getFormats}
                />
              )}
            />

            <Controller
              control={control}
              name="inspection_format"
              render={({ field, fieldState: { error } }) => (
                <AppSelect
                  label={t("shared.producer")}
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
                  onItemSelect={(value) => {
                    setActiveFormat(value);
                  }}
                  fetchData={inspectionFormatApi.getFormats}
                />
              )}
            />

            <Controller
              control={control}
              name="inspection_format"
              render={({ field, fieldState: { error } }) => (
                <AppSelect
                  label={t("shared.model")}
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
                  onItemSelect={(value) => {
                    setActiveFormat(value);
                  }}
                  fetchData={inspectionFormatApi.getFormats}
                />
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-x-3 gap-y-4">
            <Controller
              control={control}
              name="inspection_format"
              render={({ field, fieldState: { error } }) => (
                <AppSelect
                  label={t("expertRequests.vinNumber")}
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
                  onItemSelect={(value) => {
                    setActiveFormat(value);
                  }}
                  fetchData={inspectionFormatApi.getFormats}
                />
              )}
            />

            <Controller
              control={control}
              name="inspection_format"
              render={({ field, fieldState: { error } }) => (
                <AppSelect
                  label={t("shared.color")}
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
                  onItemSelect={(value) => {
                    setActiveFormat(value);
                  }}
                  fetchData={inspectionFormatApi.getFormats}
                />
              )}
            />
          </div>
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
