import { object, string } from "yup";
import { Control, Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formOptions } from "@/utils/validations";
import { useValidationMessages, validationRegex } from "@/utils/rules";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { t } from "i18next";
import { inspectionFormatApi } from "@/services/api/inspection-format";
import { Avatar, Button, Form } from "@heroui/react";
import { AppInput } from "@/components/shared/app-components/app-input";
import { AppSelect } from "@/components/shared/app-components/app-select";
import { StepperButtons } from "./stepper-buttons";
import { CreateRequestBody, InspectionDataItem } from "@/types/expertRequests";
import { LazyImage } from "@/components/shared/lazy-image";
import { truncateString } from "@/utils/base";
import { useBreakpoint } from "@/hook/useBreakpoint";
import { colorApi } from "@/services/api/colors";
import { vehicleModelApi } from "@/services/api/vehicle-model";
import { vehicleBrandApi } from "@/services/api/vehicle-brand";
import { vehicleCategoryApi } from "@/services/api/vehicle-category";
import { expertRequestsApi } from "@/services/api/expert-requests";
import { exceptionHandler } from "@/services/api/exception";

type StepOneProps = {
  onStepComplete: (id: string) => void;
};

export default function StepOne({ onStepComplete }: StepOneProps) {
  const [showInspectionFormatDetailCard, setShowInspectionFormatDetailCard] =
    useState(false);
  const [activeFormat, setActiveFormat] = useState<InspectionDataItem>();
  const { isMdAndUp } = useBreakpoint();
  const [isLoading, setIsLoading] = useState(false);

  const msgs = useValidationMessages();

  const validationSchema = object({
    username: string().required(msgs.required(t("shared.userName"))),
    mobile: string()
      .required(msgs.required(t("shared.mobile")))
      .matches(validationRegex.mobile, msgs.isNotValid(t("shared.mobile"))),
    email: string()
      .required(msgs.required(t("shared.email")))
      .email(msgs.isNotValid(t("shared.email"))),
    order_number: string().required(
      msgs.required(t("expertRequests.orderNumber"))
    ),
    inspection_format: string().required(
      msgs.required(t("expertRequests.reviewType"))
    ),
    inspection_data: object({
      vehicle_brand: string().required(msgs.required(t("shared.producer"))),
      vehicle_model: string().required(msgs.required(t("shared.model"))),
      vehicle_compony: string().required(
        msgs.required(t("expertRequests.carGroup"))
      ),
      vin: string().required(msgs.required(t("expertRequests.vinNumber"))), // TODO: must be 17 char
      color: string().required(msgs.required(t("shared.color"))),
    }).when("inspection_format", {
      is: (val: string) => !!val,
      then: (schema) => schema.required(),
    }),
  });

  const { control, handleSubmit, getValues } = useForm<CreateRequestBody>({
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

  const submit = async () => {
    try {
      setIsLoading(true);
      const data = getValues();
      const response = await expertRequestsApi.createRequest(data);
      onStepComplete(response.id);
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setIsLoading(false);
    }
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
                error={error}
                classNames={{
                  inputWrapper: "bg-default-50",
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
                  inputWrapper: "bg-default-50",
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
                  inputWrapper: "bg-default-50",
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
                  inputWrapper: "bg-default-50",
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
          isMdAndUp={isMdAndUp}
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

type InspectionFormatDetailCardProps = {
  activeFormat: InspectionDataItem;
  control: Control<any>;
  isMdAndUp: boolean;
};
const InspectionFormatDetailCard = ({
  activeFormat,
  control,
  isMdAndUp,
}: InspectionFormatDetailCardProps) => {
  return (
    <div className="bg-default-50 rounded-[20px] p-4 mt-4 shadow-md">
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
          name="inspection_data.vehicle_compony"
          render={({ field, fieldState: { error } }) => (
            <AppSelect
              label={t("expertRequests.carGroup")}
              labelPlacement="outside"
              placeholder={t("shared.choose")}
              error={error}
              value={field.value}
              itemKey="key"
              itemLabel="label"
              classNames={{
                trigger: "bg-default-100 text-foreground-500",
                label: "text-xs !text-default-600",
              }}
              onChange={(value) => field.onChange(value)}
              fetchData={vehicleCategoryApi.getCategoriesInfo}
            />
          )}
        />

        <Controller
          control={control}
          name="inspection_data.vehicle_brand"
          render={({ field, fieldState: { error } }) => (
            <AppSelect
              label={t("shared.producer")}
              labelPlacement="outside"
              placeholder={t("shared.choose")}
              error={error}
              value={field.value}
              itemKey="key"
              itemLabel="label"
              classNames={{
                trigger: "bg-default-100 text-foreground-500",
                label: "text-xs !text-default-600",
              }}
              onChange={(value) => field.onChange(value)}
              fetchData={vehicleBrandApi.getBrandsInfo}
            />
          )}
        />

        <Controller
          control={control}
          name="inspection_data.vehicle_model"
          render={({ field, fieldState: { error } }) => (
            <AppSelect
              label={t("shared.model")}
              labelPlacement="outside"
              placeholder={t("shared.choose")}
              error={error}
              value={field.value}
              itemKey="key"
              itemLabel="label"
              classNames={{
                trigger: "bg-default-100 text-foreground-500",
                label: "text-xs !text-default-600",
              }}
              onChange={(value) => field.onChange(value)}
              fetchData={vehicleModelApi.getModelsInfo}
            />
          )}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-x-3 gap-y-4">
        <Controller
          control={control}
          name="inspection_data.vin"
          render={({ field, fieldState: { error } }) => (
            <AppInput
              {...field}
              label={t("expertRequests.vinNumber")}
              labelPlacement="outside"
              placeholder={t("expertRequests.vinNumberPlaceholder")}
              error={error}
              value={field.value}
              classNames={{
                inputWrapper: "bg-default-50",
                input: "text-foreground-500",
                label: "text-xs !text-default-600",
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="inspection_data.color"
          render={({ field, fieldState: { error } }) => (
            <AppSelect
              label={t("shared.color")}
              labelPlacement="outside"
              placeholder={t("shared.choose")}
              error={error}
              value={field.value}
              itemKey="key"
              itemLabel="label"
              classNames={{
                trigger: "bg-default-100 text-foreground-500",
                label: "text-xs !text-default-600",
              }}
              onChange={(value) => field.onChange(value)}
              fetchData={colorApi.getColorsInfo}
            />
          )}
        />
      </div>
    </div>
  );
};
