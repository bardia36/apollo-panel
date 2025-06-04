import { StatusesMap, StatusOption } from "@/types/workspace";
import { t } from "i18next";

export const statusOptions: StatusOption[] = [
  { uid: "ACTIVE", label: t("workspaces.active") },
  { uid: "TRIAL", label: t("workspaces.trial") },
  { uid: "SUSPENDED", label: t("workspaces.suspended") },
  { uid: "CANCELED", label: t("workspaces.canceled") },
  { uid: "EXPIRED", label: t("workspaces.expired") },
  { uid: "DELETED", label: t("workspaces.deleted") },
  { uid: "ARCHIVED", label: t("workspaces.archived") },
];

export const statusesMap: StatusesMap = {
  ACTIVE: {
    fadedBg: "success-50",
    bg: "success bg-opacity-20",
    text: "success",
    label: t("shared.active"),
    icon: "solar:check-circle-bold",
  },
  TRIAL: {
    fadedBg: "primary-50",
    bg: "primary bg-opacity-20",
    text: "primary",
    label: t("shared.trial"),
    icon: "solar:pen-2-bold",
  },
  SUSPENDED: {
    fadedBg: "primary-50",
    bg: "primary bg-opacity-20",
    text: "primary",
    label: t("shared.suspended"),
    icon: "solar:pen-2-bold",
  },
  CANCELED: {
    fadedBg: "primary-50",
    bg: "primary bg-opacity-20",
    text: "primary",
    label: t("shared.canceled"),
    icon: "solar:pen-2-bold",
  },
  EXPIRED: {
    fadedBg: "primary-50",
    bg: "primary bg-opacity-20",
    text: "primary",
    label: t("shared.expired"),
    icon: "solar:pen-2-bold",
  },
  DELETED: {
    fadedBg: "primary-50",
    bg: "primary bg-opacity-20",
    text: "primary",
    label: t("shared.deleted"),
    icon: "solar:pen-2-bold",
  },
  ARCHIVED: {
    fadedBg: "primary-50",
    bg: "primary bg-opacity-20",
    text: "primary",
    label: t("shared.archived"),
    icon: "solar:pen-2-bold",
  },
};
