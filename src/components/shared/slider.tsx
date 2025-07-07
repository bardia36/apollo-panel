import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  FreeMode,
  Navigation,
  Thumbs,
  Autoplay,
  Pagination,
} from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Icon } from "@iconify/react";
import { LazyImage } from "./lazy-image";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/autoplay";

interface SliderWithThumbsProps {
  images: Array<{
    path: string;
    title?: string;
  }>;
  className?: string;
  showThumbs?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  showPagination?: boolean;
  showNavigation?: boolean;
  height?: string;
  onSlideChange?: (swiper: any) => void;
  objectFit?: "cover" | "contain";
}

export default function Slider({
  images,
  className = "",
  showThumbs = false,
  autoplay = false,
  autoplayDelay = 5000,
  showPagination = false,
  showNavigation = true,
  height = "h-[200px]",
  onSlideChange,
  objectFit,
}: SliderWithThumbsProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (!images?.length) return null;

  return (
    <div className={`slider-with-thumbs ltr ${className}`}>
      {showThumbs && (
        <div className="mb-4">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView="auto"
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="thumbs-slider"
            wrapperClass="!grid grid-cols-4 gap-2 lg:gap-4 justify-center"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="col-span-1">
                <LazyImage
                  src={image.path}
                  alt={image.title || `Thumb ${index + 1}`}
                  fit={objectFit || "cover"}
                  placeholder="/src/assets/images/base/image-thumbnail.svg"
                  height={60}
                  imgClassName="w-full"
                  className="h-full rounded-md cursor-pointer"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className="relative">
        <Swiper
          spaceBetween={10}
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          thumbs={showThumbs ? { swiper: thumbsSwiper } : undefined}
          autoplay={
            autoplay
              ? { delay: autoplayDelay, disableOnInteraction: false }
              : false
          }
          pagination={showPagination ? { clickable: true } : false}
          onSlideChange={onSlideChange}
          modules={[
            FreeMode,
            ...(showNavigation ? [Navigation] : []),
            ...(showThumbs ? [Thumbs] : []),
            ...(autoplay ? [Autoplay] : []),
            ...(showPagination ? [Pagination] : []),
          ]}
          className="main-slider"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <LazyImage
                src={image.path}
                alt={image.title || `Image ${index + 1}`}
                externalImg
                fit={objectFit || "cover"}
                placeholder="/src/assets/images/base/image-thumbnail.svg"
                imgClassName="w-full"
                className={`${height} rounded-large`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {showNavigation && (
          <>
            <button className="swiper-button-prev absolute left-4 top-1/2 !m-0 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-sm min-w-9 max-w-9 max-h-9 w-9 h-9 p-2 rounded-full">
              <Icon
                icon="tabler:chevron-left"
                className="min-w-5 max-h-5 text-default-foreground"
              />
            </button>
            <button className="swiper-button-next absolute right-4 top-1/2 !m-0 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-sm min-w-9 max-w-9 max-h-9 w-9 h-9 p-2 rounded-full transition-colors">
              <Icon
                icon="tabler:chevron-right"
                className="min-w-5 max-h-5 text-default-foreground"
              />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
