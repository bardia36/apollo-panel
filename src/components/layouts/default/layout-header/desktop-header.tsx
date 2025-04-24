import { FullLogo } from "@/components/shared/logo";
import Breadcrumb from "./breadcrumb";
import { t } from "i18next";

export default function DesktopHeader() {
  const breadcrumbLinks = [
    { name: t("title.expertRequests"), url: "/expert-requests" },
  ];

  return (
    <div className="flex items-center justify-between w-full h-16 px-4 pt-4">
      <Breadcrumb links={breadcrumbLinks} />
      <FullLogo classNames={{ img: "h-[2.625rem]" }} />
    </div>
  );
}
