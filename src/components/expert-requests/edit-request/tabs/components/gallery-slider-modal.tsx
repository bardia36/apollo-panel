import { useRef, useCallback, ReactNode } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { t } from "i18next";
import {
  AppModal,
  AppModalRef,
} from "@/components/shared/app-components/app-modal";
import Slider from "@/components/shared/slider";
import "@/styles/slider.css";

interface GallerySliderModalProps {
  images: Array<{
    path: string;
    title?: string;
  }>;
  activator: ReactNode;
}

export default function GallerySliderModal({
  images,
  activator,
}: GallerySliderModalProps) {
  const modalRef = useRef<AppModalRef>(null);

  // Auto-close modal after last image is shown for 5s
  const handleSlideChange = useCallback(
    (swiper: any) => {
      if (swiper.activeIndex === images.length - 1 && swiper.autoplay.running) {
        setTimeout(() => {
          modalRef.current?.onClose();
        }, 5000);
      }
    },
    [images.length]
  );

  if (!images.length) return null;

  return (
    <AppModal
      ref={modalRef}
      hideCloseButton={false}
      isDismissable={true}
      activator={activator}
      classNames={{
        body: "p-0",
        base: "lg:max-w-[80%] w-full",
      }}
    >
      <AppModal.Header>
        <div className="flex items-center gap-2">
          <Icon icon="solar:play-circle-bold" className="min-w-6 h-6" />
          {t("expertRequests.showContentAutomatically")}
        </div>
      </AppModal.Header>

      <Slider
        images={images}
        autoplay={true}
        showPagination={true}
        height="h-[300px] lg:h-[600px] xl:h-[900px] max-h-screen"
        objectFit="contain"
        onSlideChange={handleSlideChange}
      />
    </AppModal>
  );
}
