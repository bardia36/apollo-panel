import { Chip } from "@heroui/chip";
import { t } from "i18next";

export default function DetailFieldsCountChip({
  selectedFieldsCount,
}: {
  selectedFieldsCount: number;
}) {
  return (
    <Chip
      classNames={{
        base: "bg-primary bg-opacity-20 text-primary h-6",
        content: "px-1",
      }}
      className="flex items-center gap-1"
    >
      {/* // TODO: make count dynamic */}
      {selectedFieldsCount}
      <span className="ms-1">{t("shared.item")}</span>
    </Chip>
  );
}
