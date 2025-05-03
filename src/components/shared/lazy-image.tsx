import { useState, useEffect, useRef } from "react";
import { Image } from "@heroui/image";
import useAppConfig from "@/config/app-config";

type LazyImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
};

export const LazyImage = ({
  src,
  alt,
  width,
  height,
  className,
}: LazyImageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement | null>(null);

  const { fileServerUrl } = useAppConfig();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <div ref={imageRef} className={className}>
      {isVisible && (
        <Image
          src={`${fileServerUrl}${src}`}
          alt={alt}
          width={width}
          height={height}
          classNames={{ img: "object-cover" }}
        />
      )}
    </div>
  );
};
