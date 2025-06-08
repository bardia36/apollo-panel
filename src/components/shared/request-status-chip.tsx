import { Chip } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { statusesMap } from "../expert-requests/constants";
import { ExpertRequestStatus, StatusesMap } from "@/types/expert-requests";

export const NeutralChip = ({ status }: { status: ExpertRequestStatus }) => {
  const statusMap = statusesMap[status as keyof StatusesMap];

  return (
    <Chip
      key={status}
      className="bg-default-100 text-default-700 h-10 gap-1"
      classNames={{
        content: "flex gap-1",
        base: "rounded-large",
      }}
    >
      <StatusShadowIcon status={status} />
      <span className="font-semibold">{statusMap.label}</span>
    </Chip>
  );
};

const StatusShadowIcon = ({
  status,
  size = 20,
}: {
  status: string;
  size?: number;
}) => {
  const statusMap = statusesMap[status as keyof StatusesMap];

  return (
    <Icon
      icon={statusMap.icon}
      className={`text-${statusMap.text} drop-shadow-md`}
      width={size}
      height={size}
    />
  );
};
