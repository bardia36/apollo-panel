import { forwardRef, ChangeEvent, useRef } from "react";
import { Input, InputProps } from "@heroui/react";
import { FieldError } from "react-hook-form";
import { convertPersianToEnglishNumbers } from "@/utils/base";

export interface Props extends InputProps {
  error?: FieldError;
  className?: string;
}

// Debounce utility
function useDebouncedCallback<T extends (...args: any[]) => void>(
  fn: T,
  delay: number = 300
) {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  return (...args: Parameters<T>) => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export const AppInput = forwardRef<HTMLInputElement, Props>(
  ({ error, className, ...props }, ref) => {
    const isInvalid = error ? true : props.isInvalid;
    const errorMessage = error?.message || props.errorMessage;

    const debouncedOnChange = useDebouncedCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
          // Convert Persian/Arabic numbers to English numbers
          e.target.value = convertPersianToEnglishNumbers(e.target.value);
        }
        if (props.onChange) props.onChange(e);
      },
      300
    );

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      debouncedOnChange(e);
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
