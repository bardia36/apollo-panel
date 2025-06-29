import { t } from "i18next";
import { Icon } from "@iconify/react/dist/iconify.js";
import requestsHeaderIcon from "@/assets/images/expert-requests/requests-header-icon.webp";
import requestsHeaderIconDark from "@/assets/images/expert-requests/requests-header-icon-dark.webp";
import { useTheme } from "@heroui/use-theme";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Button,
  Badge,
  Image,
} from "@heroui/react";
import { TemplatesModal } from "./templates";
import { CreateRequestModal } from "../create-request";
import { Settings } from "./settings";
import { useQuery } from "@tanstack/react-query";
import { expertRequestsApi } from "@/apis/expert-requests";

export default () => {
  const { theme } = useTheme();

  const { data: pendingRequestsCount } = useQuery({
    queryKey: ["expert-requests-count"],
    queryFn: () => expertRequestsApi.getRequestsCount({ status: "PENDING" }),
  });

  return (
    <div className="pt-3 mb-4 flex justify-between">
      <div className="flex flex-wrap gap-4 items-center w-full xl:py-1.5">
        <Image
          src={theme === "dark" ? requestsHeaderIconDark : requestsHeaderIcon}
          alt={t("expertRequests.requestsManagement")}
          width={64}
          height={64}
          className="hidden xl:block"
        />

        <div>
          <div className="flex items-center">
            <h1 className="text-3xl text-foreground-900 me-4">
              <bdi className="me-2 hidden lg:inline-block">
                {t("expertRequests.management")}
              </bdi>
              <strong>{t("expertRequests.requests")}</strong>
            </h1>

            <Badge
              content={pendingRequestsCount || 0}
              children
              className="bg-default-foreground text-background"
            />
          </div>

          <p className="hidden lg:block text-foreground-500 mt-2.5">
            {t("expertRequests.requestsPageDescription")}
          </p>
        </div>

        <div className="xl:hidden ms-auto">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" isIconOnly size="sm" className="me-2">
                <Icon
                  icon="solar:menu-dots-bold"
                  width={20}
                  height={20}
                  className="text-default-500"
                />
              </Button>
            </DropdownTrigger>

            <DropdownMenu
              closeOnSelect={false}
              aria-label="Secondary Actions menu"
            >
              <DropdownItem
                key="templates"
                classNames={{
                  title: "text-default-foreground flex items-center",
                }}
              >
                <TemplatesModal
                  activator={
                    <div className="flex items-center">
                      <Icon
                        icon="solar:widget-bold"
                        width={18}
                        height={18}
                        className="text-default-600 me-3"
                      />

                      {t("expertRequests.templates")}
                    </div>
                  }
                />
              </DropdownItem>

              <DropdownItem
                key="settings"
                classNames={{
                  title: "text-default-foreground flex items-center",
                }}
              >
                <Settings
                  activator={
                    <div className="flex items-center">
                      <Icon
                        icon="lineicons:gear-1"
                        width={18}
                        height={18}
                        className="text-default-600 me-3"
                      />
                      {t("shared.settings")}
                    </div>
                  }
                />
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <CreateRequestModal
            activator={
              <Button
                variant="shadow"
                className="bg-foreground-900 text-foreground-50"
              >
                <Icon icon="mdi:plus-circle" width={20} height={20} />
                {t("shared.create")}
              </Button>
            }
          />
        </div>
      </div>

      <div className="hidden xl:flex items-end">
        <Settings className="text-default-foreground me-2.5" />

        <TemplatesModal
          activator={
            <Button variant="flat" className="text-default-foreground me-4">
              <Icon
                icon="solar:widget-bold"
                width={20}
                height={20}
                className="text-default-500"
              />

              {t("expertRequests.templates")}
            </Button>
          }
        />

        <CreateRequestModal
          activator={
            <Button
              variant="shadow"
              className="bg-foreground-900 text-foreground-50"
            >
              <Icon
                icon="mdi:plus-circle"
                width={20}
                height={20}
                className="text-foreground-50"
              />
              {t("expertRequests.createRequest")}
            </Button>
          }
        />
      </div>
    </div>
  );
};
