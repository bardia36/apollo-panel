import { LazyImage } from "@/components/shared/lazy-image";
import Slider from "@/components/shared/slider";
import { ExpertRequestDetail } from "@/types/expert-requests";
import { Button, Checkbox, CheckboxGroup, Chip, cn } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { t } from "i18next";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import useAppConfig from "@/config/app-config";
import { FileCollectionChart } from "./file-type-chart";

// Import slider styles
import "@/styles/slider.css";

type RequestContentProps = {
  requestData: ExpertRequestDetail;
};

export default function RequestContent({ requestData }: RequestContentProps) {
  const [selectedMedias, setSelectedMedias] = useState<string[]>([]);
  const { isMdAndUp } = useBreakpoint();
  const { fileServerUrl } = useAppConfig();
  const fileData = [
    {
      type: "Videos",
      count: requestData.documents?.video?.length || 0,
      color: "#F54180",
    },
    {
      type: "Photos",
      count: requestData.file_info?.img?.length || 0,
      color: "#338EF7",
    },
    {
      type: "Car Photos",
      count: requestData.file_info?.sequence?.length || 0,
      color: "#45D483",
    },
    {
      type: "Other",
      count: requestData.documents?.img?.length || 0,
      color: "#000000",
    },
  ].filter((file) => !!file.count);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-default-50 rounded-large p-4">
        <div className="grid grid-cols-2 gap-4">
          {!!requestData.file_info?.sequence?.length && (
            <div className="order-1 md:order-0 col-span-2 lg:col-span-1">
              <h6 className="text-xs py-2 mb-6">
                {t("expertRequests.aroundCarImages")}
              </h6>

              <Slider
                images={requestData.file_info.sequence.map((img) => ({
                  path: `${fileServerUrl}/${img.path}`,
                  title: img.title,
                }))}
              />
            </div>
          )}

          <div
            className={cn(
              "md:order-1 col-span-2 lg:col-span-1 flex flex-col gap-6",
              !requestData.file_info?.sequence?.length && "lg:col-span-2"
            )}
          >
            <div className="flex items-center md:justify-end flex-wrap gap-2">
              {/* TODO: Handle responsive ui */}
              <Button
                variant="light"
                size="sm"
                startContent={
                  <Icon icon="solar:play-circle-bold" className="min-w-5 h-5" />
                }
              >
                {t("shared.addImage")}
              </Button>

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
              <div className="px-4 py-6 bg-content1 rounded-large ltr">
                <FileCollectionChart fileData={fileData} />
              </div>
            )}

            {/*  TODO: load video lazy */}
            {!!requestData.documents?.video?.length && (
              <video
                src={`${fileServerUrl}/${requestData.documents?.video[0]?.path}`}
                controls
                className="flex-1 max-h-[200px] md:max-h-[360px] rounded-large border-4 border-content1 shadow-md shadow-neutral"
              ></video>
            )}
          </div>
        </div>
      </div>

      {(!!requestData.documents?.img?.length ||
        !!requestData.file_info?.img?.length) && (
        <CheckboxGroup value={selectedMedias} onChange={setSelectedMedias}>
          {!!requestData.file_info?.img?.length && (
            <div className="bg-default-50 rounded-large p-4 mb-20">
              <h6 className="text-xs mb-4 text-default-600">
                {t("expertRequests.inspectionImages")}
              </h6>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {requestData.file_info?.img?.map((img) => (
                  <div className="col-span-1" key={img._id}>
                    <Checkbox
                      aria-label={img.title}
                      value={img._id}
                      classNames={{
                        base: "max-w-full w-full",
                        label: "w-full",
                        wrapper: "absolute top-4 start-4 z-[11] me-0",
                      }}
                    >
                      <LazyImage
                        src={img.path}
                        alt={img.title}
                        externalImg
                        fit="cover"
                        className="h-24 md:h-44 w-full rounded-large border-2 border-content1 shadow-md shadow-neutral"
                      />
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!!requestData.documents?.img?.length && (
            <div className="bg-default-50 rounded-large p-4">
              <h6 className="text-xs mb-4 text-default-600">
                {t("expertRequests.documentsAndFiles")}
              </h6>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {requestData.documents?.img?.map((img) => (
                  <div className="col-span-1" key={img._id}>
                    <Checkbox
                      aria-label={img.title}
                      value={img._id}
                      classNames={{
                        base: "max-w-full w-full",
                        label: "w-full",
                        hiddenInput: "w-fit",
                        wrapper: "absolute top-4 right-4 z-[11] me-0",
                      }}
                    >
                      <LazyImage
                        src={img.path}
                        alt={img.title}
                        externalImg
                        fit="cover"
                        className="h-24 md:h-44 w-full rounded-large border-2 border-content1 shadow-md shadow-neutral"
                      />
                    </Checkbox>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CheckboxGroup>
      )}

      {!!selectedMedias.length && (
        <div className="bg-default-50 p-4 md:px-5 md:py-4 flex justify-between items-center flex-wrap gap-2 rounded-full md:gap-16 shadow-2xl shadow-neutral absolute start-4 end-4 md:start-auto md:end-10 bottom-4 z-[12]">
          <Chip
            variant="light"
            size={isMdAndUp ? "lg" : "md"}
            radius="full"
            className="font-semibold"
          >
            {selectedMedias.length} {t("shared.selectedItem")}
          </Chip>

          <div className="flex gap-2">
            <Button
              variant="light"
              size="sm"
              radius="full"
              isIconOnly={isMdAndUp ? false : true}
              className="text-xs text-default-foreground"
              startContent={
                <Icon
                  icon="solar:download-minimalistic-outline"
                  className="min-w-5 h-5"
                />
              }
            >
              <span className="hidden md:block">{t("shared.download")}</span>
            </Button>

            <Button
              variant="shadow"
              size="sm"
              color="primary"
              radius="full"
              className="text-xs"
            >
              {t("shared.sendAgainRequest")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
