import {
  StatusesMap,
  StatusOption,
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
export const statusOptions: StatusOption[] = [
  { uid: "ACCEPTED", label: t("shared.accepted") },
  { uid: "ARCHIVED", label: t("shared.archived") },
  { uid: "CANCELED", label: t("shared.canceled") },
  { uid: "EXPIRED", label: t("shared.expired") },
  { uid: "FAILED", label: t("shared.failed") },
  { uid: "IN_PROGRESS", label: t("shared.inProgress") },
  { uid: "OPENED", label: t("shared.opened") },
  { uid: "PENDING", label: t("shared.pending") },
  { uid: "REJECTED", label: t("shared.rejected") },
  { uid: "REVIEWED", label: t("shared.reviewed") },
  { uid: "COMPLETED", label: t("shared.completed") },
  { uid: "DRAFT", label: t("shared.draft") },
];

export const statusesMap: StatusesMap = {
  DRAFT: {
    fadedBg: 'foreground-50',
    bg: "foreground-50 border border-foreground-200 border-dashed",
    text: "default-500",
    label: t("shared.draft"),
    icon: "solar:pen-2-bold",
  },
  PENDING: {
    fadedBg: 'warning-50',
    bg: "warning bg-opacity-20",
    text: "warning",
    label: t("shared.pending"),
    icon: "tabler:clock-filled",
  },
  OPENED: {
    fadedBg: 'warning-50',
    bg: "warning bg-opacity-20",
    text: "warning",
    label: t("shared.opened"),
    icon: "solar:eye-bold",
  },
  IN_PROGRESS: {
    fadedBg: 'warning-50',
    bg: "warning bg-opacity-20",
    text: "warning",
    label: t("shared.inProgress"),
    icon: "tabler:clock-filled",
  },
  COMPLETED: {
    fadedBg: 'primary-50',
    bg: "primary bg-opacity-20",
    text: "primary",
    label: t("shared.completed"),
    icon: "eva:flash-fill",
  },
  REVIEWED: {
    fadedBg: 'primary-50',
    bg: "primary bg-opacity-20 border border-primary-200 border-dashed",
    text: "primary",
    label: t("shared.reviewed"),
    icon: "eva:flash-fill",
  },
  ACCEPTED: {
    fadedBg: 'success-50',
    bg: "success bg-opacity-20",
    text: "success",
    label: t("shared.accepted"),
    icon: "material-symbols:check-circle-rounded",
  },
  REJECTED: {
    fadedBg: 'danger-50',
    bg: "danger bg-opacity-20",
    text: "danger",
    label: t("shared.rejected"),
    icon: "mingcute:minus-circle-fill",
  },
  FAILED: {
    fadedBg: 'danger-50',
    bg: "danger bg-opacity-20",
    text: "danger",
    label: t("shared.failed"),
    icon: "flowbite:exclamation-circle-solid",
  },
  EXPIRED: {
    fadedBg: 'default-50',
    bg: "default bg-opacity-40",
    text: "foreground-500",
    label: t("shared.expired"),
    icon: "mage:exclamation-hexagon-fill",
  },
  CANCELED: {
    fadedBg: 'default-50',
    bg: "default bg-opacity-40",
    text: "foreground-500",
    label: t("shared.canceled"),
    icon: "mynaui:x-square-solid",
  },
  ARCHIVED: {
    fadedBg: "default-50",
    bg: "default bg-opacity-40",
    text: "foreground-500",
    label: t("shared.archived"),
    icon: "solar:bookmark-circle-bold",
  },
};
