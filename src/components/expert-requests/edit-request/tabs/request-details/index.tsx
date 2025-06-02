import { Suspense, lazy } from "react";
import { ExpertRequestDetail } from "@/types/expert-requests";
import StatusFlowStepsSkeleton from "./loadings/images-status-alert-skeleton";
import ImagesStatusAlertSkeleton from "./loadings/images-status-alert-skeleton";

const StatusFlowSteps = lazy(() => import("./status-flow-steps"));
const ImagesStatusAlert = lazy(() => import("./images-status-alert"));

interface RequestDetailsProps {
  requestData: ExpertRequestDetail;
}

export default function RequestDetails({ requestData }: RequestDetailsProps) {
  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <div className="col-span-12 grid lg:grid-cols-12 gap-12 bg-default-50 p-4 rounded-large">
        <Suspense fallback={<ImagesStatusAlertSkeleton />}>
          <ImagesStatusAlert requestData={requestData} />
        </Suspense>

        <div className="lg:col-span-4">
          <Suspense fallback={<StatusFlowStepsSkeleton />}>
            <StatusFlowSteps />
          </Suspense>
        </div>
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
