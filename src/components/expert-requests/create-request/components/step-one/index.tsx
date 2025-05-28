import { object, string } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formOptions } from "@/utils/validations";
import { useValidationMessages, validationRegex } from "@/utils/rules";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect, lazy } from "react";
import { t } from "i18next";
import { inspectionFormatApi } from "@/apis/inspection-format";
import { Button, Form } from "@heroui/react";
import { AppInput } from "@/components/shared/app-components/app-input";
import { AppSelect } from "@/components/shared/app-components/app-select";
import { StepperButtons } from "../stepper-buttons";
import {
  CreateRequestInfoBody,
  RegisterRequestResponse,
} from "@/types/expert-requests";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { expertRequestsApi } from "@/apis/expert-requests";
import { exceptionHandler } from "@/apis/exception";
import { InspectionFormatDetailCard } from "./inspection-format-detail-card";
import { useCreateRequest } from "../../context/create-request-context";

const StepOneHeader = lazy(() => import("./step-one-header"));

type StepOneProps = {
  onStepComplete: (id: string) => void;
};

const transformRequestData = (
  data: RegisterRequestResponse | null
): CreateRequestInfoBody | undefined => {
  if (!data) return undefined;

  return {
    username: data.username,
    mobile: data.mobile,
    email: data.email,
    order_number: data.order_number,
    inspection_format: data.inspection_format._id,
    inspection_data: data.inspection_data
      ? {
          vehicle_brand: data.inspection_data.vehicle_brand?._id,
          vehicle_model: data.inspection_data.vehicle_model?._id,
          vehicle_company: data.inspection_data.vehicle_company?._id,
          color: data.inspection_data.color?._id,
          vin: data.inspection_data.vin,
        }
      : undefined,
  } as CreateRequestInfoBody;
};

export default function StepOne({ onStepComplete }: StepOneProps) {
  const [showInspectionFormatDetailCard, setShowInspectionFormatDetailCard] =
    useState(true);
  const { isMdAndUp } = useBreakpoint();
  const [isLoading, setIsLoading] = useState(false);
  const {
    requestId,
    requestData,
    setRequestData,
    setRequestId,
    activeFormat,
    setActiveFormat,
  } = useCreateRequest();

  const msgs = useValidationMessages();

  const validationSchema = object({
    username: string().required(msgs.required(t("shared.userName"))),
    mobile: string().matches(
      validationRegex.mobile,
      msgs.isNotValid(t("shared.mobile"))
    ),
    email: string().email(msgs.isNotValid(t("shared.email"))),
    order_number: string(),
    inspection_format: string(),
    inspection_data: object({
      vehicle_brand: string(),
      vehicle_model: string(),
      vehicle_company: string(),
      vin: string().length(17, msgs.length(t("expertRequests.vinNumber"), 17)),
      color: string(),
    }).optional(),
  });

  const { control, handleSubmit, getValues, reset } =
    useForm<CreateRequestInfoBody>({
      ...formOptions,
      resolver: yupResolver(validationSchema),
      defaultValues: transformRequestData(requestData || null),
    });

  useEffect(() => {
    if (requestData) {
      reset(transformRequestData(requestData));
    }
  }, [requestData, reset]);

  useEffect(() => {
    // Show inspection format detail card if there's existing data
    if (requestData?.inspection_format) {
      setShowInspectionFormatDetailCard(true);
      // Fetch and set the active format
      inspectionFormatApi.getFormats().then((response) => {
        const formats = Array.isArray(response) ? response : [];
        const format = formats.find(
          (f: { key: string }) => f.key === requestData.inspection_format._id
        );
        if (format) setActiveFormat(format);
      });
    }
  }, [requestData]);

  const handleInspectionFormatChange = (value: string) => {
    if (value) {
      setTimeout(() => {
        setShowInspectionFormatDetailCard(true);
      }, 200);
    } else {
      setShowInspectionFormatDetailCard(false);
      setActiveFormat(null);
    }
  };

  const submit = async () => {
    try {
      setIsLoading(true);
      const data = getValues();
      const response = await expertRequestsApi.registerRequest(
        requestId ? requestId : "0",
        { ...data, step: "INFO" }
      );
      setRequestData(response);
      if (!requestId) setRequestId(response._id);
      onStepComplete(response._id);
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isMdAndUp && <StepOneHeader />}

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
                error={error}
                classNames={{
                  inputWrapper: "bg-default-100",
                  input: "text-foreground-500",
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
                placeholder="876 54 321 0912"
                error={error}
                classNames={{
                  inputWrapper: "bg-default-100",
                  input: "text-foreground-500",
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
                error={error}
                classNames={{
                  inputWrapper: "bg-default-100",
                  input: "text-foreground-500",
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
                error={error}
                classNames={{
                  inputWrapper: "bg-default-100",
                  input: "text-foreground-500",
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
                error={error}
                value={field.value}
                itemKey="key"
                itemLabel="label"
                selectFirstItem
                classNames={{
                  trigger: "bg-default-100 text-foreground-500",
                  label: "text-xs !text-default-600",
                }}
                onChange={(value) => {
                  field.onChange(value);
                  handleInspectionFormatChange(value);
                }}
                onItemSelect={(value) => setActiveFormat(value)}
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
              <Icon
                icon="solar:crown-minimalistic-bold"
                width="20"
                height="20"
                className="min-w-5"
              />
              {t("expertRequests.activateAndUseOtherTemplates")}
            </Button>
          </div>
        </div>
      </Form>

      {showInspectionFormatDetailCard && activeFormat && (
        <InspectionFormatDetailCard
          activeFormat={activeFormat}
          control={control}
        />
      )}

      <StepperButtons
        currentStep={1}
        isLoading={isLoading}
        onNextStep={handleSubmit(submit)}
      />
    </>
  );
}
