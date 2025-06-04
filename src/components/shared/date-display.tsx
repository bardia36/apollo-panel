import { Icon } from "@iconify/react/dist/iconify.js";
import { FC } from "react";
import { formatDate } from "@/utils/base";
import { cn } from "@heroui/react";

type Props = {
  isoDate: string;
  showTime?: boolean;
  className?: string;
};

export const DateDisplay: FC<Props> = ({ isoDate, showTime = true, className }) => {
  const { formattedDate, formattedTime } = formatDate(isoDate);

  return (
    <div className={cn("w-fit text-default-500", className)}>
      {showTime && (
        <div className="flex justify-between items-center mb-2">
          <Icon
            icon="solar:calendar-minimalistic-linear"
            className="text-default-300"
          />
          <div>{formattedTime}</div> {/* hh:mm */}
        </div>
      )}
      <div>{formattedDate}</div> {/* yyyy/mm/dd */}
    </div>
  );
};

export const OneLineDateDisplay: FC<Props> = ({ isoDate, className }) => {
  const { formattedDate, formattedTime, formattedWeekDay } =
    formatDate(isoDate);

  return (
    <span className={className}>
      {formattedWeekDay} {formattedDate} - {formattedTime}
    </span>
  );
};
