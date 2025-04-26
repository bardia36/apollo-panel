import { Image } from "@heroui/image";
import { Badge } from "@heroui/badge";
import { t } from "i18next";
import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import requestsHeaderIcon from "@/assets/images/expert-requests/requests-header-icon.svg";
import requestsHeaderIconDark from "@/assets/images/expert-requests/requests-header-icon-dark.svg";
import { useTheme } from "@heroui/use-theme";

export default () => {
  const { theme } = useTheme();

  return (
    <div className="pt-3 mb-4 flex justify-between">
      <div className="flex items-center w-full xl:py-[0.375rem]">
        <Image
          src={theme === "dark" ? requestsHeaderIconDark : requestsHeaderIcon}
          alt={t("expertRequests.requestsManagement")}
          className="hidden xl:block me-4"
        />

        <div>
          <div className="flex items-center">
            <h1 className="text-3xl text-foreground-900">
              <bdi className="me-2 hidden lg:inline-block">
                {t("expertRequests.management")}
              </bdi>
              <strong>{t("expertRequests.requests")}</strong>
            </h1>

            <Badge
              content="0"
              children
              className="ms-4 bg-default-foreground text-background"
            />
          </div>

          <p className="hidden lg:block text-foreground-500 mt-[0.625rem]">
            {t("expertRequests.requestsPageDescription")}
          </p>
        </div>

        <div className="xl:hidden ms-auto">
          <Button variant="light" isIconOnly size="sm" className="me-2">
            <Icon
              icon="solar:menu-dots-bold"
              width={20}
              height={20}
              className="text-default-500"
            />
          </Button>

          <Button
            variant="shadow"
            className="bg-foreground-900 text-foreground-50"
          >
            <Icon icon="mdi:plus-circle" width={20} height={20} />
            {t("shared.create")}
          </Button>
        </div>
      </div>

      <div className="hidden xl:flex items-end">
        <Button
          variant="light"
          className="text-default-foreground me-[0.625rem]"
        >
          <Icon
            icon="lineicons:gear-1"
            width={20}
            height={20}
            className="text-default-500"
          />

          {t("shared.settings")}
        </Button>

        <Button
          variant="flat"
          className="text-default-foreground me-[0.625rem]"
        >
          <Icon
            icon="bx:sort"
            width={20}
            height={20}
            className="text-default-500"
          />

          {t("shared.changeStatus")}
        </Button>

        <Button variant="flat" className="text-default-foreground me-4">
          <Icon
            icon="solar:widget-bold"
            width={20}
            height={20}
            className="text-default-500"
          />

          {t("expertRequests.templates")}
        </Button>

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
      </div>
    </div>
  );
};
