import { t } from "i18next";
import type { Workspace } from "@/types/workspace";

interface Props {
  workspaceData: Workspace;
}

// components
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { OneLineDateAndWeekDayDisplay } from "@/components/shared/date-display";

const WorkspacePlans = ({ workspaceData }: Props) => {
  return (
    <div className="col-span-4">
      <p className="mb-4 font-normal text-default-600 text-xs">
        {t("workspaces.currentPlan")}
      </p>

      <div className="flex justify-center items-center bg-gray-600 mb-4 p-4 rounded-large min-h-[170px]"></div>

      <div className="items-center gap-2 grid grid-cols-5">
        <div className="col-span-3 bg-default-100 px-3 py-1 rounded-large">
          <p className="mb-1 text-default-600 text-xs">
            {t("workspaces.paymentDue")}
          </p>

          {!!workspaceData?.subscription?.current_period_end && (
            <OneLineDateAndWeekDayDisplay
              isoDate={workspaceData?.subscription?.current_period_end}
              className="text-foreground"
            />
          )}
        </div>

        <div className="col-span-2">
          <Button color="primary" radius="md" className="shadow-md shadow-primary" size="lg" fullWidth>
            <Icon icon="solar:check-circle-bold" width={20} height={20} />

            <span>{t("workspaces.paid")}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WorkspacePlans;
