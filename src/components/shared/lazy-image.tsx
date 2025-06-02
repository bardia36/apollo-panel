import { useState, useEffect, useRef } from "react";
import { Image } from "@heroui/react";
import useAppConfig from "@/config/app-config";

type LazyImageProps = {
  src?: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  fit?: "cover" | "contain";
  placeholder?: string;
};

export const LazyImage = ({
  src,
  alt,
  width,
  height,
  className,
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

  const imageSrc = src ? `${fileServerUrl}${src}` : placeholder;

  return (
    <div ref={imageRef} className={className}>
      {isVisible && imageSrc && (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          classNames={{ img: `object-${fit}`, wrapper: "h-full" }}
        />
      )}
    </div>
  );
};
