import { Icon } from "@iconify/react/dist/iconify.js";
import { FC } from "react";
import { formatDate } from "@/utils/base";

type Props = {
  isoDate: string;
  className?: string;
};

export const TwoLineDateDisplay: FC<Pick<Props, "isoDate">> = ({ isoDate }) => {
  const { formattedDate, formattedTime } = formatDate(isoDate);

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

export const OneLineDateDisplay: FC<Props> = ({ isoDate, className }) => {
  const { formattedDate, formattedTime, formattedWeekDay } =
    formatDate(isoDate);

  return (
    <span className={className}>
      {formattedWeekDay} {formattedDate} - {formattedTime}
    </span>
  );
};
