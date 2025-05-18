import { t } from "i18next";
import { StepperButtons } from "../stepper-buttons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { expertRequestsApi } from "@/services/api/expert-requests";
import { exceptionHandler } from "@/services/api/exception";
import { UpdateRequestFinalBody } from "@/types/expertRequests";
import { Switch, Form } from "@heroui/react";
import { AppInput } from "@/components/shared/app-components/app-input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { array, boolean, object, string } from "yup";
import { formOptions } from "@/utils/validations";
import { accountApi } from "@/services/api/auth";
import { AppSelect } from "@/components/shared/app-components/app-select";
import { StepThreeLoading } from "../loadings/step-three-loading";
import { RequestSummary } from "./request-summary";
import { TagInput } from "@/components/shared/tag-input";
import { useCreateRequest } from "../../context/create-request-context";

type StepThreeProps = {
  onStepComplete: () => void;
  onStepBack: () => void;
};

export default function StepThree({
  onStepBack,
  onStepComplete,
}: StepThreeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const {
    requestId,
    requestData,
    stepThreeData,
    setRequestData,
    setStepThreeData,
  } = useCreateRequest();

  const validationSchema = object({
    send_sms: boolean(),
    send_email: boolean(),
    lead_specialist: string(),
    tags: array().of(string()),
    forwarding_time: string(),
  });

  const { control, handleSubmit, getValues, reset } =
    useForm<UpdateRequestFinalBody>({
      ...formOptions,
      resolver: yupResolver(validationSchema),
      defaultValues: stepThreeData || {
        send_sms: false,
        send_email: false,
        tags: [],
        forwarding_time: new Date().toISOString(),
        lead_specialist: "",
      },
    });

  useEffect(() => {
    if (stepThreeData) reset(stepThreeData);
  }, [stepThreeData, reset]);

  const dateOfNow = () => {
    const now = new Date();
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const datePart = now.toLocaleDateString("fa-IR", dateOptions);
    const timePart = now.toLocaleTimeString("fa-IR", timeOptions);

    return `${datePart} - ${timePart}`;
  };

  const submit = async () => {
    if (!requestId) return;

    try {
      setIsLoading(true);
      const data = getValues();
      data.tags = [];
      const response = await expertRequestsApi.registerRequest(requestId, {
        ...data,
        step: "FINAL",
      });
      setRequestData(response);
      setStepThreeData(data);
      onStepComplete();
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!requestData) return <StepThreeLoading />;

  return (
    <div className="flex flex-col h-full">
      <RequestSummary requestData={requestData} />

      <div className="bg-default-50 px-4 py-3.5 flex items-center rounded-medium mb-2">
        <Icon
          icon="solar:chat-line-outline"
          width={20}
          height={20}
          className="me-4 text-default-600"
        />
        {t("shared.sendSMS")}

        <Controller
          control={control}
          name="send_sms"
          render={({ field }) => (
            <Switch
              isSelected={field.value}
              color="primary"
              size="sm"
              className="ms-auto"
              onValueChange={(value) => {
                field.onChange(value);
                setSmsEnabled(value);
              }}
            />
          )}
        />
      </div>

      <div className="bg-default-50 px-4 py-3.5 flex items-center rounded-medium">
        <Icon
          icon="solar:letter-outline"
          width={20}
          height={20}
          className="me-4 text-default-600"
        />
        {t("shared.sendEmail")}

        <Controller
          control={control}
          name="send_email"
          render={({ field }) => (
            <Switch
              isSelected={field.value}
              color="primary"
              size="sm"
              className="ms-auto"
              onValueChange={(value) => {
                field.onChange(value);
                setEmailEnabled(value);
              }}
            />
          )}
        />
      </div>

      <Form onSubmit={handleSubmit(submit)} className="gap-0">
        {(!!smsEnabled || !!emailEnabled) && (
          <div className="grid md:grid-cols-2 max-md:flex-col w-full gap-4 py-2 mt-4">
            {!!smsEnabled && (
              <AppInput
                value={requestData.mobile}
                label={t("shared.mobile")}
                labelPlacement="outside"
                variant="faded"
                size="lg"
                classNames={{
                  inputWrapper: "bg-background",
                  input: "text-foreground-500 text-xl font-bold text-center",
                  label: "text-xs !text-default-600",
                }}
                endContent={
                  <Icon
                    icon="solar:iphone-outline"
                    className="text-default-400"
                    width="20"
                    height="20"
                  />
                }
              />
            )}

            {!!emailEnabled && (
              <AppInput
                value={requestData.email}
                label={t("shared.email")}
                labelPlacement="outside"
                variant="faded"
                size="lg"
                classNames={{
                  inputWrapper: "bg-background",
                  input: "text-foreground-500 text-xl font-bold text-center",
                  label: "text-xs !text-default-600",
                }}
                endContent={
                  <Icon
                    icon="solar:letter-outline"
                    className="text-default-400"
                    width="20"
                    height="20"
                  />
                }
              />
            )}
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4">
          <Controller
            control={control}
            name="lead_specialist"
            render={({ field, fieldState: { error } }) => (
              <AppSelect
                label={t("expertRequests.specialist")}
                labelPlacement="outside"
                placeholder={t("shared.choose")}
                error={error}
                value={field.value}
                itemKey="key"
                itemLabel="label"
                defaultSelection={
                  requestData?.lead_specialist._id &&
                  requestData?.lead_specialist.userName
                    ? {
                        key: requestData?.lead_specialist._id,
                        label: requestData?.lead_specialist.userName,
                      }
                    : undefined
                }
                classNames={{
                  trigger: "bg-default-100 text-foreground-500",
                  label: "text-xs !text-default-600",
                }}
                onChange={(value) => field.onChange(value)}
                fetchData={accountApi.usersInfo}
              />
            )}
          />

          <AppInput
            value={dateOfNow()}
            dir="ltr"
            label={t("shared.sendingDate")}
            labelPlacement="outside"
            placeholder="876 54 321 0912"
            size="lg"
            variant="flat"
            isDisabled
            classNames={{
              inputWrapper: "!bg-default-50",
              input: "!text-default-300 text-end",
              label: "text-xs !text-default-300",
            }}
            endContent={
              <Icon
                icon="solar:calendar-minimalistic-outline"
                className="text-default-300"
                width="20"
                height="20"
              />
            }
          />
        </div>

        <Controller
          control={control}
          name="tags"
          render={({ field, fieldState: { error } }) => (
            <TagInput
              value={
                field.value?.filter(
                  (tag): tag is string => typeof tag === "string"
                ) || []
              }
              onChange={(tags) => field.onChange(tags)}
              label={t("expertRequests.tag")}
              placeholder={t("shared.tagLabel")}
              labelPlacement="outside"
              isInvalid={!!error}
              errorMessage={error?.message}
              classNames={{
                inputWrapper: "bg-default-100",
                label: "text-xs !text-default-600",
              }}
            />
          )}
        />
      </Form>

      <StepperButtons
        currentStep={3}
        isLoading={isLoading}
        onPrevStep={onStepBack}
        onNextStep={submit}
      />
    </div>
  );
}
