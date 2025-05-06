import { Icon } from "@iconify/react/dist/iconify.js";
import jalaali from "jalaali-js";
import { FC } from "react";

type Props = {
  isoDate: string;
};

const DateDisplay: FC<Props> = ({ isoDate }) => {
  const date = new Date(isoDate);

  // Convert to Jalali
  const jDate = jalaali.toJalaali(date);

  // Extract time
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Format outputs
  const formattedDate = `${jDate.jy}/${jDate.jm.toString().padStart(2, "0")}/${jDate.jd.toString().padStart(2, "0")}`;
  const formattedTime = `${hours}:${minutes}`;

  return (
    <div className="w-fit text-default-500">
      <div className="flex items-center justify-between mb-2" >
        <Icon icon="solar:calendar-minimalistic-linear" className="text-default-300" />
        <div>{formattedTime}</div> {/* hh:mm */}
      </div>
      <div>{formattedDate}</div> {/* yyyy/mm/dd */}
    </div>
  );
};

export default DateDisplay;
