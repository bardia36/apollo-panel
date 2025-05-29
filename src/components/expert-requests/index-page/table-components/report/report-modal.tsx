import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  cn,
  Select,
  Chip,
  SelectItem,
  SelectedItems,
} from "@heroui/react";
import { t } from "i18next";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { expertRequestsApi } from "@/apis/expert-requests";
import {
  ExportReportParams,
  StatusesMap,
  ExpertRequestStatus,
} from "@/types/expert-requests";
import { AppInput } from "@/components/shared/app-components/app-input";
import { statusesMap, statusOptions } from "../../../constants";

type ReportModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const ReportModal = ({ isOpen, onClose }: ReportModalProps) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statuses, setStatuses] = useState<ExpertRequestStatus[]>([
    "ACCEPTED",
    "REJECTED",
    "EXPIRED",
  ]);
  const [fileType, setFileType] = useState<"xlsx" | "csv">("xlsx");
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    try {
      setIsLoading(true);
      const params: ExportReportParams = {
        book_type: fileType,
        status: statuses.join(","),
        from_date: fromDate,
        to_date: toDate,
      };

      const response = await expertRequestsApi.exportReport(params);

      // Create a blob from the response and trigger download
      const blob = new Blob([response.toString()], {
        type:
          fileType === "xlsx"
            ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            : "text/csv",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `report-${new Date().toISOString()}.${fileType}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      onClose();
    } catch (error) {
      console.error("Export failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNames={{ closeButton: "top-[1rem] md:top-[1rem] left-[1.5rem]" }}
      size="xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 md:pt-6">
          <div className="flex items-center gap-2 text-default-foreground">
            <Icon icon="solar:chart-square-bold" width={24} height={24} />
            {t("expertRequests.requestsReport")}
          </div>
        </ModalHeader>

        <ModalBody className="pb-6">
          <div className="space-y-6">
            <div className="bg-default-100 p-3 rounded-xl">
              <div className="flex items-center gap-4">
                <Icon
                  icon="solar:info-circle-bold"
                  width={24}
                  height={24}
                  className="text-default-foreground"
                />

                <span className="text-sm text-foreground">
                  {t("expertRequests.reportDescription")}
                </span>
              </div>
            </div>

            <Select
              selectedKeys={new Set(statuses)}
              classNames={{
                trigger: "min-h-12 py-2",
                label: "!text-default-600",
              }}
              isMultiline={true}
              labelPlacement="outside"
              items={statusOptions}
              label={t("shared.status")}
              selectionMode="multiple"
              variant="bordered"
              renderValue={(
                items: SelectedItems<{ uid: string; label: string }>
              ) => {
                return (
                  <div className="flex flex-wrap gap-2">
                    {items.map(
                      (status) =>
                        status.data && (
                          <Chip
                            key={status.data.uid}
                            className="bg-default-100 text-default-700 h-10 gap-1"
                            classNames={{
                              content: "flex gap-1",
                              base: "rounded-large",
                            }}
                          >
                            <Icon
                              icon={
                                statusesMap[
                                  status.data.uid as keyof StatusesMap
                                ]?.icon
                              }
                              className={`text-${statusesMap[status.data.uid as keyof StatusesMap]?.text} drop-shadow-md`}
                              width={20}
                              height={20}
                            />
                            <span className="font-semibold">
                              {status.data.label}
                            </span>
                          </Chip>
                        )
                    )}
                  </div>
                );
              }}
              onSelectionChange={(keys) =>
                setStatuses(Array.from(keys) as ExpertRequestStatus[])
              }
            >
              {(status) => <SelectItem key={status.uid} title={status.label} />}
            </Select>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div>
                <AppInput
                  value={fromDate}
                  type="text"
                  placeholder="1403/01/01"
                  label={t("shared.fromDate")}
                  labelPlacement="outside"
                  classNames={{
                    label: "text-xs !text-default-600",
                  }}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full"
                  endContent={
                    <Icon
                      icon="solar:calendar-date-outline"
                      width={20}
                      height={20}
                      className="text-default-400"
                    />
                  }
                />
              </div>

              <div>
                <AppInput
                  value={toDate}
                  type="text"
                  placeholder="1403/06/30"
                  label={t("shared.toDate")}
                  labelPlacement="outside"
                  classNames={{
                    label: "text-xs !text-default-600",
                  }}
                  className="w-full"
                  onChange={(e) => setToDate(e.target.value)}
                  endContent={
                    <Icon
                      icon="solar:calendar-date-outline"
                      width={20}
                      height={20}
                      className="text-default-400"
                    />
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-default-600 mb-2">
                {t("shared.fileType")}
              </label>

              <Button
                className={cn(
                  "flex-1 bg-default-100 text-default-800 w-24 h-14 rounded-xl me-4",
                  fileType === "xlsx" && "border-2 border-primary"
                )}
                onPress={() => setFileType("xlsx")}
              >
                {t("shared.excelFile")}
              </Button>

              <Button
                className={cn(
                  "flex-1 bg-default-100 text-default-800 w-24 h-14 rounded-xl",
                  fileType === "csv" && "border-2 border-primary"
                )}
                onPress={() => setFileType("csv")}
              >
                {t("shared.csvFile")}
              </Button>
            </div>
          </div>
        </ModalBody>

        <ModalFooter className="md:pb-6">
          <Button
            onPress={handleExport}
            isLoading={isLoading}
            className="w-full sm:w-auto"
          >
            {t("expertRequests.getReport")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
