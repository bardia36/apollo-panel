// src/components/shared/app-components/app-date-picker/index.tsx
import { forwardRef } from "react";
import DatePicker from "react-multi-date-picker";
import { Input, InputProps } from "@heroui/react";
import { FieldError } from "react-hook-form";
import { Icon } from "@iconify/react";
import persian_calendar from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { DateObject } from "react-multi-date-picker";

export interface AppDatePickerProps extends Omit<InputProps, "onChange"> {
  error?: FieldError;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const convertToValidDate = (date: DateObject | null): string => {
  if (!date) return "";

  // Convert to Gregorian date
  const gregorianDate = date.convert("gregorian");

  // Format as YYYY-MM-DD
  const year = gregorianDate.year;
  const month = String(gregorianDate.month).padStart(2, "0");
  const day = String(gregorianDate.day).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const AppDatePicker = forwardRef<HTMLInputElement, AppDatePickerProps>(
  ({ error, className, value, onChange, ...props }, ref) => {
    const isInvalid = error ? true : props.isInvalid;
    const errorMessage = error?.message || props.errorMessage;

    return (
      <DatePicker
        value={value}
        calendar={persian_calendar}
        locale={persian_fa}
        onChange={(date) => {
          const validDate = convertToValidDate(date as DateObject);
          onChange?.(validDate);
        }}
        render={
          <Input
            ref={ref}
            {...props}
            value={value}
            radius="md"
            isInvalid={isInvalid}
            errorMessage={errorMessage}
            classNames={{
              ...props.classNames,
              input: `disabled:text-neutral-7 ${isInvalid ? "border-danger" : ""} ${props.classNames?.input || ""}`,
              errorMessage: "text-start",
            }}
            className={className}
            endContent={
              <Icon
                icon="solar:calendar-date-outline"
                width={20}
                height={20}
                className="text-default-400"
              />
            }
          />
        }
      />
    );
  }
);

AppDatePicker.displayName = "AppDatePicker";
