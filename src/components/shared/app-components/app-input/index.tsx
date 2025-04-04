import { forwardRef } from "react";
import { Input, InputProps } from "@heroui/input";
import { FieldError } from "react-hook-form";

export interface Props extends InputProps {
  error?: FieldError;
  className?: string;
}

export const AppInput = forwardRef<HTMLInputElement, Props>(
  ({ error, className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        {...props}
        radius="md"
        isInvalid={!!error}
        errorMessage={error?.message}
        classNames={{
          input: "disabled:text-neutral-7",
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
