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

export type TableTab = "current" | "archive";

function ExpertRequestsContent() {
  const [activeTab, setActiveTab] = useState<TableTab>("current");
  const { requests, loading, refreshRequests } = useExpertRequests();

  useEffect(() => {
    refreshRequests();
  }, [refreshRequests]);

  function onTabChange(key: Key | null) {
    if (key === null) setActiveTab("current");
    else setActiveTab(key as TableTab);

    // Reset pagination and refresh with new archive status
    refreshRequests({
      page: 1,
      limit: 10,
      is_archive: key === "archive",
    });
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
