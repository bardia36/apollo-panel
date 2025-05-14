import { Icon } from "@iconify/react/dist/iconify.js";
import { Input, Chip, InputProps } from "@heroui/react";
import { useState, KeyboardEvent } from "react";

type TagInputProps = {
  value: string[];
  label?: string;
  placeholder?: string;
  labelPlacement?: InputProps["labelPlacement"];
  errorMessage?: string;
  isInvalid?: boolean;
  classNames?: InputProps["classNames"];
  onChange: (tags: string[]) => void;
};

export function TagInput({
  value = [],
  label,
  placeholder,
  labelPlacement,
  errorMessage,
  isInvalid,
  classNames,
  onChange,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      event.preventDefault();
      if (!value.includes(inputValue.trim())) {
        onChange([...value, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <Input
        label={label}
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder={placeholder}
        labelPlacement={labelPlacement}
        errorMessage={errorMessage}
        isInvalid={isInvalid}
        classNames={classNames}
      />

      <div className="flex flex-wrap gap-2 mt-2">
        {value.map((tag) => (
          <Chip
            key={tag}
            onClose={() => handleTagRemove(tag)}
            variant="flat"
            endContent={
              <Icon icon="solar:close-circle-bold" width={16} height={16} />
            }
          >
            {tag}
          </Chip>
        ))}
      </div>

      {isInvalid && errorMessage && (
        <div className="text-danger text-xs mt-1">{errorMessage}</div>
      )}
    </div>
  );
}
