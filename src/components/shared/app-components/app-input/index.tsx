import { forwardRef, ChangeEvent } from "react";
import { Input, InputProps } from "@heroui/react";
import { FieldError } from "react-hook-form";
import { convertPersianToEnglishNumbers } from "@/utils/base";

export interface Props extends InputProps {
  error?: FieldError;
  className?: string;
}

export const AppInput = forwardRef<HTMLInputElement, Props>(
  ({ error, className, ...props }, ref) => {
    const isInvalid = error ? true : props.isInvalid;
    const errorMessage = error?.message || props.errorMessage;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        // Convert Persian/Arabic numbers to English numbers
        e.target.value = convertPersianToEnglishNumbers(e.target.value);
      }

      // Call the original onChange handler if it exists
      if (props.onChange) props.onChange(e);
    };

    return (
      <Input
        ref={ref}
        {...props}
        radius="md"
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        classNames={{
          ...props.classNames,
          input: `disabled:text-neutral-7 ${isInvalid ? "border-danger" : ""} ${props.classNames?.input || ""}`,
          errorMessage: "text-start",
        }}
        className={className}
        onChange={handleChange}
      >
        {props.children}
      </Input>
    );
  }
);

AppInput.displayName = "AppInput";
