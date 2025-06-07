import {
  Tabs,
  Tab,
  Button,
  cn,
  DropdownItem,
  DropdownMenu,
  Dropdown,
  DropdownTrigger,
} from "@heroui/react";
import { ExpertRequestDetail } from "@/types/expert-requests";
import { statusesMap } from "../constants";
import { Icon } from "@iconify/react";
import { formatDate, truncateString } from "@/utils/base";
import { t } from "i18next";
import { NeutralChip } from "@/components/shared/request-status-chip";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { RetrieveRequestModal } from "./actions/retrieve";
import { ChangeStatusModal } from "./actions/change-status";
import { SendInspectionLinkModal } from "./actions/send-inspection-link";

export const EditHeader = ({
  requestData,
  activeTab,
  onTabChange,
}: {
  requestData: ExpertRequestDetail;
  activeTab: string;
  onTabChange: (key: string) => void;
}) => {
  const statusMap = statusesMap[requestData.status];
  const { formattedTime, formattedDate } = formatDate(requestData.createdAt);
  const { isMdAndUp } = useBreakpoint();

  return (
    // TODO: FIX TABLET AND SMALL DESKTOPS RESPONSIVENESS
    <div className="flex flex-col gap-4 pt-3 md:px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4 order-1 md:order-none">
          <div
            className={cn(
              "hidden md:flex items-center justify-center w-16 h-16 rounded-large",
              `bg-${statusMap.fadedBg}`
            )}
          >
            <Icon
              icon={statusMap.icon}
              width={24}
              height={24}
              className={`text-${statusMap.text}`}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-3xl text-foreground-900">
                <span className="hidden md:inline">
                  {t("expertRequests.request")}
                </span>{" "}
                {t("expertRequests.code")}{" "}
                <span className="font-bold">
                  {isMdAndUp
                    ? requestData.req_id
                    : truncateString(requestData.req_id, 7)}
                </span>
              </span>

              <NeutralChip status={requestData.status} />
            </div>

            <span className="text-sm">
              <span className="text-default-400">
                {t("expertRequests.lastUpdate")}
              </span>
              <span className="text-default-600 ms-3">
                {formattedTime} - {formattedDate}
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto">
          {["COMPLETED", "REVIEWED"].includes(requestData.status) &&
            !isMdAndUp && (
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="light" isIconOnly>
                    <Icon
                      icon="solar:menu-dots-bold"
                      width={20}
                      height={20}
                      className="min-w-5"
                    />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu aria-label="More Actions">
                  <DropdownItem key="rejectRequest">
                    {requestData.status === "REVIEWED" && (
                      <Button
                        variant="light"
                        size="sm"
                        className="hidden md:flex text-default-foreground"
                      >
                        <Icon
                          icon="solar:clipboard-remove-bold"
                          width={20}
                          height={20}
                          className="text-foreground min-w-5"
                        />

                        {t("expertRequests.rejectRequest")}
                      </Button>
                    )}
                  </DropdownItem>

                  <DropdownItem key="lackOfEvidence">
                    <Button
                      variant="flat"
                      size="sm"
                      className="hidden md:flex text-default-foreground"
                    >
                      <Icon
                        icon="mdi:plus-circle"
                        width={20}
                        height={20}
                        className="text-foreground min-w-5"
                      />

                      {t("expertRequests.lackOfEvidence")}
                    </Button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}

          {requestData.status === "ARCHIVED" && (
            <RetrieveRequestModal
              status={requestData.status}
              code={requestData.req_id}
            />
          )}

          {[
            "CANCELED",
            "EXPIRED",
            "FAILED",
            "REJECTED",
            "ACCEPTED",
            "COMPLETED",
            "REVIEWED",
            "IN_PROGRESS",
            "OPENED",
            "PENDING",
            "DRAFT",
          ].includes(requestData.status) && (
            <ChangeStatusModal
              status={requestData.status}
              code={requestData.req_id}
            />
          )}

          {requestData.status === "REVIEWED" && (
            <Button
              variant="light"
              size="sm"
              className="hidden md:flex text-default-foreground"
            >
              <Icon
                icon="solar:clipboard-remove-bold"
                width={20}
                height={20}
                className="text-foreground min-w-5"
              />

              {t("expertRequests.rejectRequest")}
            </Button>
          )}

          {["COMPLETED", "REVIEWED"].includes(requestData.status) && (
            <Button
              variant="flat"
              size="sm"
              className="hidden md:flex text-default-foreground"
            >
              <Icon
                icon="mdi:plus-circle"
                width={20}
                height={20}
                className="text-foreground min-w-5"
              />

              {t("expertRequests.lackOfEvidence")}
            </Button>
          )}

          {["COMPLETED", "REVIEWED"].includes(requestData.status) && (
            <Button
              variant="shadow"
              className="bg-foreground-900 text-foreground-50 ms-1"
            >
              <Icon
                icon="solar:check-circle-bold"
                width={20}
                height={20}
                className="text-foreground-50 min-w-5"
              />
              {t("expertRequests.confirmRequest")}
            </Button>
          )}

          {requestData.status === "DRAFT" && (
            <SendInspectionLinkModal requestData={requestData} />
          )}
        </div>
      </div>

      <Tabs
        selectedKey={activeTab}
        aria-label="Request Details Tabs"
        size="lg"
        className="mb-4"
        onSelectionChange={(key) => onTabChange(key as string)}
      >
        <Tab
          key="details"
          title={
            <div className="flex items-center gap-2">
              <Icon
                icon={
                  activeTab === "details"
                    ? "solar:info-circle-bold"
                    : "solar:info-circle-linear"
                }
                width={20}
                height={20}
                className={
                  activeTab === "details"
                    ? "text-default-foreground"
                    : "text-default-400"
                }
              />
              <span>{t("expertRequests.details")}</span>
            </div>
          }
        />

        <Tab
          key="content"
          title={
            <div className="flex items-center gap-2">
              <Icon
                icon={
                  activeTab === "content"
                    ? "solar:gallery-wide-bold"
                    : "solar:gallery-wide-linear"
                }
                width={20}
                height={20}
                className={
                  activeTab === "content"
                    ? "text-default-foreground"
                    : "text-default-400"
                }
              />
              <span>{t("expertRequests.content")}</span>
            </div>
          }
        />

        <Tab
          key="history"
          title={
            <div className="flex items-center gap-2">
              <Icon
                icon={
                  activeTab === "history"
                    ? "solar:history-2-bold"
                    : "solar:history-2-linear"
                }
                width={20}
                height={20}
                className={
                  activeTab === "history"
                    ? "text-default-foreground"
                    : "text-default-400"
                }
              />
              <span>{t("expertRequests.history")}</span>
            </div>
          }
        />
      </Tabs>
    </div>
  );
};
