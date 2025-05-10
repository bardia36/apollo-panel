import { forwardRef } from "react";
import { Input, InputProps } from "@heroui/react";
import { FieldError } from "react-hook-form";

export interface Props extends InputProps {
  error?: FieldError;
  className?: string;
}

export const AppInput = forwardRef<HTMLInputElement, Props>(
  ({ error, className, ...props }, ref) => {
    const isInvalid = error ? true : props.isInvalid;
    const errorMessage = error?.message || props.errorMessage;

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
      >
        {props.children}
      </Input>
    );
  }
);

AppInput.displayName = "AppInput";
