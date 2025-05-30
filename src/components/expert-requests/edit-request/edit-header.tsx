import { Image } from "@heroui/react";
import logoIcon from "@/assets/images/logo/logo-icon.webp";
import { ExpertRequestDetail } from "@/types/expert-requests";
import { statusesMap } from "../constants";
import { Icon } from "@iconify/react";

export const EditHeader = ({
  requestData,
}: {
  requestData: Pick<
    ExpertRequestDetail,
    "_id" | "key" | "createdAt" | "status"
  >;
}) => {
  const statusMap = statusesMap[requestData.status];

  return (
    <div className="flex items-center justify-between">
      <div className="relative w-16 h-16">
        {/* Background logo with mask */}
        <div className={`absolute inset-0 rounded-lg bg-${statusMap.fadedBg}`}>
          <Image
            src={logoIcon}
            alt={statusMap.label}
            width={64}
            height={64}
            className="opacity-10"
          />
        </div>

        {/* Status icon overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon
            icon={statusMap.icon}
            className={`text-${statusMap.text} text-2xl`}
          />
        </div>
      </div>
    </div>
  );
};
