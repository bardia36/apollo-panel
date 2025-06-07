import "swiper/css";
import "swiper/css/navigation";
import React, { PropsWithChildren, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import { cn } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

type SlidesPerBreakpoints = {
  default?: number;
  mobile?: number;
  tablet?: number;
  tabletWide?: number;
  desktop?: number;
};

type Props<T> = {
  items: T[];
  navigation?: boolean;
  renderItem?: (item: T) => React.ReactNode;
  keyExtractor?: (item: T) => string;
  slidesPerBreakpoints?: SlidesPerBreakpoints;
  slideClassName?: string;
};

export const SwiperSlider = <T,>({
  slidesPerBreakpoints,
  ...props
}: PropsWithChildren<Props<T>>) => {
  const { isSmAndDown } = useBreakpoint();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollButtons, setScrollButtons] = useState({
    left: false,
    right: false,
  });

  function handleScroll(swiper: any) {
    const right = !swiper.isBeginning;
    const left =
      !swiper.isEnd && swiper.slides.length > swiper.params.slidesPerView;

    setScrollButtons({ left, right });
  }

  const navigation =
    props.navigation !== undefined ? props.navigation : !isSmAndDown;

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        slidesPerView={slidesPerBreakpoints?.default || 1.8}
        spaceBetween={8}
        breakpoints={{
          400: { slidesPerView: slidesPerBreakpoints?.mobile || 2.5 },
          600: { slidesPerView: slidesPerBreakpoints?.tablet || 3.5 },
          905: { slidesPerView: slidesPerBreakpoints?.tabletWide || 4.5 },
          1200: { slidesPerView: slidesPerBreakpoints?.desktop || 4.5 },
        }}
        navigation={
          navigation
            ? {
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }
            : false
        }
        onSliderMove={handleScroll}
      >
        <div ref={containerRef}>
          {props.items.map((item) => {
            return (
              <SwiperSlide
                key={props.keyExtractor?.(item)}
                className={cn("select-none", props.slideClassName)}
              >
                {props.renderItem?.(item)}
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>

      {scrollButtons.right && !isSmAndDown && (
        <div className="swiper-button-prev-custom absolute rounded-xl z-10 right-[-1px] top-0 bottom-0 px-1 w-[110px] bg-gradient-to-l from-white to-transparent flex items-center">
          <div className="border border-neutral-3 bg-shade-1 rounded-full cursor-pointer flex items-center justify-center">
            <Icon
              icon="solar:alt-arrow-down-bold"
              className="origin-center min-w-6 min-h-6 -rotate-90"
            />
          </div>
        </div>
      )}

      {scrollButtons.left && !isSmAndDown && (
        <div className="swiper-button-next-custom absolute rounded-xl z-10 left-[-1px] top-0 bottom-0 px-1 w-[110px] bg-gradient-to-r from-white to-transparent flex items-center justify-end">
          <div className="border border-neutral-3 bg-shade-1 rounded-full cursor-pointer inline-block">
            <Icon
              icon="solar:alt-arrow-down-bold"
              className="origin-center min-w-6 min-h-6 rotate-90"
            />
          </div>
        </div>
      )}
    </div>
  );
};
