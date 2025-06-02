import { Suspense, lazy } from "react";
import { ExpertRequestDetail } from "@/types/expert-requests";
import Loading from "@/components/shared/loading";

// Lazy load tab content components
const RequestDetails = lazy(
  () => import("./tabs/request-details")
);
const RequestContent = lazy(() => import("./tabs/request-content"));
const RequestHistory = lazy(() => import("./tabs/request-history"));

interface RequestTabContentProps {
  activeTab: string;
  requestData: ExpertRequestDetail;
}

export const RequestTabContent = ({
  activeTab,
  requestData,
}: RequestTabContentProps) => {
  const renderContent = () => {
    switch (activeTab) {
      case "details":
        return <RequestDetails requestData={requestData} />;
      case "content":
        return <RequestContent requestData={requestData} />;
      case "history":
        return <RequestHistory requestData={requestData} />;
      default:
        return null;
    }
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="mt-4">{renderContent()}</div>
    </Suspense>
  );
};
