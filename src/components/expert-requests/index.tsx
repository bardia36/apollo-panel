import { Key, useEffect, useState, lazy, Suspense } from "react";
import {
  ExpertRequestsProvider,
  useExpertRequests,
} from "./index-components/context/expert-requests-context";
import Loading from "../shared/loading";

const TitleActions = lazy(
  () => import("./index-components/table-components/title-actions")
);
const TableTypeTabs = lazy(
  () => import("./index-components/table-components/table-type-tabs")
);
const RequestsTable = lazy(
  () => import("./index-components/table-components/requests-table")
);

function ExpertRequestsContent() {
  const [activeTab, setActiveTab] = useState("current");
  const { requests, loading, refreshRequests } = useExpertRequests();

  useEffect(() => {
    refreshRequests();
  }, [refreshRequests]);

  function onTabChange(key: Key | null) {
    if (key === null) setActiveTab("current");
    else setActiveTab(key as string);
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
