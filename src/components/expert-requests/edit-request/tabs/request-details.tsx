import { ExpertRequestDetail } from "@/types/expert-requests";

interface RequestDetailsProps {
  requestData: ExpertRequestDetail;
}

export default function RequestDetails({ requestData }: RequestDetailsProps) {
  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <div className="col-span-12 grid lg:grid-cols-12 gap-12 bg-default-50 p-4 rounded-large">
        <div className="flex items-center justify-between flex-col bg-content1 shadow-md rounded-3xl py-6 px-4 lg:col-span-8">
          image
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
