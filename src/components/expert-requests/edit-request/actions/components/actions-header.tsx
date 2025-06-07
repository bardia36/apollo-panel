import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  title: string;
  icon: string;
};

export const ActionsHeader = ({ title, icon }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <Icon icon={icon} className="min-w-6 h-6" />

      <h6 className="text-lg font-semibold text-default-foreground">{title}</h6>
    </div>
  );
};
