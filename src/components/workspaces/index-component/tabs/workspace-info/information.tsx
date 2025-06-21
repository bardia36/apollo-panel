import { t } from "i18next";
import type { Workspace } from "@/types/workspace";

// components
import { AppInput } from "@/components/shared/app-components/app-input";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  workspaceData: Workspace;
}

const Information = ({ workspaceData }: Props) => {
  return (
    <div className="col-span-6">
      <p className="mb-4 font-normal text-default-600 text-xs">
        {t("shared.information")}
      </p>

      <div className="bg-content1 p-4 rounded-large">
        <AppInput
          label={t("workspaces.workspaceName")}
          value={workspaceData?.name_fa}
          size="lg"
          isReadOnly
          className="mb-4"
        />

        <AppInput
          label="Name"
          value={workspaceData?.name_en}
          size="lg"
          dir="ltr"
          className="mb-4"
          classNames={{
            inputWrapper: "!items-end",
            label: 'left-0'
          }}
          isReadOnly
        />

        <AppInput
          label={t("shared.mobile")}
          value={workspaceData?.mobile}
          size="lg"
          isReadOnly
          endContent={
            <Icon
              icon="solar:iphone-linear"
              width={20}
              height={20}
              className="mb-2 text-default-400"
            />
          }
          className="mb-4"
        />

        <AppInput
          label={t("shared.email")}
          value={workspaceData?.email}
          size="lg"
          isReadOnly
          endContent={
            <Icon
              icon="solar:letter-outline"
              width={20}
              height={20}
              className="mb-2 text-default-400"
            />
          }
        />
      </div>
    </div>
  );
};

export default Information;
