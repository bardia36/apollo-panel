import {
  StatusesMap,
  StatusOptions,
  TableColumns,
} from "@/types/expert-requests";
import { t } from "i18next";

export const columns: TableColumns = [
  {
    name: "order_number",
    uid: "order_number",
    sortable: true,
    label: t("expertRequests.orderNumber"),
  },
  {
    name: "inspection_data",
    uid: "inspection_data",
    sortable: true,
    label: t("expertRequests.vehicleModel"),
  },
  { name: "status", uid: "status", sortable: true, label: t("shared.status") },
  { name: "owner", uid: "owner", sortable: true, label: t("shared.user") },
  {
    name: "createdAt",
    uid: "createdAt",
    sortable: true,
    label: t("shared.createdAt"),
  },
  {
    name: "unit",
    uid: "unit",
    sortable: true,
    label: t("expertRequests.branch"),
  },
  { name: "actions", uid: "actions" },
];

// TODO: make it from statusesMap inside renderCell
export const statusOptions: StatusOptions = [
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
export const statusesMap: StatusesMap = {
  DRAFT: {
    bg: "foreground-50 border border-foreground-200 border-dashed",
    text: "default-500",
    label: t("shared.draft"),
    icon: "solar:pen-2-bold",
  },
  PENDING: {
    bg: "warning bg-opacity-20",
    text: "warning",
    label: t("shared.pending"),
    icon: "tabler:clock-filled",
  },
  OPENED: {
    bg: "warning bg-opacity-20",
    text: "warning",
    label: t("shared.opened"),
    icon: "solar:eye-bold",
  },
  IN_PROGRESS: {
    bg: "warning bg-opacity-20",
    text: "warning",
    label: t("shared.inProgress"),
    icon: "tabler:clock-filled",
  },
  COMPLETED: {
    bg: "primary bg-opacity-20",
    text: "primary",
    label: t("shared.completed"),
    icon: "eva:flash-fill",
  },
  REVIEWED: {
    bg: "primary bg-opacity-20 border border-primary-200 border-dashed",
    text: "primary",
    label: t("shared.reviewed"),
    icon: "eva:flash-fill",
  },
  ACCEPTED: {
    bg: "success bg-opacity-20",
    text: "success",
    label: t("shared.accepted"),
    icon: "material-symbols:check-circle-rounded",
  },
  REJECTED: {
    bg: "danger bg-opacity-20",
    text: "danger",
    label: t("shared.rejected"),
    icon: "mingcute:minus-circle-fill",
  },
  FAILED: {
    bg: "danger bg-opacity-20",
    text: "danger",
    label: t("shared.failed"),
    icon: "flowbite:exclamation-circle-solid",
  },
  EXPIRED: {
    bg: "default bg-opacity-40",
    text: "foreground-500",
    label: t("shared.expired"),
    icon: "mage:exclamation-hexagon-fill",
  },
  CANCELED: {
    bg: "default bg-opacity-40",
    text: "foreground-500",
    label: t("shared.canceled"),
    icon: "mynaui:x-square-solid",
  },
  ARCHIVED: {
    bg: "default bg-opacity-40",
    text: "foreground-500",
    label: t("shared.archived"),
    icon: "solar:bookmark-circle-bold",
  },
};
