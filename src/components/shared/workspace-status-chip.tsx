import { Chip } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { statusesMap } from "@/components/workspaces/constants";
import { StatusesMap, StatusOption } from "@/types/workspace";

export const NeutralChip = ({ status }: { status: StatusOption }) => {
  return (
    <Chip
      key={status.uid}
      className="gap-1 bg-default-100 h-10 text-default-700"
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
