import type { NavItem } from "@/types/nav";
import i18n from "@/translations";

const nav: NavItem[] = [
  {
    label: i18n.t("title.dashboard"),
    href: "/dashboard",
    icon: "solar:home-2-outline",
    disabled: false,
  },
  {
    label: i18n.t("title.expertRequests"),
    href: "/expert-requests",
    icon: "solar:inbox-outline",
    disabled: false,
  },
  {
    label: i18n.t("title.branchesAndAgencies"),
    href: "/branches-and-agencies",
    icon: "solar:widget-2-outline",
    disabled: false,
  },
  {
    label: i18n.t("title.userManagement"),
    href: "/user-management",
    icon: "solar:users-group-two-rounded-outline",
    disabled: false,
  },
];

export { nav };
