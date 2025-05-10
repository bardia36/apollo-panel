import { Chip } from "@heroui/react";
import { t } from "i18next";

type Props = {
  activeFieldsCount: number;
};

export default function FieldsCountChip({ activeFieldsCount }: Props) {
  return (
    <Chip
      classNames={{
        base: "bg-primary bg-opacity-20 text-primary h-6",
        content: "px-1",
      }}
      className="flex items-center gap-1 text-xs"
    >
      {activeFieldsCount}
      <span className="ms-1">{t("shared.item")}</span>
    </Chip>
  );
}
