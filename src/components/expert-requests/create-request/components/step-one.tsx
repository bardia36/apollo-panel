import { object, string } from "yup";
import { Controller, useForm } from "react-hook-form";
// import { useTranslation } from "react-i18next";
import { yupResolver } from "@hookform/resolvers/yup";
import { formOptions } from "@/utils/validations";
import { useValidationMessages } from "@/utils/rules";
import { Icon } from "@iconify/react/dist/iconify.js";
// import { useState } from "react";

// components
// import { Select, SelectItem } from "@heroui/react";
import { Form } from "@heroui/react";
import { AppInput } from "@/components/shared/app-components/app-input";

type StepOneFormValues = {
  fullName: string;
  phoneNumber: string;
  email: string;
  orderNumber: string;
  insuranceType: string; // New field
};

export default function StepOne() {
  //   const { t } = useTranslation();
  // const [showInsuranceCard, setShowInsuranceCard] = useState(false);

  const validationSchema = object({
    fullName: string().required(useValidationMessages().required("نام کاربر")),
    phoneNumber: string().required(
      useValidationMessages().required("تلفن همراه")
    ),
    email: string()
      .email(useValidationMessages().email(""))
      .required(useValidationMessages().required("ایمیل")),
    orderNumber: string().required(
      useValidationMessages().required("شماره سفارش")
    ),
    insuranceType: string().required(
      useValidationMessages().required("نوع بیمه")
    ),
  }).required();

  const { control, handleSubmit } = useForm<StepOneFormValues>({
    ...formOptions,
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      orderNumber: "",
      insuranceType: "", // New default value
    },
    resolver: yupResolver(validationSchema),
  });

  // const handleInsuranceChange = (value: string) => {
  //   if (value) {
  //     // Simulate API request
  //     setTimeout(() => {
  //       setShowInsuranceCard(true);
  //     }, 500);
  //   } else {
  //     setShowInsuranceCard(false);
  //   }
  // };

  const onSubmit = (data: StepOneFormValues) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <>
      <div className="text-center mb-6">
        <h2 className="text-default-foreground text-3xl font-black mb-2">
          ایجاد درخواست کارشناسی
        </h2>
        <p className="text-default-500">
          یا فرم لینک ارسال اطلاعات برای بازدید آنلاین
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
                label="نام کاربر"
                labelPlacement="outside"
                placeholder="نام کامل، مثل بردیا جوادی"
                errorMessage={error?.message}
                isInvalid={!!error}
                classNames={{
                  input: "bg-default-100 text-foreground-500",
                  label: "text-xs text-default-600 mb-3",
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
                label="تلفن همراه"
                labelPlacement="outside"
                placeholder="۰۹۱۲ ۱۲۳ ۴۵ ۶۷۸"
                errorMessage={error?.message}
                isInvalid={!!error}
                classNames={{
                  input: "bg-default-100 text-foreground-500",
                  label: "text-xs text-default-600 mb-3",
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
                label="ایمیل"
                labelPlacement="outside"
                placeholder="test@customer.com"
                errorMessage={error?.message}
                isInvalid={!!error}
                classNames={{
                  input: "bg-default-100 text-foreground-500",
                  label: "text-xs text-default-600 mb-3",
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
                label="شماره سفارش"
                labelPlacement="outside"
                placeholder="کد یا شماره سفارش مرجع"
                errorMessage={error?.message}
                isInvalid={!!error}
                classNames={{
                  input: "bg-default-100 text-foreground-500",
                  label: "text-xs text-default-600 mb-3",
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

          {/* <Controller
            control={control}
            name="insuranceType"
            render={({ field, fieldState: { error } }) => (
              <Select
                {...field}
                label="قالب کارشناسی"
                labelPlacement="outside"
                placeholder="انتخاب کنید"
                errorMessage={error?.message}
                isInvalid={!!error}
                className="col-span-1 md:col-span-2"
                classNames={{
                  trigger: "bg-default-100 text-foreground-500",
                  label: "text-xs text-default-600 mb-3",
                }}
                onChange={(value: string) => {
                  field.onChange(value);
                  handleInsuranceChange(value);
                }}
              >
                <SelectItem key="1">بیمه‌های خودرو</SelectItem>
              </Select>
            )}
          /> */}
        </div>
      </Form>
    </>
  );
}

// {
//   showInsuranceCard && (
//     <div className="w-full bg-default-50 rounded-lg p-4 mt-4 mb-4 min-h-[100px]">
//       {/* Content will be added later */}
//     </div>
//   );
// }
