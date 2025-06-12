import RequestTemplateSkeleton from "./loadings/request-template-skeleton";
import RequestContentSkeleton from "./loadings/request-content-skeleton";
import RequestLocationSkeleton from "./loadings/request-location-skeleton";
import RequestUserSpecialistSkeleton from "./loadings/request-user-specialist-skeleton";
import RequestStatusSkeleton from "./loadings/request-status-skeleton";
import ImagesStatusAlertSkeleton from "./loadings/images-status-alert-skeleton";

export default function RequestDetailsSkeleton() {
  return (
    <div className="grid lg:grid-cols-12 gap-4">
      <div className="col-span-12 grid lg:grid-cols-12 gap-12 bg-default-50 p-4 rounded-large">
        <ImagesStatusAlertSkeleton />

        <div className="lg:col-span-4">
          <RequestStatusSkeleton />
        </div>
      </div>

      <div className="col-span-12 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 order-1 lg:order-none bg-default-50 rounded-large p-4">
          <RequestUserSpecialistSkeleton />
        </div>

        <div className="lg:col-span-4">
          <RequestLocationSkeleton />
        </div>
      </div>

      <div className="col-span-12 grid lg:grid-cols-12 gap-4 lg:col-span-8 bg-default-50 rounded-large p-4">
        <div className="lg:col-span-5">
          <RequestTemplateSkeleton />
        </div>

        <div className="lg:col-span-7">
          <RequestContentSkeleton />
        </div>
      </div>
    </div>
  );
}
