import { StatusesMap, StatusOptions, TableColumns } from "@/types/expertRequests";
import { t } from "i18next";

export const columns: TableColumns = [
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
