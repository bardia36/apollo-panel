import { Image } from "@heroui/image";

export default function ({ imgClass }: { imgClass?: string }) {
  return (
    // TODO: get user image and name from auth store
    <div className="p-2">
      <Image
        src="/images/logo/logo-icon.svg"
        alt="user's name"
        classNames={{ img: imgClass }}
      />
    </div>
  );
}
