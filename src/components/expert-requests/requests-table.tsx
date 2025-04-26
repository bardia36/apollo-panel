import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { User } from "@heroui/user";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import { t } from "i18next";
import { useCallback, useState } from "react";
import { Request } from "@/types/expertRequests";

const requests: Request[] = [
  {
    id: "EX_694843",
    model: "Tony Reichert",
    user: "CEO",
    status: "Active",
    created: "2025-04-19T12:32:33.540504",
    branch: "علیرضا امینی منفرد",
  },
  {
    id: "EX_694844",
    model: "Zoey Lang",
    user: "Technical Lead",
    status: "Paused",
    created: "2025-04-19T12:32:33.540504",
    branch: "علیرضا امینی منفرد",
  },
  {
    id: "EX_694845",
    model: "Jane Fisher",
    user: "Senior Developer",
    status: "Active",
    created: "2025-04-19T12:32:33.540504",
    branch: "علیرضا امینی منفرد",
  },
  {
    id: "EX_694846",
    model: "William Howard",
    user: "Community Manager",
    status: "Vacation",
    created: "2025-04-19T12:32:33.540504",
    branch: "علیرضا امینی منفرد",
  },
];

const columns = [
  { id: "id", label: t("expertRequests.orderNumber") },
  { key: "model", label: t("expertRequests.vehicleModel") },
  { key: "status", label: t("shared.status") },
  { key: "user", label: t("shared.user") },
  { key: "created", label: t("shared.created") },
  { key: "branch", label: t("expertRequests.branch") },
  { id: "actions" },
];

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function RequestsTable() {
  const [selectedKeys, setSelectedKeys] = useState([]);

  const renderCell = useCallback((user, columnKey: string) => {
    const cellValue = user[columnKey];

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
            <p className="text-bold text-sm capitalize">{cellValue}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                EyeIcon
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                EditIcon
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                DeleteIcon
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Controlled table example with dynamic content"
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      onSelectionChange={setSelectedKeys}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.id === "actions" ? "center" : "start"}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={requests}>
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
