import { Button } from "@heroui/react";

import { statusesMap } from "@/components/expert-requests/constants";
import CollapsableCards from "@/components/shared/collapsable-cards";
import { NeutralChip } from "@/components/shared/request-status-chip";
import { ExpertRequestDetail } from "@/types/expert-requests";
import { Chip } from "@heroui/react";
import { t } from "i18next";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function ImagesStatusAlert({
  documents,
  status,
  createdAt,
}: {
  documents: ExpertRequestDetail["documents"];
  status: ExpertRequestDetail["status"];
  createdAt: ExpertRequestDetail["createdAt"];
}) {
  return (
    <div className="flex flex-col items-center justify-center bg-content1 shadow-md rounded-3xl lg:col-span-8 p-6">
      {!!documents?.img?.length && (
        <div className="min-h-[156px] w-full flex items-center justify-center">
          {/* TODO: handle if img is less and more than 4, handle license */}
          <CollapsableCards items={documents?.img} />
        </div>
      )}

      <div className="flex flex-col items-center gap-8 lg:gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex items-center justify-center flex-wrap gap-2 text-right text-xl font-light">
            <span>{t("expertRequests.thisRequest")}</span>
            <Chip variant="flat" radius="full">
              {createdAt}
            </Chip>
            <span>{t("shared.isThat")}</span>
            <NeutralChip
              status={{
                uid: status,
                label: statusesMap[status].label,
              }}
            />
            <span>{t("shared.is")}</span>
          </div>

          {["COMPLETED", "REVIEWED"].includes(status) && (
            <p className="text-xl font-light">
              {t("expertRequests.reviewAndConfirmMessage")}
            </p>
          )}

          {status === "DRAFT" && (
            <p className="text-xl font-light">
              {t("expertRequests.specifyContentAndSendLink")}
            </p>
          )}

          {status === "ACCEPTED" && (
            <p className="text-xl font-light">
              {t("expertRequests.viewOrDownloadContent")}
            </p>
          )}

          {["PENDING", "OPENED", "IN_PROGRESS"].includes(status) && (
            <p className="text-xl font-light">
              {t("expertRequests.specifyContentAndSendLink")}
            </p>
          )}

          {["CANCELED", "EXPIRED", "REJECTED", "FAILED"].includes(status) && (
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

          {["COMPLETED", "REVIEWED", "ACCEPTED"].includes(status) && (
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
