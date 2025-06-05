import { LazyImage } from "@/components/shared/lazy-image";
import { ExpertRequestDetail } from "@/types/expert-requests";
import { Button, Checkbox, CheckboxGroup, Chip } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import testImage from "@/assets/images/expert-requests/car-img-placeholder.webp";
import { t } from "i18next";
import { useBreakpoint } from "@/hooks/useBreakpoint";

type RequestContentProps = {
  requestData: ExpertRequestDetail;
};

export default function RequestContent({ requestData }: RequestContentProps) {
  const [selectedMedias, setSelectedMedias] = useState<string[]>([]);
  const { isMdAndUp } = useBreakpoint();

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-default-50 rounded-large p-4">
        <div className="flex justify-between items-center flex-wrap gap-2 mb-6">
          <h6 className="text-xs">{t("expertRequests.aroundCarImages")}</h6>

          <div className="flex items-center flex-wrap gap-2">
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 lg:col-span-1">slider</div>

          <div className="col-span-2 lg:col-span-1">chart</div>
        </div>
      </div>

      {(!!requestData.documents?.img?.length ||
        !!requestData.file_info?.img?.length) && (
        <CheckboxGroup value={selectedMedias} onChange={setSelectedMedias}>
          {!!requestData.documents?.img?.length && (
            <div className="bg-default-50 rounded-large p-4 mb-20">
              <h6 className="text-xs mb-4 text-default-600">
                {t("expertRequests.inspectionImages")}
              </h6>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {requestData.documents?.img?.map((img) => (
                  <div className="col-span-1" key={img._id}>
                    <Checkbox
                      aria-label={img.title}
                      value={img._id}
                      classNames={{
                        wrapper: "absolute top-4 start-4 z-[100] me-0",
                      }}
                    >
                      <LazyImage
                        src={testImage}
                        // src={img.path}
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

          {!!requestData.file_info?.img?.length && (
            <div className="bg-default-50 rounded-large p-4">
              <h6 className="text-xs mb-4 text-default-600">
                {t("expertRequests.documentsAndFiles")}
              </h6>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {requestData.file_info?.img?.map((img) => (
                  <div className="col-span-1" key={img._id}>
                    <Checkbox
                      aria-label={img.title}
                      value={img._id}
                      classNames={{
                        wrapper: "absolute top-4 right-4 z-[100] me-0",
                      }}
                    >
                      <LazyImage
                        src={testImage}
                        // src={img.path}
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
        <div className="bg-default-50 p-4 md:px-5 md:py-4 flex justify-between items-center flex-wrap gap-2 rounded-full md:gap-16 shadow-2xl shadow-neutral absolute start-4 end-4 md:start-auto md:end-10 bottom-4 z-[1000]">
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
