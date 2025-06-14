import { Suspense, lazy } from "react";
import { ExpertRequestDetail } from "@/types/expert-requests";
import RequestStatusSkeleton from "./loadings/request-status-skeleton";
import ImagesStatusAlertSkeleton from "./loadings/images-status-alert-skeleton";
import RequestUserSpecialistSkeleton from "./loadings/request-user-specialist-skeleton";
import RequestLocationSkeleton from "./loadings/request-location-skeleton";
import RequestTemplateSkeleton from "./loadings/request-template-skeleton";
import RequestContentSkeleton from "./loadings/request-content-skeleton";

const RequestStatus = lazy(() => import("./request-status"));
const ImagesStatusAlert = lazy(() => import("./images-status-alert"));
const RequestUserSpecialist = lazy(() => import("./request-user-specialist"));
const RequestLocation = lazy(() => import("./request-location"));
const RequestTemplate = lazy(() => import("./request-template"));
const RequestContent = lazy(() => import("./request-content"));

type RequestDetailsProps = {
  requestData: ExpertRequestDetail;
};

export default function RequestDetails({ requestData }: RequestDetailsProps) {
  const isRequestStatusVisible =
    !!requestData.status_history?.length ||
    (!!requestData.order_number &&
      ["COMPLETED", "REVIEWED"].includes(requestData.status));

  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <div className="col-span-12 grid lg:grid-cols-12 gap-12 bg-default-50 p-4 rounded-large">
        <Suspense fallback={<ImagesStatusAlertSkeleton />}>
          <div
            className={
              isRequestStatusVisible
                ? "lg:col-span-5 xl:col-span-8"
                : "lg:col-span-12"
            }
          >
            <ImagesStatusAlert
              gallery={requestData.gallery}
              status={requestData.status}
              updatedAt={requestData.previous_inspections?.[0]?.updatedAt}
            />
          </div>
        </Suspense>

        {isRequestStatusVisible && (
          <div className="lg:col-span-5 xl:col-span-4">
            <Suspense fallback={<RequestStatusSkeleton />}>
              <RequestStatus
                orderNumber={requestData.order_number}
                status={requestData.status}
                statusHistory={requestData.status_history}
              />
            </Suspense>
          </div>
        )}
      </div>

      <div className="col-span-12 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 order-1 lg:order-none bg-default-50 rounded-large p-4">
          <Suspense fallback={<RequestUserSpecialistSkeleton />}>
            <RequestUserSpecialist
              lead_specialist={requestData.lead_specialist}
              owner={requestData.owner}
              unit={requestData.unit}
              reviewers={requestData.reviewers}
            />
          </Suspense>
        </div>

        {!!requestData.locations?.length && (
          <div className="lg:col-span-4">
            <Suspense fallback={<RequestLocationSkeleton />}>
              <RequestLocation
                locations={requestData.locations}
                lastLocation={requestData.last_location}
              />
            </Suspense>
          </div>
        )}
      </div>

      <div className="col-span-12 grid xl:grid-cols-12 gap-4 xl:col-span-8 bg-default-50 rounded-large p-4">
        <div className="xl:col-span-5">
          <Suspense fallback={<RequestTemplateSkeleton />}>
            <RequestTemplate
              template={requestData.template_id}
              inspectionFormat={requestData.inspection_format}
              inspectionData={requestData.inspection_data}
              price={requestData.price}
            />
          </Suspense>
        </div>

        {!!requestData.gallery?.length && (
          <div className="xl:col-span-7">
            <Suspense fallback={<RequestContentSkeleton />}>
              <RequestContent fields={requestData.gallery} />
            </Suspense>
          </div>
        )}
      </div>
    </div>
  );
}
