import { LazyVideo } from "@/components/shared/lazy-video";
import Slider from "@/components/shared/slider";
import { ExpertRequestDetail } from "@/types/expert-requests";
import { Button, cn } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { t } from "i18next";
import useAppConfig from "@/config/app-config";
import { FileCollectionChart } from "./file-type-chart";
import GallerySliderModal from "../components/gallery-slider-modal";
import MediaSelectionGroup from "./media-selection-group";
import FloatingActions from "./floating-actions";
import "@/styles/slider.css";

type RequestContentProps = {
  requestData: ExpertRequestDetail;
};

export default function RequestContent({ requestData }: RequestContentProps) {
  const [selectedMedias, setSelectedMedias] = useState<string[]>([]);
  const { fileServerUrl } = useAppConfig();

  const aroundCarImages = requestData.gallery?.find(
    (item) => item.type === "GENERAL"
  )?.children;

  const inspectionImages = requestData.gallery?.filter((item) =>
    ["GALLERY", "CUSTOM"].includes(item.type)
  );

  const documents = requestData.gallery?.filter(
    (item) => item.type === "DOCUMENT"
  );

  const fileData = [
    {
      type: "Videos",
      count: requestData.video?.length || 0,
      color: "#F54180",
    },
    {
      type: "Photos",
      count:
        requestData.gallery?.filter((item) =>
          ["GALLERY", "DOCUMENT", "CUSTOM"].includes(item.type)
        ).length || 0,
      color: "#338EF7",
    },
    {
      type: "Car Photos",
      count: aroundCarImages?.length || 0,
      color: "#45D483",
    },
  ].filter((file) => !!file.count);

  // Prepare all gallery images for the modal
  const allGalleryImages = [
    ...(aroundCarImages || []),
    ...(inspectionImages || []),
    ...(documents || []),
  ]
    .filter((item) => item.path && item.path.length)
    .map((item) => ({
      path:
        item.path && item.path.length
          ? `${fileServerUrl}/${item.path[item.path.length - 1]}`
          : "",
      title: item.title,
    }));

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-default-50 rounded-large p-4">
        <div className="grid grid-cols-2 gap-4">
          {!!aroundCarImages?.length && (
            <div className="order-1 md:order-0 col-span-2 lg:col-span-1">
              <h6 className="text-xs py-2 mb-6">
                {t("expertRequests.aroundCarImages")}
              </h6>

              <Slider
                images={aroundCarImages.map((img) => ({
                  path: !!img.path?.length
                    ? `${fileServerUrl}/${img.path[img.path.length - 1]}`
                    : "",
                  title: img.title,
                }))}
                showThumbs={true}
                height="h-[200px] lg:h-[360px]"
              />
            </div>
          )}

          <div
            className={cn(
              "md:order-1 col-span-2 lg:col-span-1 flex flex-col gap-6",
              !aroundCarImages?.length && "lg:col-span-2"
            )}
          >
            <div className="flex items-center md:justify-end flex-wrap gap-2">
              {/* TODO: Handle responsive ui */}
              <GallerySliderModal
                images={allGalleryImages}
                activator={
                  <Button
                    variant="light"
                    size="sm"
                    startContent={
                      <Icon
                        icon="solar:play-circle-bold"
                        className="min-w-5 h-5"
                      />
                    }
                  >
                    {t("expertRequests.viewContent")}
                  </Button>
                }
              />

              <Button
                variant="flat"
                size="sm"
                startContent={
                  <Icon icon="solar:zip-file-bold" className="min-w-5 h-5" />
                }
              >
                {t("shared.zipFileContent")}
              </Button>

              <Button
                variant="solid"
                color="primary"
                size="sm"
                startContent={
                  <Icon
                    icon="solar:download-minimalistic-bold"
                    className="min-w-5 h-5"
                  />
                }
              >
                {t("shared.downloadPdfFile")}
              </Button>
            </div>

            {fileData.filter((file) => !!file.count).length > 0 && (
              <div className="px-4 py-6 bg-content1 rounded-large">
                <FileCollectionChart
                  fileData={fileData}
                  allFiles={requestData.all_file}
                  receivedFiles={requestData.received_file}
                />
              </div>
            )}

            {!!requestData.video?.length && (
              <LazyVideo
                src={requestData.video[requestData.video.length - 1]}
                className="flex-1 max-h-[200px] md:max-h-[360px] rounded-large border-4 border-content1 shadow-md shadow-neutral"
              />
            )}
          </div>
        </div>
      </div>

      {(!!inspectionImages?.length || !!documents?.length) && (
        <MediaSelectionGroup
          inspectionImages={inspectionImages}
          documents={documents}
          selectedMedias={selectedMedias}
          onSelectionChange={setSelectedMedias}
        />
      )}

      <FloatingActions
        selectedCount={selectedMedias.length}
        onDownload={() => {
          // Handle download action
        }}
        onSendAgainRequest={() => {
          // Handle send again request action
        }}
      />
    </div>
  );
}
