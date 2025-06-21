import { Image } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import useWorkspaceStore from "@/stores/workspace-store";

export default function Workspace() {
  const { workspace } = useWorkspaceStore();

  return (
    <div className="flex justify-between items-center bg-default-100 shadow-sm mb-6 p-3 border border-default-200 rounded-[20px]">
      <div className="flex items-center gap-2">
        {workspace?.logo && (
          <Image
            src={workspace?.logo}
            alt="Asia Insurance"
            width={64}
            height={64}
            className="px-4 py-2"
          />
        )}

        <div className="flex flex-col gap-1">
          {workspace?.name_fa && (
            <p className="text-foreground text-small">{workspace?.name_fa}</p>
          )}

          {workspace?.description && (
            <p className="text-foreground-400 text-tiny">
              {workspace?.description}
            </p>
          )}
        </div>
      </div>

      <Icon icon="flowbite:chevron-sort-outline" width={16} height={16} />
    </div>
  );
}
