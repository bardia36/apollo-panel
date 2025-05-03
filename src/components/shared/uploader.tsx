import { useRef, useEffect, FC, ChangeEvent } from "react";
import { Avatar } from "@heroui/avatar";
import { Icon } from "@iconify/react/dist/iconify.js";
import imageThumbnail from "@/assets/images/base/image-thumbnail.svg";
import { Image } from "@heroui/image";
import { filesApi } from "@/services/api/files";
import { exceptionHandler } from "@/services/api/exception";

type ImageUploaderProps = {
  value?: string | null;
  onChange: (url: string | null) => void;
};

export const ImageUploader: FC<ImageUploaderProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);

  // Clean up object URL when component unmounts or when value changes
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Clean up previous object URL if it exists
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    console.log(file);

    if (file) {
      const url = URL.createObjectURL(file);
      objectUrlRef.current = url;
      // onChange(url);

      const formData = new FormData();
      formData.append("image", file, file.name);

      filesApi
        .upload(formData, { path: "inspection_request/template" })
        .then((serverUrl: string) => onChange(serverUrl))
        .catch((error) => exceptionHandler(error));
    }
  };

  const triggerUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div className="relative" style={{ width: "56px", height: "56px" }}>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={inputRef}
        onChange={handleFileChange}
      />

      <div onClick={triggerUpload} className="cursor-pointer w-full h-full">
        {value ? (
          <Avatar
            src={value}
            alt="Uploaded"
            className="w-14 h-14 border-2 border-transparent hover:border-primary transition"
            style={{ width: "56px", height: "56px" }}
          />
        ) : (
          <Avatar
            className="w-14 h-14 bg-gray-200"
            style={{ width: "56px", height: "56px" }}
            fallback={
              <Image
                src={imageThumbnail}
                alt="Upload thumbnail"
                radius="none"
                className="w-[30px] h-[30px]"
              />
            }
          />
        )}
      </div>

      <div
        className="absolute bottom-0 right-0 text-default-foreground cursor-pointer"
        onClick={triggerUpload}
        style={{ zIndex: 10 }}
      >
        {value ? (
          <Icon icon="solar:pen-2-bold" width={16} height={16} />
        ) : (
          <Icon icon="mage:plus-square-fill" width={16} height={16} />
        )}
      </div>
    </div>
  );
};
