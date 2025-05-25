import { Key, useEffect, useState, lazy, Suspense } from "react";
import {
  ExpertRequestsProvider,
  useExpertRequests,
} from "./context/expert-requests-context";
import Loading from "../shared/loading";

const TitleActions = lazy(() => import("./title-actions"));
const TableTypeTabs = lazy(() => import("./table-components/table-type-tabs"));
const RequestsTable = lazy(() => import("./table-components/requests-table"));

function ExpertRequestsContent() {
  const [activeTab, setActiveTab] = useState("current");
  const { requests, loading, refreshRequests } = useExpertRequests();

  useEffect(() => {
    refreshRequests();
  }, [refreshRequests]);

  function onTabChange(key: Key) {
    setActiveTab(key as string);
  }

  return (
    <>
      <div className="lg:px-4">
        <Suspense fallback={<Loading />}>
          <TitleActions requestsCount={requests.totalDocs} />
          <TableTypeTabs activeTab={activeTab} onChange={onTabChange} />
        </Suspense>
      </div>
      <Suspense fallback={<Loading />}>
        <RequestsTable requests={requests} loading={loading} />
      </Suspense>
    </>
  );
}

export default function ExpertRequests() {
  return (
    <ExpertRequestsProvider>
      <ExpertRequestsContent />
    </ExpertRequestsProvider>
  );
}
