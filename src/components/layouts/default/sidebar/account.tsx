import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/stores/auth-store";
import { accountApi } from "@/services/api/auth";
import { exceptionHandler } from "@/services/api/exception";

// components
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { toast } from "@/utils/toast";
import UserImage from "@/components/shared/user-image";
import { truncateString } from "@/utils/base";

export default function Account() {
  const { t } = useTranslation();
  const { auth, removeAuth } = useAuthStore();
  const navigate = useNavigate();
  const [cookie, _, removeCookie] = useCookies(["AUTH"]);

  async function logout() {
    try {
      await accountApi.logout();

      removeAuth();
      if (cookie.AUTH) removeCookie("AUTH");
      navigate("/login");
      toast({ color: "success", title: t("auth.logoutSuccessfully") });
    } catch (err) {
      exceptionHandler(err);
    }
  }

  return (
    <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
      <div className="flex items-center">
        <UserImage imgClass="min-w-10 w-10 min-h-10 h-10" />

        <div>
          {auth?.profile.userName && (
            <p className="text-small text-foreground">
              {truncateString(auth?.profile.userName, 15)}
            </p>
          )}
          {auth?.profile?.role?.name && (
            <p className="text-tiny font-bold text-foreground-400">
              {auth?.profile?.role?.name}
            </p>
          )}
        </div>
      </div>

      <Dropdown placement="top-end">
        <DropdownTrigger>
          <button className="bg-default-100 p-1 rounded-small">
            <Icon
              icon="solar:menu-dots-bold"
              className="text-default-400"
              width={16}
              height={16}
            />
          </button>
        </DropdownTrigger>

        <DropdownMenu aria-label="Profile Actions">
          <DropdownItem
            key="logout"
            color="danger"
            className="text-danger"
            onPress={logout}
          >
            <span className="flex items-center gap-2">
              <Icon icon="solar:logout-3-linear" width={20} height={20} />

              {t("auth.logout")}
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
