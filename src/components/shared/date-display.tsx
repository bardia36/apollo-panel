import { Icon } from "@iconify/react/dist/iconify.js";
import { FC } from "react";
import { formatDateTime } from "@/utils/base";

type Props = {
  isoDate: string;
};

const DateDisplay: FC<Props> = ({ isoDate }) => {
  const { formattedDate, formattedTime } = formatDateTime(isoDate);

  return (
    <div className="w-fit text-default-500">
      <div className="flex items-center justify-between mb-2">
        <Icon
          icon="solar:calendar-minimalistic-linear"
          className="text-default-300"
        />
        <div>{formattedTime}</div> {/* hh:mm */}
      </div>
      <div>{formattedDate}</div> {/* yyyy/mm/dd */}
    </div>
  );
};

export default DateDisplay;
