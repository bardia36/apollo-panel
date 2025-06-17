import { useState, useEffect, useRef } from "react";
import useAppConfig from "@/config/app-config";

type LazyVideoProps = {
  src?: string;
  className?: string;
  controls?: boolean;
};

export const LazyVideo = ({
  src,
  className,
  controls = true,
}: LazyVideoProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLDivElement | null>(null);
  const { fileServerUrl } = useAppConfig();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) observer.observe(videoRef.current);

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  const videoSrc = src ? `${fileServerUrl}/${src}` : "";

  return (
    <div ref={videoRef} className={className}>
      {isVisible && videoSrc && (
        <video src={videoSrc} controls={controls} className="w-full h-full" />
      )}
    </div>
  );
};
