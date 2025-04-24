import { FullLogo } from "@/components/shared/logo";

export default function DesktopHeader() {
  return (
    <div className="flex items-center justify-between w-full h-16 px-4 pt-4">
      Bread crumb
      <FullLogo classNames={{ img: "h-[2.625rem]" }} />
    </div>
  );
}
