import React, { useCallback, useMemo, useState } from "react";
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
import { t } from "i18next";
import { Request } from "@/types/expertRequests";
import { Icon } from "@iconify/react/dist/iconify.js";

export const columns = [
  {
    name: "ID",
    uid: "id",
    sortable: true,
    label: t("expertRequests.orderNumber"),
  },
  {
    name: "model",
    uid: "name",
    sortable: true,
    label: t("expertRequests.vehicleModel"),
  },
  { name: "status", uid: "age", sortable: true, label: t("shared.status") },
  { name: "user", uid: "role", sortable: true, label: t("shared.user") },
  { name: "created", uid: "team", label: t("shared.created") },
  { name: "branch", uid: "email", label: t("expertRequests.branch") },
  { name: "actions", uid: "actions" },
];

// TODO: add types for statusOptions, add all options
export const statusOptions = [
  { uid: "accepted", label: t("shared.accepted") },
  { uid: "canceled", label: t("shared.canceled") },
  { uid: "inProgress", label: t("shared.inProgress") },
  { uid: "pending", label: t("shared.pending") },
];

const statusColorMap = {
  accepted: "success",
  canceled: "danger",
  inProgress: "warning",
  pending: "warning",
};

const perPageNumbers = [5, 10, 15, 20];

// export const users = [
//   {
//     id: 1,
//     name: "Tony Reichert",
//     role: "CEO",
//     team: "Management",
//     status: "active",
//     age: "29",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//     email: "tony.reichert@example.com",
//   },
//   {
//     id: 2,
//     name: "Zoey Lang",
//     role: "Tech Lead",
//     team: "Development",
//     status: "paused",
//     age: "25",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//     email: "zoey.lang@example.com",
//   },
//   {
//     id: 3,
//     name: "Jane Fisher",
//     role: "Sr. Dev",
//     team: "Development",
//     status: "active",
//     age: "22",
//     avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
//     email: "jane.fisher@example.com",
//   },
//   {
//     id: 4,
//     name: "William Howard",
//     role: "C.M.",
//     team: "Marketing",
//     status: "vacation",
//     age: "28",
//     avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
//     email: "william.howard@example.com",
//   },
//   {
//     id: 5,
//     name: "Kristen Copper",
//     role: "S. Manager",
//     team: "Sales",
//     status: "active",
//     age: "24",
//     avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
//     email: "kristen.cooper@example.com",
//   },
//   {
//     id: 6,
//     name: "Brian Kim",
//     role: "P. Manager",
//     team: "Management",
//     age: "29",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//     email: "brian.kim@example.com",
//     status: "Active",
//   },
//   {
//     id: 7,
//     name: "Michael Hunt",
//     role: "Designer",
//     team: "Design",
//     status: "paused",
//     age: "27",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29027007d",
//     email: "michael.hunt@example.com",
//   },
//   {
//     id: 8,
//     name: "Samantha Brooks",
//     role: "HR Manager",
//     team: "HR",
//     status: "active",
//     age: "31",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e27027008d",
//     email: "samantha.brooks@example.com",
//   },
//   {
//     id: 9,
//     name: "Frank Harrison",
//     role: "F. Manager",
//     team: "Finance",
//     status: "vacation",
//     age: "33",
//     avatar: "https://i.pravatar.cc/150?img=4",
//     email: "frank.harrison@example.com",
//   },
//   {
//     id: 10,
//     name: "Emma Adams",
//     role: "Ops Manager",
//     team: "Operations",
//     status: "active",
//     age: "35",
//     avatar: "https://i.pravatar.cc/150?img=5",
//     email: "emma.adams@example.com",
//   },
//   {
//     id: 11,
//     name: "Brandon Stevens",
//     role: "Jr. Dev",
//     team: "Development",
//     status: "active",
//     age: "22",
//     avatar: "https://i.pravatar.cc/150?img=8",
//     email: "brandon.stevens@example.com",
//   },
//   {
//     id: 12,
//     name: "Megan Richards",
//     role: "P. Manager",
//     team: "Product",
//     status: "paused",
//     age: "28",
//     avatar: "https://i.pravatar.cc/150?img=10",
//     email: "megan.richards@example.com",
//   },
//   {
//     id: 13,
//     name: "Oliver Scott",
//     role: "S. Manager",
//     team: "Security",
//     status: "active",
//     age: "37",
//     avatar: "https://i.pravatar.cc/150?img=12",
//     email: "oliver.scott@example.com",
//   },
//   {
//     id: 14,
//     name: "Grace Allen",
//     role: "M. Specialist",
//     team: "Marketing",
//     status: "active",
//     age: "30",
//     avatar: "https://i.pravatar.cc/150?img=16",
//     email: "grace.allen@example.com",
//   },
//   {
//     id: 15,
//     name: "Noah Carter",
//     role: "IT Specialist",
//     team: "I. Technology",
//     status: "paused",
//     age: "31",
//     avatar: "https://i.pravatar.cc/150?img=15",
//     email: "noah.carter@example.com",
//   },
//   {
//     id: 16,
//     name: "Ava Perez",
//     role: "Manager",
//     team: "Sales",
//     status: "active",
//     age: "29",
//     avatar: "https://i.pravatar.cc/150?img=20",
//     email: "ava.perez@example.com",
//   },
//   {
//     id: 17,
//     name: "Liam Johnson",
//     role: "Data Analyst",
//     team: "Analysis",
//     status: "active",
//     age: "28",
//     avatar: "https://i.pravatar.cc/150?img=33",
//     email: "liam.johnson@example.com",
//   },
//   {
//     id: 18,
//     name: "Sophia Taylor",
//     role: "QA Analyst",
//     team: "Testing",
//     status: "active",
//     age: "27",
//     avatar: "https://i.pravatar.cc/150?img=29",
//     email: "sophia.taylor@example.com",
//   },
//   {
//     id: 19,
//     name: "Lucas Harris",
//     role: "Administrator",
//     team: "Information Technology",
//     status: "paused",
//     age: "32",
//     avatar: "https://i.pravatar.cc/150?img=50",
//     email: "lucas.harris@example.com",
//   },
//   {
//     id: 20,
//     name: "Mia Robinson",
//     role: "Coordinator",
//     team: "Operations",
//     status: "active",
//     age: "26",
//     avatar: "https://i.pravatar.cc/150?img=45",
//     email: "mia.robinson@example.com",
//   },
// ];

const users: Request[] = [
  {
    id: "EX_694843",
    model: "Tony Reichert",
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
    model: "Zoey Lang",
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
    model: "Jane Fisher",
    user: {
      name: "متین شمسایی",
      image: "/public/favicon.svg",
      mobile: "09303061379",
    },
    status: "IN_PROGRESS",
    created: "2025-04-19T12:32:33.540504",
    branch: "علیرضا امینی منفرد",
  },
  {
    id: "EX_694846",
    model: "William Howard",
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
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Set<string> | string>(
    new Set([])
  );
  const [visibleColumns, setVisibleColumns] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.model.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

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

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    // ID;
    // model;
    // status;
    // user;
    // created;
    // branch;
    // actions;
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small">{cellValue}</p>
            <p className="text-bold text-tiny text-default-400">{user.team}</p>
          </div>
        );
      case "status":
        return (
          <Chip color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <Icon icon="mdi:dots-vertical" />
                </Button>
              </DropdownTrigger>

              <DropdownMenu>
                <DropdownItem key="view">View</DropdownItem>
                <DropdownItem key="edit">Edit</DropdownItem>
                <DropdownItem key="delete">Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

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

  const sendToArchive = () => {
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
                  onPress={() => sendToArchive()}
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
            {/* // TODO: add splitter by / */}
            {t("shared.total")} {users.length} {t("expertRequests.request")}
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
    users.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? t("shared.allItemsSelected")
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>

        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />

        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>

          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <Table
      isHeaderSticky
      aria-label="Example table with custom cells, pagination and sorting"
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
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
            {column.name}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody emptyContent={"No users found"} items={sortedItems}>
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
}
