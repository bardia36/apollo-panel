import { exceptionHandler } from "@/apis/exception";
import { expertRequestsApi } from "@/apis/expert-requests";
import { accountApi } from "@/apis/auth";
import {
  AppModal,
  AppModalRef,
} from "@/components/shared/app-components/app-modal";
import { Button, Switch, Form } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { t } from "i18next";
import { useRef, useState } from "react";
import { ActionsHeader } from "./components/actions-header";
import { RequestCode } from "./components/request-code";
import { TagInput } from "@/components/shared/tag-input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AppInput } from "@/components/shared/app-components/app-input";
import { AppSelect } from "@/components/shared/app-components/app-select";
import {
  ExpertRequestDetail,
  SendExportLinkBody,
} from "@/types/expert-requests";
import { validationRegex } from "@/utils/rules";
import { array, boolean, object, string, ObjectSchema } from "yup";
import { useValidationMessages } from "@/utils/rules";
import { formOptions } from "@/utils/validations";
import { yupResolver } from "@hookform/resolvers/yup";
import { dateOfNow } from "@/utils/base";
import { truncateString } from "@/utils/base";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { SecondRow, ThirdRow } from "@/components/shared/request-summary";

type Props = {
  requestData: ExpertRequestDetail;
};

export const SendInspectionLinkModal = ({ requestData }: Props) => {
  const modalRef = useRef<AppModalRef>(null);
  const queryClient = useQueryClient();
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);

  const msgs = useValidationMessages();

  const validationSchema: ObjectSchema<SendExportLinkBody> = object({
    lead_specialist: string().required(),
    forwarding_time: string().required(),
    send_sms: boolean().required().default(false),
    send_email: boolean().required().default(false),
    tags: array().of(string().required()).default([]).optional(),
    mobile: string().when("send_sms", {
      is: true,
      then: (schema) =>
        schema
          .required(msgs.required(t("shared.mobile")))
          .matches(validationRegex.mobile, msgs.isNotValid(t("shared.mobile"))),
      otherwise: (schema) => schema.optional(),
    }),
    email: string().when("send_email", {
      is: true,
      then: (schema) =>
        schema
          .required(msgs.required(t("shared.email")))
          .email(msgs.isNotValid(t("shared.email"))),
      otherwise: (schema) => schema.optional(),
    }),
  });

  const { control, handleSubmit } = useForm<SendExportLinkBody>({
    ...formOptions,
    resolver: yupResolver(validationSchema),
    defaultValues: {
      lead_specialist: requestData?.lead_specialist?._id || "",
      forwarding_time: new Date().toISOString(),
      send_sms: false,
      send_email: false,
      tags: requestData?.tags || [],
      mobile: requestData?.owner?.phoneNumber || "",
      email: requestData?.owner?.email || "",
    },
  });

  const { mutate: submit, isPending } = useMutation({
    mutationFn: (data: SendExportLinkBody) =>
      expertRequestsApi.sendExportLink(requestData._id, data),
    onSuccess: () => {
      modalRef.current?.onClose();
      queryClient.invalidateQueries({
        queryKey: ["expert-request", requestData._id],
      });
    },
    onError: (err) => exceptionHandler(err),
  });

  const onSubmit: SubmitHandler<SendExportLinkBody> = (data) => {
    submit(data);
  };

  return (
    <AppModal
      ref={modalRef}
      activator={
        <Button
          variant="shadow"
          className="bg-foreground-900 ms-1 text-foreground-50"
        >
          <Icon
            icon="solar:check-circle-bold"
            width={20}
            height={20}
            className="min-w-5 text-foreground-50"
          />
          {t("expertRequests.sendInspectionLink")}
        </Button>
      }
      size="xl"
      hideCloseButton={false}
    >
      <AppModal.Header>
        <ActionsHeader
          title={t("expertRequests.sendInspectionLink")}
          icon="bx:sort"
        />
      </AppModal.Header>

      <div className="flex flex-col gap-6">
        <RequestCode code={requestData.req_id} />
        <div className="flex flex-col h-full">
          <ExpertRequestSummary requestData={requestData} />

          <div className="flex items-center bg-default-50 mb-2 px-4 py-3.5 rounded-medium">
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

          <div className="flex items-center bg-default-50 px-4 py-3.5 rounded-medium">
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

          <Form onSubmit={handleSubmit(onSubmit)} className="gap-0">
            {(!!smsEnabled || !!emailEnabled) && (
              <div className="max-md:flex-col gap-4 grid md:grid-cols-6 mt-4 py-2 w-full">
                {!!smsEnabled && (
                  <Controller
                    control={control}
                    name="mobile"
                    render={({ field, fieldState: { error } }) => (
                      <AppInput
                        {...field}
                        type="text"
                        value={field.value || ""}
                        label={t("shared.mobile")}
                        labelPlacement="outside"
                        variant="faded"
                        size="lg"
                        placeholder="876 54 321 0912"
                        isInvalid={!!error}
                        errorMessage={error?.message}
                        className={
                          emailEnabled
                            ? "md:col-span-3"
                            : "md:col-span-4 md:col-start-2"
                        }
                        classNames={{
                          inputWrapper: "bg-background",
                          input:
                            "placeholder:text-foreground-500 text-xl font-bold text-center",
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
                  />
                )}

                {!!emailEnabled && (
                  <Controller
                    control={control}
                    name="email"
                    render={({ field, fieldState: { error } }) => (
                      <AppInput
                        {...field}
                        type="email"
                        value={field.value || ""}
                        label={t("shared.email")}
                        labelPlacement="outside"
                        variant="faded"
                        size="lg"
                        placeholder="test@customer.com"
                        isInvalid={!!error}
                        errorMessage={error?.message}
                        className={
                          smsEnabled
                            ? "md:col-span-3"
                            : "md:col-span-4 md:col-start-2"
                        }
                        classNames={{
                          inputWrapper: "bg-background",
                          input:
                            "placeholder:text-foreground-500 text-xl font-bold text-center",
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
                  />
                )}
              </div>
            )}

            <div className="gap-4 grid grid-cols-1 md:grid-cols-2 mt-6 mb-4 w-full">
              <Controller
                control={control}
                name="lead_specialist"
                render={({ field, fieldState: { error } }) => (
                  <AppSelect
                    label={t("expertRequests.responsibleSpecialist")}
                    labelPlacement="outside"
                    placeholder={t("shared.choose")}
                    error={error}
                    value={field.value}
                    itemKey="key"
                    itemLabel="label"
                    defaultSelection={
                      requestData?.lead_specialist._id &&
                      requestData?.lead_specialist.username
                        ? {
                            key: requestData?.lead_specialist._id,
                            label: requestData?.lead_specialist.username,
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
                  value={field.value || []}
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
        </div>
      </div>

      <AppModal.Footer>
        <Button
          onPress={() => modalRef.current?.onClose()}
          isLoading={isPending}
          variant="light"
          className="me-2 text-default-foreground"
          startContent={
            <Icon icon="mynaui:arrow-right" className="min-w-5 h-5" />
          }
        >
          {t("shared.back")}
        </Button>

        <Button
          onPress={() => handleSubmit(onSubmit)()}
          isLoading={isPending}
          className="bg-foreground-900 text-default-50"
          startContent={
            <Icon icon="carbon:send-filled" className="min-w-5 h-5" />
          }
        >
          {t("shared.sendIt")}
        </Button>
      </AppModal.Footer>
    </AppModal>
  );
};

const ExpertRequestSummary = ({ requestData }: Props) => {
  const { isSmAndDown } = useBreakpoint();

  return (
    <div className="mb-6">
      <h6 className="mb-2 text-default-600 text-xs">
        {t("expertRequests.requestSummary")}
      </h6>

      <div className="flex flex-col gap-4 bg-default-50 shadow-md p-4 border-2 border-default-200 border-dashed rounded-[20px]">
        <div className="flex flex-wrap items-center gap-2">
          <div className="p-3.5">
            <Icon
              icon="solar:user-linear"
              className="text-default-400"
              width={20}
              height={20}
            />
          </div>

          <div>
            <h6 className="font-semibold text-foreground-700">
              {isSmAndDown
                ? truncateString(requestData.owner.username, 15)
                : requestData.owner.username}
            </h6>

            {!!requestData.owner.phoneNumber && (
              <p className="text-foreground-500 text-sm">
                {requestData.owner.phoneNumber}
              </p>
            )}
          </div>

          <div className="ms-auto text-end">
            {!!requestData.order_number && (
              <div className="flex justify-end items-center gap-2">
                <h6 className="text-foreground-700 text-sm">
                  {isSmAndDown
                    ? truncateString(requestData.order_number, 20)
                    : requestData.order_number}
                </h6>
                <Icon
                  icon="solar:box-minimalistic-outline"
                  className="text-default-400"
                  width={16}
                  height={16}
                />
              </div>
            )}

            {!!requestData.owner.email && (
              <p className="text-foreground-500 text-end">
                {isSmAndDown
                  ? truncateString(requestData.owner.email, 15)
                  : requestData.owner.email}
              </p>
            )}
          </div>
        </div>

        {!!requestData.inspection_data && (
          <SecondRow
            vehicleModelName={
              requestData.inspection_data.vehicle_model?.name_fa
            }
            vehicleBrandName={
              requestData.inspection_data.vehicle_brand?.name_fa
            }
            colorName={requestData.inspection_data.color?.name}
            vin={requestData.inspection_data.vin}
          />
        )}

        <ThirdRow
          gallery={requestData.gallery}
          templateName={requestData.template_id.name}
          inspectionFormatName={requestData.inspection_format.name}
        />
      </div>
    </div>
  );
};
