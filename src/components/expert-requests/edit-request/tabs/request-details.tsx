import CollapsableCards from "@/components/shared/collapsable-cards";
import { ExpertRequestDetail } from "@/types/expert-requests";

interface RequestDetailsProps {
  requestData: ExpertRequestDetail;
}

export default function RequestDetails({ requestData }: RequestDetailsProps) {
  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <div className="col-span-12 grid lg:grid-cols-12 gap-12 bg-default-50 p-4 rounded-large">
        <div className="flex flex-col bg-content1 shadow-md rounded-3xl lg:col-span-8 p-6">
          <div className="min-h-[156px] w-full flex items-center justify-center">
            <CollapsableCards
              items={[
                {
                  title: "test",
                  path: null,
                  name: "test",
                  isLicense: true,
                },
                {
                  title: "test2",
                  path: null,
                  name: "test2",
                },
                {
                  title: "test3",
                  path: "test3",
                  name: "test3",
                },
                {
                  title: "test4",
                  path: "test4",
                  name: "test4",
                },
              ]}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-right">
              <span>در انتظار بررسی</span>
              <div className="w-5 h-5 bg-primary-500 rounded-full" />
              <span>که</span>
              <span>روز و ۴ ساعت ۲</span>
              <span>این درخواست</span>
              <span>است.</span>
            </div>

            <p className="text-right">
              لطفاً پس از مشاهده محتویات و بررسی آن، درخواست را تأیید یا رد
              کنید.
            </p>

            <div className="flex items-center gap-4 mt-2">
              <button className="bg-primary-500 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                <span>▶</span>
                مشاهده محتویات
              </button>
              <button className="border border-default-200 px-6 py-2 rounded-lg flex items-center gap-2">
                <span>⬇</span>
                دانلود
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4">steps</div>
      </div>

      <div className="col-span-12 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 order-1 lg:order-none bg-default-50 rounded-large p-4 flex gap-4">
          user
        </div>
        <div className="lg:col-span-4">location</div>
      </div>

      <div className="col-span-12 grid lg:grid-cols-12 gap-4 lg:col-span-8 bg-default-50 rounded-large p-4">
        <div className="lg:col-span-5 p-4 bg-content1 rounded-3xl">
          template
        </div>
        <div className="lg:col-span-7 p-4 bg-content1 rounded-3xl">detail</div>
      </div>
    </div>
  );
}
