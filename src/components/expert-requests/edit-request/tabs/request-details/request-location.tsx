import { ExpertRequestDetail } from "@/types/expert-requests";
import { formatDate } from "@/utils/base";
import { t } from "i18next";
import CopyButton from "../../../../shared/copy-button";
import { Select, SelectItem } from "@heroui/react";

type RequestLocationProps = {
  locations: ExpertRequestDetail["locations"];
};

export default function RequestLocation({ locations }: RequestLocationProps) {
  const location = locations[0];
  const { formattedDate, formattedTime } = formatDate(location.createdAt);

  return (
    <div className="relative">
      <div className="absolute inset-0 z-10 p-4 flex flex-col justify-between bg-default-50/50">
        <div className="flex items-center justify-between gap-2">
          <div className="w-full">
            <p className="text-xs text-default-600">{t("shared.location")}</p>
          </div>

          <Select
            defaultSelectedKeys={["1"]}
            size="sm"
            variant="flat"
            fullWidth
          >
            {/* {times.map((time) => ( */}
            <SelectItem key={"1"}>
              {formattedTime} - {formattedDate}
            </SelectItem>
            {/* ))} */}
          </Select>
        </div>

        {!!location.address && (
          <div className="bg-content1 rounded-3xl px-4 py-2 flex items-center gap-2">
            <CopyButton
              value={location.address}
              btnFit
              size="3"
              iconSize="12"
              iconClassName="text-content4-foreground"
            />
            <p className="text-sm text-content2-foreground line-clamp-1">
              {location.address}
            </p>
          </div>
        )}
      </div>

      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12956.384573161538!2d${location.lng}!3d${location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1748949620144!5m2!1sen!2s`}
        width="100%"
        height="184px"
        className="rounded-large"
        style={{ border: "0" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
