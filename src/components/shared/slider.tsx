import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { Icon } from "@iconify/react";
import { LazyImage } from "./lazy-image";
import carPlaceholder from "@/assets/images/expert-requests/car-img-placeholder.webp";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface SliderWithThumbsProps {
  images: Array<{
    path: string;
    title?: string;
  }>;
  className?: string;
}

export default function Slider({
  images,
  className = "",
}: SliderWithThumbsProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  if (!images?.length) return null;

  return (
    <div className={`slider-with-thumbs ltr ${className}`}>
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
                fit="cover"
                placeholder={carPlaceholder}
                height={60}
                imgClassName="w-full"
                className="h-full rounded-md cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative">
        <Swiper
          spaceBetween={10}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="main-slider"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <LazyImage
                src={image.path}
                alt={image.title || `Image ${index + 1}`}
                externalImg
                fit="cover"
                placeholder={carPlaceholder}
                imgClassName="w-full"
                className="h-[200px] lg:h-[360px] rounded-large"
              />
            </SwiperSlide>
          ))}
        </Swiper>

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
      </div>
    </div>
  );
}
