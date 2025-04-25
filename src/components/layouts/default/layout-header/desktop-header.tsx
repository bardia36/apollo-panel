import { FullLogo } from "@/components/shared/logo";
import Breadcrumb from "./breadcrumb";

export default function DesktopHeader() {
  return (
    <div className="flex items-center justify-between w-full h-16 px-4 pt-4">
      <Breadcrumb />
      <FullLogo classNames={{ img: "h-[2.625rem]" }} />
    </div>
  );
}
