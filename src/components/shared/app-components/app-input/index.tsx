import { forwardRef, ChangeEvent, useRef, useEffect, useState } from "react";
import { Input, InputProps } from "@heroui/react";
import { FieldError } from "react-hook-form";
import { convertPersianToEnglishNumbers } from "@/utils/base";

export interface Props extends InputProps {
  error?: FieldError;
  className?: string;
  debounce?: boolean;
  debounceTime?: number;
}

export const AppInput = forwardRef<HTMLInputElement, Props>(
  (
    { value, error, className, debounce = false, debounceTime = 300, ...props },
    ref
  ) => {
    const isInvalid = error ? true : props.isInvalid;
    const errorMessage = error?.message || props.errorMessage;
    const timeoutRef = useRef<NodeJS.Timeout>();
    const [internalValue, setInternalValue] = useState(value);

    useEffect(() => {
      setInternalValue(value);
    }, [value]);

    useEffect(() => {
      return () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
    }, []);

    const handleValueChange = (newValue: string) => {
      // Update internal value immediately for UI responsiveness
      setInternalValue(newValue);

      if (debounce && props.onValueChange) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(
          () => props.onValueChange?.(newValue),
          debounceTime
        );
      } else if (props.onValueChange) props.onValueChange(newValue);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value) {
        // Convert Persian/Arabic numbers to English numbers
        e.target.value = convertPersianToEnglishNumbers(e.target.value);
      }

      // Update internal value immediately for UI responsiveness
      setInternalValue(e.target.value);

      if (debounce && props.onChange) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(
          () => props.onChange?.(e),
          debounceTime
        );
      } else if (props.onChange) props.onChange(e);
    };

    return (
      <Input
        ref={ref}
        {...props}
        value={internalValue}
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
        onValueChange={handleValueChange}
      >
        {props.children}
      </Input>
    );
  }
);

AppInput.displayName = "AppInput";
