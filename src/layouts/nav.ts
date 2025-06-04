import type { NavItem } from "@/types/nav";
import i18n from "@/translations";

const nav = (workspace: string) => {
  return [
    {
      label: i18n.t("title.dashboard"),
      href: `/${workspace}/dashboard`,
      icon: "solar:home-2-outline",
      disabled: false,
    },
    {
      label: i18n.t("title.expertRequests"),
      href: `/${workspace}/expert-requests`,
      icon: "solar:inbox-outline",
      disabled: false,
    },
    {
      label: i18n.t("title.branchesAndAgencies"),
      href: `/${workspace}/branches-and-agencies`,
      icon: "solar:widget-2-outline",
      disabled: false,
    },
    {
      label: i18n.t("title.userManagement"),
      href: `/${workspace}/user-management`,
      icon: "solar:users-group-two-rounded-outline",
      disabled: false,
    },
  ] as NavItem[];
};

export { nav };
