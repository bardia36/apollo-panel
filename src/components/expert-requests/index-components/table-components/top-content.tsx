import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { t } from "i18next";
import { numberSplitter } from "@/utils/base";
import { SetStateAction, useState } from "react";
import { ExpertRequestInfo } from "@/types/expert-requests";
import { Key } from "@react-types/shared";
import { AppInput } from "@/components/shared/app-components/app-input";
import { exportToExcel } from "@/utils/excel";
import { columns, statusesMap, statusOptions } from "../../constants";
import { formatDate } from "@/utils/base";
import { ReportModal } from "../report-modal";

type TopContentProps = {
  filterValue: string;
  statusFilter: string | Key[];
  visibleColumns: string | Key[];
  requestDocs: ExpertRequestInfo[];
  rowsPerPage: number;
  onSearchChange: (value: string) => void;
  setStatusFilter: (value: SetStateAction<string | Key[]>) => void;
  setVisibleColumns: (value: SetStateAction<string | Key[]>) => void;
  onRowsPerPageChange: (value: number) => void;
  setSelectedKeys: (value: Set<string>) => void;
  onSendToArchive: () => void;
  activeTab: string;
};

export const TopContent = ({
  filterValue,
  statusFilter,
  visibleColumns,
  requestDocs,
  rowsPerPage,
  onSearchChange,
  setStatusFilter,
  setVisibleColumns,
  onRowsPerPageChange,
  setSelectedKeys,
  onSendToArchive,
  activeTab,
}: TopContentProps) => {
  const perPageNumbers = [5, 10, 15, 20];
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const exportTableToExcel = () => {
    const exportData = requestDocs.map((doc) => ({
      [t("expertRequests.orderNumber")]: doc.order_number,
      [t("expertRequests.vehicleModel")]:
        doc.inspection_data?.vehicle_model?.name_en || "",
      [t("shared.status")]: statusesMap[doc.status].label,
      [t("shared.user")]: doc.owner?.username || "",
      [t("shared.createdAt")]: formatDate(doc.createdAt).formattedDate,
      [t("expertRequests.branch")]: doc.unit?.title || "",
    }));

    exportToExcel({
      data: exportData,
      filename: t("title.expertRequests"),
      sheetName: t("title.expertRequests"),
    });
  };

  return (
    <div className="flex flex-col gap-4 sticky top-0 start-0">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <AppInput
            className="w-full lg:min-w-[272px] sm:max-w-[44%] lg:max-w-[100%]"
            classNames={{
              input:
                "bg-transparent text-default-500 dark:text-default-500 placeholder:text-default-500 dark:placeholder:text-default-500",
              innerWrapper: "bg-transparent",
              inputWrapper:
                "bg-default-100 dark:bg-default-100 text-default-500",
            }}
            placeholder={t("shared.search")}
            endContent={
              <Icon icon="solar:magnifer-linear" className="text-default-400" />
            }
            debounce
            value={filterValue}
            onValueChange={onSearchChange}
          />

          <div className="flex items-center gap-4">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  variant="flat"
                  className="gap-3 bg-default-100 px-3 text-default-800"
                  startContent={
                    <Icon
                      icon="mdi:chevron-down"
                      width={16}
                      height={16}
                      className="text-default-400"
                    />
                  }
                >
                  {t("shared.status")}
                </Button>
              </DropdownTrigger>

              <DropdownMenu
                disallowEmptySelection
                aria-label="Data Statuses"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={(keys) => setStatusFilter(Array.from(keys))}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid}>{status.label}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  variant="flat"
                  className="gap-3 bg-default-100 px-3 text-default-800"
                  startContent={
                    <Icon
                      icon="solar:sort-horizontal-linear"
                      width={16}
                      height={16}
                      className="text-default-400"
                    />
                  }
                >
                  {t("shared.columns")}
                </Button>
              </DropdownTrigger>

              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={(keys) =>
                  setVisibleColumns(Array.from(keys))
                }
              >
                {columns
                  .filter((column) => column.uid != "actions")
                  .map((column) => (
                    <DropdownItem key={column.uid}>{column.label}</DropdownItem>
                  ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>

        <div className="flex gap-3">
          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                variant="flat"
                className="gap-3 bg-default-100 px-3 text-default-800"
                startContent={
                  <Icon
                    icon="mdi:chevron-down"
                    width={16}
                    height={16}
                    className="text-default-400"
                  />
                }
              >
                {t("shared.bulkActions")}
              </Button>
            </DropdownTrigger>

            <DropdownMenu disallowEmptySelection aria-label="Bulk Actions">
              <DropdownItem
                key="discard-selection"
                startContent={
                  <Icon
                    icon="solar:close-square-bold"
                    width={18}
                    height={18}
                    className="text-default-600"
                  />
                }
                className="hover:bg-default-200 text-default-foreground"
                onPress={() => setSelectedKeys(new Set([]))}
              >
                {t("shared.discardSelections")}
              </DropdownItem>

              {activeTab !== "archive" ? (
                <DropdownItem
                  key="send-to-archive"
                  startContent={
                    <Icon
                      icon="solar:bookmark-circle-bold"
                      width={18}
                      height={18}
                      className="text-default-600"
                    />
                  }
                  className="hover:bg-default-200 text-default-foreground"
                  onPress={() => onSendToArchive()}
                >
                  {t("expertRequests.sendToArchive")}
                </DropdownItem>
              ) : null}
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button isIconOnly className="bg-default-100">
                <Icon
                  icon="mdi:dots-horizontal"
                  width={20}
                  height={20}
                  className="text-default-500"
                />
              </Button>
            </DropdownTrigger>

            <DropdownMenu disallowEmptySelection aria-label="More Actions">
              <DropdownItem
                key="get-report"
                className="hover:bg-default-200 text-default-foreground"
                onPress={() => setIsReportModalOpen(true)}
              >
                {t("expertRequests.getReport")}
              </DropdownItem>

              <DropdownItem
                key="table-excel-export"
                className="hover:bg-default-200 text-default-foreground"
                onPress={() => exportTableToExcel()}
              >
                {t("expertRequests.tableExcelExport")}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="flex justify-between items-center">
        {
          <span className="text-default-400 text-small">
            <span className="me-1">
              {t("shared.total")} {numberSplitter(requestDocs.length, "/")}
            </span>
            {t("expertRequests.request")}
          </span>
        }

        <div className="flex items-center">
          <label className="flex items-center text-default-400 text-small">
            {t("shared.countPerPage")}
          </label>

          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                variant="light"
                isIconOnly
                className="ms-2 text-foreground"
                endContent={
                  <Icon
                    icon="mdi:chevron-down"
                    width={16}
                    height={16}
                    className="ms-2 text-foreground"
                  />
                }
              >
                {rowsPerPage}
              </Button>
            </DropdownTrigger>

            <DropdownMenu
              disallowEmptySelection
              aria-label="Rows per page dropdown"
            >
              {perPageNumbers.map((perPageNum: number) => (
                <DropdownItem
                  key={perPageNum}
                  className="hover:bg-default-200 text-default-foreground"
                  onPress={() => onRowsPerPageChange(perPageNum)}
                >
                  {String(perPageNum)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />
    </div>
  );
};
