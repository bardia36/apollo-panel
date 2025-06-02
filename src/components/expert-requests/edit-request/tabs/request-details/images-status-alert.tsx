import { Button } from "@heroui/react";

import { statusesMap } from "@/components/expert-requests/constants";
import CollapsableCards from "@/components/shared/collapsable-cards";
import { NeutralChip } from "@/components/shared/request-status-chip";
import { ExpertRequestDetail } from "@/types/expert-requests";
import { Chip } from "@heroui/react";
import { t } from "i18next";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ImagesStatusAlert({
  requestData,
}: {
  requestData: ExpertRequestDetail;
}) {
  return (
    <div className="flex flex-col items-center bg-content1 shadow-md rounded-3xl lg:col-span-8 p-6">
      {!!requestData.documents?.img?.length && (
        <div className="min-h-[156px] w-full flex items-center justify-center">
          {/* TODO: handle if img is less and more than 4, handle license */}
          <CollapsableCards items={requestData.documents?.img} />
        </div>
      )}

      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-right text-xl font-light">
            <span>{t("expertRequests.thisRequest")}</span>
            <Chip variant="flat" radius="full">
              {requestData.createdAt}
            </Chip>
            <span>{t("shared.isThat")}</span>
            <NeutralChip
              status={{
                uid: requestData.status,
                label: statusesMap[requestData.status].label,
              }}
            />
            <span>{t("shared.is")}</span>
          </div>

          {["COMPLETED", "REVIEWED"].includes(requestData.status) && (
            <p className="text-xl font-light">
              {t("expertRequests.reviewAndConfirmMessage")}
            </p>
          )}

          {requestData.status === "DRAFT" && (
            <p className="text-xl font-light">
              {t("expertRequests.specifyContentAndSendLink")}
            </p>
          )}

          {requestData.status === "ACCEPTED" && (
            <p className="text-xl font-light">
              {t("expertRequests.viewOrDownloadContent")}
            </p>
          )}

          {["PENDING", "OPENED", "IN_PROGRESS"].includes(
            requestData.status
          ) && (
            <p className="text-xl font-light">
              {t("expertRequests.specifyContentAndSendLink")}
            </p>
          )}

          {["CANCELED", "EXPIRED", "REJECTED", "FAILED"].includes(
            requestData.status
          ) && (
            <>
              <p className="text-xl font-light">
                {t("expertRequests.createNewRequestIfNeeded")}
              </p>

              <Button
                variant="flat"
                radius="lg"
                className="text-default-foreground mt-4"
              >
                <Icon
                  icon="solar:document-medicine-bold"
                  className="min-w-5 h-5"
                />
                {t("expertRequests.createRequest")}
              </Button>
            </>
          )}

          {["COMPLETED", "REVIEWED", "ACCEPTED"].includes(
            requestData.status
          ) && (
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="light"
                radius="lg"
                className="text-default-foreground"
              >
                {t("expertRequests.download")}
                <Icon
                  icon="solar:archive-down-minimlistic-bold-duotone"
                  className="min-w-5 h-5"
                />
              </Button>

              <Button variant="shadow" radius="lg" size="lg" color="primary">
                {t("expertRequests.viewContent")}
                <Icon icon="solar:play-bold" className="min-w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
