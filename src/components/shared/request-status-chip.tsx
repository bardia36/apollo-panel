import { Chip } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { statusesMap } from "../expert-requests/constants";
import { StatusesMap, StatusOption } from "@/types/expert-requests";

export const NeutralChip = ({ status }: { status: StatusOption }) => {
  return (
    <Chip
      key={status.uid}
      className="bg-default-100 text-default-700 h-10 gap-1"
      classNames={{
        content: "flex gap-1",
        base: "rounded-large",
      }}
    >
      <StatusShadowIcon uid={status.uid} />
      <span className="font-semibold">{status.label}</span>
    </Chip>
  );
};

const StatusShadowIcon = ({
  uid,
  size = 20,
}: {
  uid: StatusOption["uid"];
  size?: number;
}) => {
  const statusMap = statusesMap[uid as keyof StatusesMap];

  return (
    <Icon
      icon={statusMap.icon}
      className={`text-${statusMap.text} drop-shadow-md`}
      width={size}
      height={size}
    />
  );
};
