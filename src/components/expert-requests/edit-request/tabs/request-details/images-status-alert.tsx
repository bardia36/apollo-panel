import { Button } from "@heroui/react";
import { Chip } from "@heroui/react";
import { t } from "i18next";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getTimeDistance } from "@/utils/base";
import { ExpertRequestStatus } from "@/types/expert-requests";
import { TemplateField } from "@/types/templates";
import useAppConfig from "@/config/app-config";
import CollapsableCards from "@/components/shared/collapsable-cards";
import { NeutralChip } from "@/components/shared/request-status-chip";
import GallerySliderModal from "../components/gallery-slider-modal";

export default function ImagesStatusAlert({
  gallery,
  status,
  updatedAt,
}: {
  gallery: TemplateField[];
  status: ExpertRequestStatus;
  updatedAt?: string;
}) {
  const document = gallery.find((item) => item.type === "DOCUMENT");
  const galleryFields = gallery.filter((item) => item.type === "GENERAL");
  const images = document
    ? [document, ...galleryFields.slice(0, 3)]
    : galleryFields.slice(0, 4);
  const mappedImages = images.map((item) => ({
    _id: item._id,
    title: item.title,
    path: item.path?.length ? item.path[item.path.length - 1] : "",
  }));

  const { fileServerUrl } = useAppConfig();

  // Prepare all gallery images for the slider
  const allGalleryImages = gallery
    .filter((item) => item.path && item.path.length)
    .map((item) => ({
      path:
        item.path && item.path.length
          ? `${fileServerUrl}/${item.path[item.path.length - 1]}`
          : "",
      title: item.title,
    }));

  return (
    <div className="flex flex-col items-center justify-center bg-content1 shadow-md rounded-3xl p-6">
      {!!gallery?.length && (
        <div className="min-h-[156px] w-full flex items-center justify-center">
          <CollapsableCards items={mappedImages} />
        </div>
      )}

      <div className="flex flex-col items-center gap-8 lg:gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          {!!status && !!updatedAt && (
            <div className="flex items-center justify-center flex-wrap gap-2 text-right text-xl font-light">
              <span>{t("expertRequests.thisRequest")}</span>
              <Chip variant="flat" radius="full">
                {getTimeDistance(updatedAt)}
              </Chip>
              <span>{t("shared.isThat")}</span>
              <NeutralChip status={status} />
              <span>{t("shared.is")}</span>
            </div>
          )}

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

          {["COMPLETED", "REVIEWED", "ACCEPTED"].includes(status) &&
            !!allGalleryImages.length && (
              <div className="flex items-center flex-wrap gap-2 mt-2">
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

                <GallerySliderModal
                  images={allGalleryImages}
                  activator={
                    <Button
                      variant="shadow"
                      radius="lg"
                      size="lg"
                      color="primary"
                    >
                      {t("expertRequests.viewContent")}
                      <Icon icon="solar:play-bold" className="min-w-5 h-5" />
                    </Button>
                  }
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
