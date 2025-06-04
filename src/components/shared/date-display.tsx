import { Icon } from "@iconify/react/dist/iconify.js";
import { FC } from "react";
import { formatDateTime } from "@/utils/base";
import { cn } from "@heroui/react";

type Props = {
  isoDate: string;
  showTime?: boolean;
  className?: string;
};

const DateDisplay: FC<Props> = ({ isoDate, showTime = true, className }) => {
  const { formattedDate, formattedTime } = formatDateTime(isoDate);

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

export default DateDisplay;
