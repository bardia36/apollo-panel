import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";
import { t } from "i18next";
import { numberSplitter } from "@/utils/base";
import { SetStateAction } from "react";
import {
  ExpertRequestInfo,
  StatusOptions,
  TableColumns,
} from "@/types/expertRequests";
import { Key } from "@react-types/shared";
import { AppInput } from "@/components/shared/app-components/app-input";

type TopContentProps = {
  filterValue: string;
  statusFilter: string | Key[];
  visibleColumns: string | Key[];
  statusOptions: StatusOptions;
  columns: TableColumns;
  requestDocs: ExpertRequestInfo[];
  rowsPerPage: number;
  onSearchChange: (value: string) => void;
  setStatusFilter: (value: SetStateAction<string | Key[]>) => void;
  setVisibleColumns: (value: SetStateAction<string | Key[]>) => void;
  onRowsPerPageChange: (value: number) => void;
  setSelectedKeys: (value: Set<string>) => void;
  onSendToArchive: () => void;
};

export const TopContent = ({
  filterValue,
  statusFilter,
  statusOptions,
  visibleColumns,
  columns,
  requestDocs,
  rowsPerPage,
  onSearchChange,
  setStatusFilter,
  setVisibleColumns,
  onRowsPerPageChange,
  setSelectedKeys,
  onSendToArchive,
}: TopContentProps) => {
  const perPageNumbers = [5, 10, 15, 20];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <AppInput
            className="w-full sm:max-w-[44%] lg:max-w-[100%] lg:min-w-[272px]"
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
            value={filterValue}
            onValueChange={onSearchChange}
          />

          <div className="flex items-center gap-4">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  variant="flat"
                  className="px-3 gap-3 text-default-800 bg-default-100"
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
                  className="px-3 gap-3 text-default-800 bg-default-100"
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
                className="px-3 gap-3 text-default-800 bg-default-100"
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

            <DropdownMenu
              disallowEmptySelection
              aria-label="Bulk Actions"
              selectedKeys={visibleColumns}
            >
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
            </DropdownMenu>
          </Dropdown>

          <Button isIconOnly className="bg-default-100">
            <Icon
              icon="mdi:dots-horizontal"
              width={20}
              height={20}
              className="text-default-500"
            />
          </Button>
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
                className="text-foreground ms-2"
                endContent={
                  <Icon
                    icon="mdi:chevron-down"
                    width={16}
                    height={16}
                    className="text-foreground ms-2"
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
    </div>
  );
};
