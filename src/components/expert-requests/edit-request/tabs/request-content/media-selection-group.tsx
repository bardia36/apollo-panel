import { LazyImage } from "@/components/shared/lazy-image";
import { Checkbox, CheckboxGroup } from "@heroui/react";
import { t } from "i18next";
import { useState, useRef } from "react";
import {
  AppModal,
  AppModalRef,
} from "@/components/shared/app-components/app-modal";

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
  const modalRef = useRef<AppModalRef>(null);
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);

  const handleImageClick = (item: MediaItem) => {
    setSelectedImage(item);
    modalRef.current?.onOpen();
  };

  const handleCheckboxChange = (itemId: string, checked: boolean) => {
    if (checked) {
      onSelectionChange([...selectedMedias, itemId]);
    } else {
      onSelectionChange(selectedMedias.filter((id) => id !== itemId));
    }
  };

  return (
    <>
      <CheckboxGroup value={selectedMedias} onChange={onSelectionChange}>
        {!!inspectionImages?.length && (
          <div className="bg-default-50 rounded-large p-4 mb-20">
            <h6 className="text-xs mb-4 text-default-600">
              {t("expertRequests.inspectionImages")}
            </h6>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {inspectionImages?.map((img) => (
                <div className="col-span-1 relative" key={img._id}>
                  <Checkbox
                    aria-label={img.title}
                    value={img._id}
                    isSelected={selectedMedias.includes(img._id)}
                    onValueChange={(checked) =>
                      handleCheckboxChange(img._id, checked)
                    }
                    className="absolute top-4 start-4 z-[11]"
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => handleImageClick(img)}
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
                  </div>
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
                <div className="col-span-1 relative" key={img._id}>
                  <Checkbox
                    aria-label={img.title}
                    value={img._id}
                    isSelected={selectedMedias.includes(img._id)}
                    onValueChange={(checked) =>
                      handleCheckboxChange(img._id, checked)
                    }
                    className="absolute top-4 right-4 z-[11]"
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => handleImageClick(img)}
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CheckboxGroup>

      <AppModal
        ref={modalRef}
        size="5xl"
        className="my-auto"
        hideCloseButton={false}
      >
        {selectedImage && (
          <>
            <AppModal.Header>{selectedImage.title}</AppModal.Header>

            <div className="flex flex-col items-center">
              <LazyImage
                src={
                  !!selectedImage.path?.length
                    ? selectedImage.path[selectedImage.path.length - 1]
                    : ""
                }
                alt={selectedImage.title}
                placeholder="/src/assets/images/expert-requests/car-img-placeholder.webp"
                fit="contain"
                imgClassName="max-w-full max-h-[70vh] object-contain"
                className="w-full"
              />
            </div>
          </>
        )}
      </AppModal>
    </>
  );
}
