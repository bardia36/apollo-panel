import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Input, Select, SelectItem, Button, cn } from "@heroui/react";
import { LazyImage } from "./lazy-image";
import IranFlag from "@/assets/images/expert-requests/iran-flag.svg";
import { LicensePlateNumber } from "@/types/expert-requests";

const persianLetters = [
  "الف",
  "ب",
  "پ",
  "ت",
  "ث",
  "ج",
  "چ",
  "ح",
  "خ",
  "د",
  "س",
];

type IranLicensePlateProps = {
  licensePlate: LicensePlateNumber;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isSelected?: boolean;
  onChange?: (value: LicensePlateNumber) => void;
};

export default function IranLicensePlate({
  licensePlate,
  isDisabled = false,
  isInvalid = false,
  isSelected = false,
  onChange,
}: IranLicensePlateProps) {
  const [editMode, setEditMode] = useState(false);
  const [plate, setPlate] = useState<LicensePlateNumber>({
    left_number: licensePlate.left_number || "",
    right_number: licensePlate.right_number || "",
    letter: licensePlate.letter || "",
    province_code: licensePlate.province_code || "",
  });

  const isReadOnly = isDisabled || !editMode;

  const handleChange = (key: keyof LicensePlateNumber, value: string) => {
    if (isReadOnly) return;

    const newPlate = { ...plate, [key]: value };
    setPlate(newPlate);
    onChange?.(newPlate);
  };

  const validateInput = (value: string, maxLength: number) => {
    return /^\d*$/.test(value) && value.length <= maxLength;
  };

  return (
    <div
      className={cn(
        "ltr flex items-center justify-between rounded-xl overflow-hidden shadow-sm shadow-neutral w-full bg-default-50",
        isSelected && "ring-2 ring-blue-500",
        isInvalid && "ring-2 ring-red-500"
      )}
    >
      <div className="bg-blue-600 text-white p-2 h-full flex flex-col items-center justify-center">
        <LazyImage
          src={IranFlag}
          alt="Iran Flag"
          width={20}
          height={10}
          externalImg
          imgClassName="rounded-none"
        />
        <span className="text-[10px] font-light mt-2">
          I.R.
          <br />
          IRAN
        </span>
      </div>

      <div className="flex items-center px-2 gap-1">
        <Input
          size="sm"
          isDisabled={isReadOnly}
          value={plate.left_number}
          placeholder="--"
          aria-label="Plate Part 2"
          className="w-fit"
          onValueChange={(value) => {
            if (validateInput(value, 2)) handleChange("left_number", value);
          }}
          classNames={{
            base: "opacity-100",
            input: "w-6 text-center font-semibold text-xl",
            innerWrapper: "justify-center",
            inputWrapper: `px-0 rounded-none ${isReadOnly && "bg-transparent shadow-none"}`,
          }}
        />

        <Select
          size="sm"
          isDisabled={isReadOnly}
          selectedKeys={[plate.letter]}
          placeholder="?"
          aria-label="Plate Letter"
          onChange={(e) => handleChange("letter", e.target.value as string)}
          className="w-fit"
          classNames={{
            listbox: "min-w-14",
            base: "opacity-100",
            listboxWrapper: "min-w-14",
            value: "font-semibold text-xl w-full flex justify-center",
            innerWrapper: "w-full",
            selectorIcon: "hidden",
            trigger: `rounded-none min-w-10 px-0 ${isReadOnly && "bg-transparent shadow-none"}`,
          }}
        >
          {persianLetters.map((letter) => (
            <SelectItem
              key={letter}
              className="w-full gap-0"
              selectedIcon={<></>}
            >
              {letter}
            </SelectItem>
          ))}
        </Select>

        <Input
          size="sm"
          isDisabled={isReadOnly}
          value={plate.right_number}
          placeholder="---"
          className="w-fit"
          aria-label="Plate Part 2"
          onValueChange={(value) => {
            if (validateInput(value, 3)) handleChange("right_number", value);
          }}
          classNames={{
            base: "opacity-100",
            input: "w-8 text-center font-semibold text-xl",
            innerWrapper: "justify-center",
            inputWrapper: `px-0 rounded-none ${isReadOnly && "bg-transparent shadow-none"}`,
          }}
        />

        {!isDisabled && (
          <Button
            isIconOnly
            variant="light"
            className="rounded-full min-w-5 max-w-5 h-5"
            onPress={() => setEditMode((prev) => !prev)}
          >
            <Icon
              icon={editMode ? "ic:baseline-check" : "solar:pen-2-bold"}
              className={cn(
                "min-w-4 h-4 text-default-600",
                editMode && "text-blue-600"
              )}
            />
          </Button>
        )}
      </div>

      <div className="p-2 flex flex-col items-center text-sm font-semibold border-l">
        <span>ایران</span>
        <Input
          size="sm"
          isDisabled={isReadOnly}
          value={plate.province_code}
          placeholder="--"
          className="w-fit"
          aria-label="Plate Iran Code"
          onValueChange={(value) => {
            if (validateInput(value, 2)) handleChange("province_code", value);
          }}
          classNames={{
            base: "opacity-100",
            input: "w-6 text-center font-semibold text-xl",
            innerWrapper: "justify-center",
            inputWrapper: `px-0 rounded-none ${isReadOnly && "bg-transparent shadow-none"}`,
          }}
        />
      </div>
    </div>
  );
}
