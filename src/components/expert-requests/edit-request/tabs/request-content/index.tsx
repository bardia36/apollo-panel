import { ExpertRequestDetail } from "@/types/expert-requests";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";

type RequestContentProps = {
  requestData: ExpertRequestDetail;
};

export default function RequestContent({ requestData }: RequestContentProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-default-50 rounded-large p-4">
        <div className="flex justify-between items-center mb-6">
          <h6 className="text-xs">تصاویر اطراف خودرو</h6>

          <div className="flex items-center gap-2">
            <Button
              variant="light"
              size="sm"
              startContent={
                <Icon icon="solar:play-circle-bold" className="min-w-5 h-5" />
              }
            >
              افزودن تصویر
            </Button>

            <Button
              variant="flat"
              size="sm"
              startContent={
                <Icon icon="solar:zip-file-bold" className="min-w-5 h-5" />
              }
            >
              فایل zip محتویات
            </Button>

            <Button
              variant="solid"
              color="primary"
              size="sm"
              startContent={
                <Icon
                  icon="solar:download-minimalistic-bold"
                  className="min-w-5 h-5"
                />
              }
            >
              دریافت فایل PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 lg:col-span-1">slider</div>

          <div className="col-span-2 lg:col-span-1">chart</div>
        </div>
      </div>

      <div className="bg-default-50 rounded-large grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        <h6 className="text-xs mb-4 text-default-600">عکس‌های مورد کارشناسی</h6>

        <div className="grid grid cols-2 lg:grid-cols-4 gap-4">
          
        </div>
      </div>

      <div className="bg-default-50 rounded-large grid grid-cols-2 md:grid-cols-4 gap-4 p-4"></div>
    </div>
  );
}
