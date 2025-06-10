import { Select, SelectItem, SelectedItems, cn } from "@heroui/react";
import { t } from "i18next";
import { NeutralChip } from "@/components/shared/request-status-chip";
import { ExpertRequestStatus } from "@/types/expert-requests";
import { statusOptions } from "@/components/expert-requests/constants";

type AppStatusSelectProps = {
  selectedStatuses: ExpertRequestStatus[];
  label?: string;
  isMultiline?: boolean;
  selectionMode?: "single" | "multiple";
  classNames?: {
    trigger?: string;
    label?: string;
  };
  className?: string;
  currentStatus?: ExpertRequestStatus;
  onStatusChange: (statuses: ExpertRequestStatus[]) => void;
};

const statusFlow: Record<ExpertRequestStatus, ExpertRequestStatus[]> = {
  DRAFT: ["CANCELED", "ARCHIVED"],
  PENDING: [
    "OPENED",
    "IN_PROGRESS",
    "EXPIRED",
    "CANCELED",
    "FAILED",
    "ARCHIVED",
  ],
  OPENED: [
    "IN_PROGRESS",
    "PENDING",
    "EXPIRED",
    "CANCELED",
    "FAILED",
    "ARCHIVED",
  ],
  IN_PROGRESS: [
    "OPENED",
    "PENDING",
    "EXPIRED",
    "CANCELED",
    "FAILED",
    "ARCHIVED",
  ],
  COMPLETED: ["REVIEWED", "ARCHIVED"],
  REVIEWED: ["ACCEPTED", "REJECTED", "CANCELED", "ARCHIVED"],
  ACCEPTED: ["ARCHIVED"],
  REJECTED: ["ARCHIVED"],
  FAILED: ["ARCHIVED"],
  EXPIRED: ["ARCHIVED"],
  CANCELED: ["ARCHIVED"],
  ARCHIVED: [],
};

export const AppStatusSelect = ({
  selectedStatuses,
  label = t("shared.status"),
  isMultiline = true,
  selectionMode = "multiple",
  classNames,
  className,
  currentStatus,
  onStatusChange,
}: AppStatusSelectProps) => {
  const filteredStatusOptions = currentStatus
    ? statusOptions.filter((option) =>
        statusFlow[currentStatus].includes(option.uid as ExpertRequestStatus)
      )
    : statusOptions;

  return (
    <Select
      selectedKeys={new Set(selectedStatuses)}
      classNames={{
        trigger: cn("min-h-12 py-2", classNames?.trigger),
        label: cn("!text-default-600", classNames?.label),
      }}
      isMultiline={isMultiline}
      items={filteredStatusOptions}
      label={label}
      selectionMode={selectionMode}
      variant="bordered"
      className={className}
      renderValue={(items: SelectedItems<{ uid: string; label: string }>) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map(
              (status) =>
                status.data && (
                  <NeutralChip
                    status={status.data.uid as ExpertRequestStatus}
                    key={status.data.uid}
                  />
                )
            )}
          </div>
        );
      }}
      onSelectionChange={(keys) =>
        onStatusChange(Array.from(keys) as ExpertRequestStatus[])
      }
    >
      {(status) => <SelectItem key={status.uid} title={status.label} />}
    </Select>
  );
};
