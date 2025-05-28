import { Image } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import asiaInsuranceImg from "@/assets/images/layout/asia-insurance.webp";

// TODO: Change UI. Add logic
export default function Workspace() {
  return (
    <div className="mb-6 border border-default-100 rounded-[18px] shadow-sm p-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Image
          src={asiaInsuranceImg}
          alt="Asia Insurance"
          width={64}
          height={64}
          className="px-4 py-2"
        />

        <div className="flex flex-col gap-1">
          <p className="text-foreground text-small">شرکت بیمه آسیا</p>
          <p className="text-foreground-400 text-tiny">سرویس بازدید آنلاین</p>
        </div>
      </div>

      <Icon icon="flowbite:chevron-sort-outline" width={16} height={16} />
    </div>
  );
}
