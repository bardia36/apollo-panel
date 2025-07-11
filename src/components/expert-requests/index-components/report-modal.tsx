import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  cn,
  Select,
  SelectItem,
  SelectedItems,
} from "@heroui/react";
import { t } from "i18next";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { expertRequestsApi } from "@/apis/expert-requests";
import {
  ExportReportParams,
  ExpertRequestStatus,
} from "@/types/expert-requests";
import { statusOptions } from "@/components/expert-requests/constants";
import { NeutralChip } from "@/components/shared/request-status-chip";
import { AppDatePicker } from "@/components/shared/app-components/app-date-picker";
import { exceptionHandler } from "@/apis/exception";
import useAppConfig from "@/config/app-config";

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
  const { staticServerUrl } = useAppConfig();

  const handleExport = async () => {
    try {
      setIsLoading(true);
      const params: ExportReportParams = {
        book_type: fileType,
        status: statuses.join(","),
        from_date: fromDate,
        to_date: toDate,
      };

      const { url } = await expertRequestsApi.exportReport(params);
      downloadFileFromURL(url, "inspection_requests.xlsx");
    } catch (error) {
      exceptionHandler(error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadFileFromURL = (fileUrl: string, filename = "file") => {
    const link = document.createElement("a");
    link.href = `${staticServerUrl}${fileUrl}`;

    // This tells browser to download instead of open if possible
    link.setAttribute("download", filename);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNames={{ closeButton: "top-[1rem] left-[1.5rem]" }}
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

                <span className="text-foreground text-sm">
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
                setStatuses(Array.from(keys) as ExpertRequestStatus[])
              }
            >
              {(status) => <SelectItem key={status.uid} title={status.label} />}
            </Select>

            <div className="gap-4 md:gap-6 grid grid-cols-2">
              <AppDatePicker
                value={fromDate}
                onChange={setFromDate}
                placeholder="1403/01/01"
                label={t("shared.fromDate")}
                labelPlacement="outside"
                classNames={{
                  label: "text-xs !text-default-600",
                }}
                className="w-full"
              />

              <AppDatePicker
                value={toDate}
                onChange={setToDate}
                placeholder="1403/06/30"
                label={t("shared.toDate")}
                labelPlacement="outside"
                classNames={{
                  label: "text-xs !text-default-600",
                }}
                className="w-full"
              />
            </div>

            <div>
              <label className="block mb-2 text-default-600 text-xs">
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
