import { object, string } from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formOptions } from "@/utils/validations";
import { useValidationMessages } from "@/utils/rules";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

// components
import { Select, SelectItem } from "@heroui/react";
import { Form } from "@heroui/react";
import { AppInput } from "@/components/shared/app-components/app-input";
import { t } from "i18next";

type StepOneFormValues = {
  fullName: string;
  phoneNumber: string;
  email: string;
  orderNumber: string;
  insuranceType: string;
};

export default function StepOne() {
  const [showInsuranceCard, setShowInsuranceCard] = useState(false);

  const validationSchema = object({
    fullName: string().required(
      useValidationMessages().required(t("shared.userName"))
    ),
    phoneNumber: string().required(
      useValidationMessages().required(t("shared.phoneNumber"))
    ),
    email: string()
      .email(useValidationMessages().email(".."))
      .required(useValidationMessages().required(t("shared.email"))),
    orderNumber: string().required(
      useValidationMessages().required(t("expertRequests.orderNumber"))
    ),
    insuranceType: string().required(
      useValidationMessages().required(t("expertRequests.reviewType"))
    ),
  }).required();

  const { control, handleSubmit } = useForm<StepOneFormValues>({
    ...formOptions,
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      orderNumber: "",
      insuranceType: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const handleInsuranceChange = (value: string) => {
    if (value) {
      // Simulate API request
      setTimeout(() => {
        setShowInsuranceCard(true);
      }, 500);
    } else {
      setShowInsuranceCard(false);
    }
  };

  const onSubmit = (data: StepOneFormValues) => {
    console.log(data);
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

      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-4">
          <Controller
            control={control}
            name="fullName"
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
            name="phoneNumber"
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
            name="orderNumber"
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
            name="insuranceType"
            render={({ field, fieldState: { error } }) => (
              <Select
                {...field}
                label={t("expertRequests.reviewType")}
                labelPlacement="outside"
                placeholder={t("shared.choose")}
                errorMessage={error?.message}
                isInvalid={!!error}
                className="col-span-1 md:col-span-2"
                classNames={{
                  trigger: "bg-default-100 text-foreground-500",
                  label: "text-xs !text-default-600",
                }}
                onSelectionChange={(value) => {
                  field.onChange(value);
                  handleInsuranceChange(value as string);
                }}
              >
                <SelectItem key="1">بیمه‌های خودرو</SelectItem>
              </Select>
            )}
          />
        </div>
      </Form>

      {showInsuranceCard && (
        <div className="w-full bg-default-50 rounded-lg p-4 mt-4 mb-4 min-h-[100px]">
          {/* Content will be added later */}
        </div>
      )}
    </>
  );
}
