import { Avatar } from "@heroui/avatar";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "@heroui/input";
import { t } from "i18next";
import FieldsCountChip from "./components/fields-count-chip";

type Props = {
  activeFieldsCount: number;
};

export default ({ activeFieldsCount }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <Avatar
        className="bg-default-100 min-w-11 min-h-11"
        fallback={
          <Icon icon={"solar:widget-add-bold"} width={24} height={24} />
        }
      />

      {/* // TODO: handle input onChange */}
      <Input label={t("expertRequests.templateName")} />

      <FieldsCountChip activeFieldsCount={activeFieldsCount} />
    </div>
  );
};
