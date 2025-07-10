import { LazyImage } from "@/components/shared/lazy-image";
import { Checkbox, CheckboxGroup } from "@heroui/react";
import { t } from "i18next";

type MediaItem = {
  _id: string;
  title: string;
  path?: string[];
};

type MediaSelectionGroupProps = {
  inspectionImages?: MediaItem[];
  documents?: MediaItem[];
  selectedMedias: string[];
  onSelectionChange: (selectedMedias: string[]) => void;
};

export default function MediaSelectionGroup({
  inspectionImages,
  documents,
  selectedMedias,
  onSelectionChange,
}: MediaSelectionGroupProps) {
  return (
    <CheckboxGroup value={selectedMedias} onChange={onSelectionChange}>
      {!!inspectionImages?.length && (
        <div className="bg-default-50 rounded-large p-4 mb-20">
          <h6 className="text-xs mb-4 text-default-600">
            {t("expertRequests.inspectionImages")}
          </h6>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {inspectionImages?.map((img) => (
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
                    src={
                      !!img.path?.length ? img.path[img.path.length - 1] : ""
                    }
                    alt={img.title}
                    placeholder="/src/assets/images/expert-requests/car-img-placeholder.webp"
                    fit="cover"
                    imgClassName="w-full"
                    className="h-24 md:h-44 w-full rounded-large border-2 border-content1 shadow-md shadow-neutral"
                  />
                </Checkbox>
              </div>
            ))}
          </div>
        </div>
      )}

      {!!documents?.length && (
        <div className="bg-default-50 rounded-large p-4">
          <h6 className="text-xs mb-4 text-default-600">
            {t("expertRequests.documentsAndFiles")}
          </h6>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {documents?.map((img) => (
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
                    src={
                      !!img.path?.length ? img.path[img.path.length - 1] : ""
                    }
                    alt={img.title}
                    placeholder="/src/assets/images/expert-requests/car-img-placeholder.webp"
                    fit="cover"
                    imgClassName="w-full"
                    className="h-24 md:h-44 w-full rounded-large border-2 border-content1 shadow-md shadow-neutral"
                  />
                </Checkbox>
              </div>
            ))}
          </div>
        </div>
      )}
    </CheckboxGroup>
  );
}
