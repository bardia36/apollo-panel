import { t } from "i18next";
import { StepperButtons } from "./stepper-buttons";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react"; // Add useEffect and useState
import { expertRequestsApi } from "@/services/api/expert-requests"; // Import the API
import { exceptionHandler } from "@/services/api/exception";
import {
  ExpertRequestDetail,
  UpdateRequestFinalBody,
} from "@/types/expertRequests";
import { FieldChip } from "../../templates/components/template-fields";
import { truncateString } from "@/utils/base";
import { Chip, Switch, Form, Select, SelectItem } from "@heroui/react";
import { TemplateField } from "@/types/templates";
import { AppInput } from "@/components/shared/app-components/app-input";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { array, boolean, object, string } from "yup";
import { formOptions } from "@/utils/validations";

type StepThreeProps = {
  requestId: string | null;
  onStepComplete: () => void;
  onStepBack: () => void;
};

export default function StepThree({
  requestId,
  onStepBack,
  onStepComplete,
}: StepThreeProps) {
  const [requestData, setRequestData] = useState<ExpertRequestDetail>();

  useEffect(() => {
    // if (requestId) {
    expertRequestsApi
      // .getRequestsById(requestId)
      .getRequestsById("682362a6f0cc20a87dee8949")
      .then((response) => {
        let res = response;
        res.required_fields = filterExistedFields(
          res.template_id?.fields,
          res.required_fields
        );
        setRequestData(response);
      })
      .catch((err) => exceptionHandler(err));
    // }
  }, []);

  function filterExistedFields(
    templateDefaultFields: TemplateField[],
    requestFields: TemplateField[]
  ) {
    if (!templateDefaultFields || !requestFields) return [];

    const templateFieldIds = new Set(
      templateDefaultFields.map((field) => field.title)
    );

    // Filter requestFields to only include those whose title doesn't exists in templateFieldIds
    return requestFields.filter((field) => !templateFieldIds.has(field.title));
  }

  if (!requestData) {
    return <StepThreeLoading />;
  }

  return (
    <div className="flex flex-col h-full gap-6">
      <RequestSummary requestData={requestData} />

      <RequestContact requestData={requestData} />

      <StepperButtons
        currentStep={3}
        onPrevStep={onStepBack}
        onNextStep={onStepComplete}
      />
    </div>
  );
}

function RequestSummary({ requestData }: { requestData: ExpertRequestDetail }) {
  return (
    <>
      <h6 className="text-xs text-default-600 mb-2">
        {t("expertRequests.requestSummary")}
      </h6>

      <div className="p-4 flex flex-col gap-4 bg-default-50 shadow-md rounded-[20px]">
        <div className="flex items-center gap-2">
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
              {requestData.owner.userName}
            </h6>
            <p className="text-foreground-500 text-sm">
              {requestData.owner.phoneNumber}
            </p>
          </div>

          <div className="text-sm ms-auto">
            <div className="flex items-center justify-end gap-2">
              <h6 className="text-foreground-700">
                {requestData.order_number}
              </h6>
              <Icon
                icon="solar:box-minimalistic-outline"
                className="text-default-400"
                width={16}
                height={16}
              />
            </div>
            <p className="text-foreground-500 text-end">
              {requestData.owner.email}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-3.5">
            <Icon
              icon="lineicons:search-1"
              className="text-default-400"
              width={20}
              height={20}
            />
          </div>

          <div>
            <h6 className="font-semibold text-foreground-700">
              {requestData.inspection_data.vehicle_model?.name_fa}
            </h6>
            <p className="text-foreground-500 text-sm">
              {requestData.inspection_data.vehicle_brand?.name_fa}
            </p>
          </div>

          <div className="ms-auto text-end text-foreground-500 text-sm">
            <h6>{requestData.inspection_data.color?.name}</h6>
            <p>VIN: {requestData.inspection_data.vin}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="p-3.5">
            <Icon
              icon="solar:folder-linear"
              className="text-default-400"
              width={20}
              height={20}
            />
          </div>

          <div>
            <h6 className="font-semibold text-foreground-700">
              {requestData.template_id?.name}
            </h6>
            <p className="text-foreground-500 text-sm">
              {requestData.inspection_format.name}
            </p>
          </div>

          <div className="text-end ms-auto text-sm">
            <h6 className="text-foreground-500 mb-1">
              {requestData.template_fields_count}{" "}
              {t("expertRequests.wantedItem")}
            </h6>
            {!!requestData.required_fields?.length && (
              <div className="flex items-center gap-2">
                <FieldChip
                  field={{
                    ...requestData.required_fields[0],
                    title: truncateString(
                      requestData.required_fields[0].title,
                      20
                    ),
                    active: true,
                  }}
                />

                {requestData.required_fields.length > 1 && (
                  <Chip
                    classNames={{
                      base: "text-default-foreground bg-default bg-opacity-40",
                      content: "flex items-center",
                    }}
                  >
                    +{requestData.required_fields.length - 1}
                  </Chip>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function RequestContact({ requestData }: { requestData: ExpertRequestDetail }) {
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const specialists = [{ key: "1", label: "متین شمسایی" }];
  const tags = [{ key: "1", label: "تگ اول" }];

  const validationSchema = object({
    send_sms: boolean(),
    send_email: boolean(),
    lead_specialist: string(),
    tags: array().of(string()),
    forwarding_time: string(),
  });

  const { control, handleSubmit, getValues } = useForm<UpdateRequestFinalBody>({
    ...formOptions,
    resolver: yupResolver(validationSchema),
  });

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

  const submit = () => {
    console.log(getValues());
  };

  return (
    <div>
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
          render={() => (
            <Switch
              isSelected={smsEnabled}
              color="primary"
              size="sm"
              className="ms-auto"
              onValueChange={setSmsEnabled}
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
          render={() => (
            <Switch
              isSelected={emailEnabled}
              color="primary"
              size="sm"
              className="ms-auto"
              onValueChange={setEmailEnabled}
            />
          )}
        />
      </div>

      <Form onSubmit={handleSubmit(submit)}>
        {(!!smsEnabled || !!emailEnabled) && (
          <div className="grid grid-cols-2 max-md:flex-col w-full gap-4 py-2 mt-4">
            {!!smsEnabled && (
              <AppInput
                value={requestData.owner.phoneNumber}
                label={t("shared.mobile")}
                labelPlacement="outside"
                placeholder="876 54 321 0912"
                variant="faded"
                size="lg"
                isReadOnly
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
                value={requestData.owner.email}
                label={t("shared.email")}
                labelPlacement="outside"
                variant="faded"
                isReadOnly
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

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <Controller
            control={control}
            name="lead_specialist"
            render={({ field, fieldState: { error } }) => (
              <Select
                value={field.value}
                className="max-w-xs"
                placeholder={t("shared.choose")}
                isInvalid={!!error}
                errorMessage={error?.message}
                classNames={{
                  trigger: "bg-default-100 text-foreground-500",
                  label: "text-xs !text-default-600",
                }}
                label={t("expertRequests.specialist")}
                labelPlacement="outside"
              >
                {specialists.map((specialist) => (
                  <SelectItem key={specialist.key}>
                    {specialist.label}
                  </SelectItem>
                ))}
              </Select>
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

          <Controller
            control={control}
            name="tags"
            render={({ field, fieldState: { error } }) => (
              <Select
                value={field.value}
                className="max-w-xs"
                isInvalid={!!error}
                errorMessage={error?.message}
                placeholder={t("shared.choose")}
                classNames={{
                  trigger: "bg-default-100 text-foreground-500",
                  label: "text-xs !text-default-600",
                }}
                label={t("expertRequests.tag")}
                labelPlacement="outside"
              >
                {tags.map((tag) => (
                  <SelectItem key={tag.key}>{tag.label}</SelectItem>
                ))}
              </Select>
            )}
          />
        </div>
      </Form>
    </div>
  );
}

export function StepThreeLoading() {
  return (
    <div>Loading...</div> // TODO: skeleton
  );
}
