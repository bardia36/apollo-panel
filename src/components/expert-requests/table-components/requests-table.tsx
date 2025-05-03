// modules
import { useCallback, useMemo, useState } from "react";
import { t } from "i18next";
import { Icon } from "@iconify/react/dist/iconify.js";
// components
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import {
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Chip } from "@heroui/chip";
import { User } from "@heroui/user";
import { Pagination } from "@heroui/pagination";
import DateDisplay from "../../shared/date-display";
// other
import { Request, RequestStatus } from "@/types/expertRequests";
import { AddOrReplaceKey, numberSplitter } from "@/utils/base";

const perPageNumbers = [5, 10, 15, 20];

export const columns = [
  {
    name: "ID",
    uid: "id",
    sortable: true,
    label: t("expertRequests.orderNumber"),
  },
  {
    name: "model",
    uid: "model",
    sortable: true,
    label: t("expertRequests.vehicleModel"),
  },
  { name: "status", uid: "status", sortable: true, label: t("shared.status") },
  { name: "user", uid: "user", sortable: true, label: t("shared.user") },
  {
    name: "created",
    uid: "created",
    sortable: true,
    label: t("shared.created"),
  },
  {
    name: "branch",
    uid: "branch",
    sortable: true,
    label: t("expertRequests.branch"),
  },
  { name: "actions", uid: "actions" },
];

// TODO: make it  from statusesMap
export const statusOptions = [
  { uid: "accepted", label: t("shared.accepted") },
  { uid: "archived", label: t("shared.archived") },
  { uid: "canceled", label: t("shared.canceled") },
  { uid: "expired", label: t("shared.expired") },
  { uid: "failed", label: t("shared.failed") },
  { uid: "inProgress", label: t("shared.inProgress") },
  { uid: "opened", label: t("shared.opened") },
  { uid: "pending", label: t("shared.pending") },
  { uid: "rejected", label: t("shared.rejected") },
];

// TODO: it is not completed yet, need to add more options from backend
const statusesMap: {
  [key in RequestStatus]: {
    bg: string;
    text: string;
    label: string;
  };
} = {
  ACCEPTED: {
    bg: "success bg-opacity-20",
    text: "success",
    label: t("shared.accepted"),
  },
  ARCHIVED: {
    bg: "default bg-opacity-40",
    text: "foreground-500",
    label: t("shared.archived"),
  },
  CANCELED: {
    bg: "default bg-opacity-40",
    text: "foreground-500",
    label: t("shared.canceled"),
  },
  EXPIRED: {
    bg: "default bg-opacity-40",
    text: "foreground-500",
    label: t("shared.expired"),
  },
  FAILED: {
    bg: "danger bg-opacity-20",
    text: "danger",
    label: t("shared.failed"),
  },
  IN_PROGRESS: {
    bg: "warning bg-opacity-20",
    text: "warning",
    label: t("shared.inProgress"),
  },
  OPENED: {
    bg: "warning bg-opacity-20",
    text: "warning",
    label: t("shared.opened"),
  },
  PENDING: {
    bg: "warning bg-opacity-20",
    text: "warning",
    label: t("shared.pending"),
  },
  REJECTED: {
    bg: "danger bg-opacity-20",
    text: "danger",
    label: t("shared.rejected"),
  },
  DRAFT: {
    bg: "success bg-opacity-20",
    text: "success",
    label: t("shared.draft"),
  },
  COMPLETED: {
    bg: "success bg-opacity-20",
    text: "success",
    label: t("shared.completed"),
  },
  REVIEWED: {
    bg: "success bg-opacity-20",
    text: "success",
    label: t("shared.reviewed"),
  },
};

const requests: Request[] = [
  {
    id: "EX_694843",
    model: { name: "207 SD", brand: "پژو" },
    user: {
      name: "متین شمسایی",
      image: "/public/favicon.svg",
      mobile: "09303061379",
    },
    status: "ACCEPTED",
    created: "2025-04-19T12:32:33.540504",
    branch: "علیرضا امینی منفرد",
  },
  {
    id: "EX_694844",
    model: { name: "207 SD", brand: "پژو" },
    user: {
      name: "متین شمسایی",
      image: "/public/favicon.svg",
      mobile: "09303061379",
    },
    status: "CANCELED",
    created: "2025-04-19T12:32:33.540504",
    branch: "علیرضا امینی منفرد",
  },
  {
    id: "EX_694845",
    model: { name: "207 SD", brand: "پژو" },
    user: {
      name: "متین شمسایی",
      image: "/public/favicon.svg",
      mobile: "09303061379",
    },
    status: "REJECTED",
    created: "2025-04-19T12:32:33.540504",
    branch: "علیرضا امینی منفرد",
  },
  {
    id: "EX_694846",
    model: { name: "207 SD", brand: "پژو" },
    user: {
      name: "متین شمسایی",
      image: "/public/favicon.svg",
      mobile: "09303061379",
    },
    status: "PENDING",
    created: "2025-04-19T12:32:33.540504",
    branch: "علیرضا امینی منفرد",
  },
];

export default function RequestsTable() {
  // states -
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string> | string>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState<{
    column: keyof Request;
    direction: string;
  }>({
    column: "id",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  // - states

  // variables -
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredRequests = [...requests];

    if (hasSearchFilter) {
      filteredRequests = filteredRequests.filter((request) =>
        request.model.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredRequests = filteredRequests.filter((request) =>
        Array.from(statusFilter).includes(request.status.toLowerCase())
      );
    }

    return filteredRequests;
  }, [requests, filterValue, statusFilter]);

  const totalPagesCount = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);
  // - variables

  // top content -
  const onRowsPerPageChange = useCallback((perPage: number) => {
    setRowsPerPage(perPage);
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else setFilterValue("");
  }, []);

  // const onClear = useCallback(() => {
  //   setFilterValue("");
  //   setPage(1);
  // }, []);

  const onSendToArchive = () => {
    console.log(selectedKeys);
  };

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Input
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
                <Icon
                  icon="solar:magnifer-linear"
                  className="text-default-400"
                />
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
                  onSelectionChange={setStatusFilter}
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
                  onSelectionChange={setVisibleColumns}
                >
                  {columns
                    .filter((column) => column.uid != "actions")
                    .map((column) => (
                      <DropdownItem key={column.uid}>
                        {column.label}
                      </DropdownItem>
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
          <span className="text-default-400 text-small">
            <span className="me-1">
              {t("shared.total")} {numberSplitter(requests.length, "/")}
            </span>
            {t("expertRequests.request")}
          </span>

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
                {perPageNumbers.map((pageSize: number) => (
                  <DropdownItem
                    key={pageSize}
                    className="hover:bg-default-200 text-default-foreground"
                    onPress={() => onRowsPerPageChange(pageSize)}
                  >
                    {String(pageSize)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    requests.length,
    onSearchChange,
    hasSearchFilter,
  ]);
  // - top content

  // bottom content -
  const onNextPage = useCallback(() => {
    if (page < totalPagesCount) setPage(page + 1);
  }, [page, totalPagesCount]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? t("shared.allItemsSelected")
            : t("shared.selectedItemsCount", {
                selectedItems:
                  selectedKeys instanceof Set ? selectedKeys.size : 0,
                allItems: filteredItems.length,
              })}
        </span>

        <Pagination
          isCompact
          showControls
          page={page}
          total={totalPagesCount}
          classNames={{
            cursor: "bg-content1-foreground text-content1",
            prev: "rotate-180 rounded-s-none !rounded-e-lg",
            chevronNext: "rotate-0",
          }}
          onChange={setPage}
        />

        <div className="hidden md:flex w-[30%] justify-end gap-[0.625rem]">
          <Button
            isDisabled={totalPagesCount === 1 || page === 1}
            size="sm"
            isIconOnly
            variant="flat"
            onPress={onPreviousPage}
          >
            <Icon icon="mynaui:chevron-right" />
          </Button>

          <Button
            isDisabled={totalPagesCount === 1 || page === totalPagesCount}
            size="sm"
            variant="flat"
            endContent={<Icon icon="mynaui:chevron-left" />}
            onPress={onNextPage}
          >
            {t("shared.nextPage")}
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, totalPagesCount, hasSearchFilter]); // - bottom content

  // table data -
  const renderCell = useCallback(
    (
      request: Request,
      columnKey: keyof AddOrReplaceKey<Request, "actions", string>
    ) => {
      let cellValue;
      if (columnKey === "actions") cellValue = "actions";
      else cellValue = request[columnKey];

      switch (columnKey) {
        case "id":
          return <span className="text-default-500">{request.id}</span>;

        case "model":
          return (
            <>
              <div className="text-default-foreground mb-1">
                {request.model.name}
              </div>
              <div className="text-default-500">{request.model.brand}</div>
            </>
          );

        case "status":
          return (
            <Chip
              className={`bg-${statusesMap[request.status].bg} text-${statusesMap[request.status].text}`}
              size="sm"
              variant="flat"
            >
              {statusesMap[request.status].label}
            </Chip>
          );

        case "user":
          return (
            <User
              avatarProps={{ radius: "md", src: request.user.image }}
              description={
                <div className="text-content4-foreground">
                  {request.user.mobile}
                </div>
              }
              name={
                <div className="text-default-500 mb-1">{request.user.name}</div>
              }
            />
          );

        case "branch":
          return (
            <div className="flex gap-1 text-default-foreground">
              <Icon
                icon="solar:users-group-rounded-bold"
                width={20}
                height={20}
                className="text-default-200"
              />
              {request.branch}
            </div>
          );

        case "created":
          return <DateDisplay isoDate={request.created} />;

        case "actions":
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <Icon
                      icon="mdi:dots-vertical"
                      width={20}
                      height={20}
                      className="text-default-500"
                    />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu>
                  <DropdownItem key="edit">{t("shared.edit")}</DropdownItem>
                  <DropdownItem key="delete">{t("shared.delete")}</DropdownItem>
                </DropdownMenu>
              </Dropdown>

              <Button
                isIconOnly
                size="sm"
                variant="solid"
                radius="full"
                className="bg-default bg-opacity-40"
              >
                <Icon icon="tabler:eye-filled" width={20} height={20} />
              </Button>
            </div>
          );
        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <Table
      isHeaderSticky
      aria-label="Expert Requests Table"
      bottomContent={bottomContent}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        emptyContent={t("expertRequests.noRequestFound")}
        items={sortedItems}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
  // - table data
}
