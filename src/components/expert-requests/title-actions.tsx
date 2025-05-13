import { Image } from "@heroui/react";
import { Badge } from "@heroui/react";
import { t } from "i18next";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import requestsHeaderIcon from "@/assets/images/expert-requests/requests-header-icon.svg";
import requestsHeaderIconDark from "@/assets/images/expert-requests/requests-header-icon-dark.svg";
import { useTheme } from "@heroui/use-theme";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { TemplatesModal } from "./templates";
import { CreateRequestModal } from "./create-request";

type Props = {
  requestsCount: number;
};

export default ({ requestsCount }: Props) => {
  const { theme } = useTheme();

  return (
    <div className="pt-3 mb-4 flex justify-between">
      <div className="flex flex-wrap items-center w-full xl:py-1.5">
        <Image
          src={theme === "dark" ? requestsHeaderIconDark : requestsHeaderIcon}
          alt={t("expertRequests.requestsManagement")}
          className="hidden xl:block me-4"
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
              content={requestsCount}
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
                <Icon
                  icon="lineicons:gear-1"
                  width={18}
                  height={18}
                  className="text-default-600 me-3"
                />

                {t("shared.settings")}
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
        <Button variant="light" className="text-default-foreground me-2.5">
          <Icon
            icon="lineicons:gear-1"
            width={20}
            height={20}
            className="text-default-500"
          />

          {t("shared.settings")}
        </Button>

        <Button variant="flat" className="text-default-foreground me-2.5">
          <Icon
            icon="bx:sort"
            width={20}
            height={20}
            className="text-default-500"
          />

          {t("shared.changeStatus")}
        </Button>

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
