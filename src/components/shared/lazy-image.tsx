import { useState, useEffect, useRef } from "react";
import { Image } from "@heroui/react";
import useAppConfig from "@/config/app-config";
import noImage from "@/assets/images/base/image-thumbnail.svg";

type LazyImageProps = {
  src?: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  externalImg?: boolean;
  fit?: "cover" | "contain";
  placeholder?: string;
};

export const LazyImage = ({
  src,
  alt,
  width,
  height,
  className,
  externalImg,
  fit = "contain",
  placeholder,
}: LazyImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const { fileServerUrl } = useAppConfig();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) observer.observe(imageRef.current);

    return () => {
      if (imageRef.current) observer.unobserve(imageRef.current);
    };
  }, []);

  const imageSrc = src
    ? externalImg
      ? src
      : `${fileServerUrl}/${src}`
    : placeholder;

  return (
    <div ref={imageRef} className={className}>
      {isVisible && imageSrc && (
        <Image
          src={imageSrc}
          fallbackSrc={noImage}
          removeWrapper
          alt={alt}
          width={width}
          height={height}
          classNames={{ img: `object-${fit} h-full`, wrapper: "h-full" }}
        />
      )}
    </div>
  );
};
