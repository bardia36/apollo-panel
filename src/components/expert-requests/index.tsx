import { Key, useEffect, useState } from "react";
import TitleActions from "./title-actions";
import TableTypeTabs from "./table-components/table-type-tabs";
import RequestsTable from "./table-components/requests-table";
import {
  useExpertRequests,
  ExpertRequestsProvider,
} from "./context/expert-requests-context";

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
        <TitleActions requestsCount={requests.totalDocs} />
        <TableTypeTabs activeTab={activeTab} onChange={onTabChange} />
      </div>
      <RequestsTable requests={requests} loading={loading} />
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
