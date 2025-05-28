import { Image } from "@heroui/react";
import logoIcon from "@/assets/images/logo/logo-icon.webp";

export default function ({ imgClass }: { imgClass?: string }) {
  return (
    // TODO: get user image and name from auth store
    <div className="p-2">
      <Image src={logoIcon} alt="user's name" classNames={{ img: imgClass }} />
    </div>
  );
}
