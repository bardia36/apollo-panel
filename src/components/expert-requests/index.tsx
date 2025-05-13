import { Key, useEffect, useState } from "react";
import TitleActions from "./title-actions";
import TableTypeTabs from "./table-components/table-type-tabs";
import RequestsTable from "./table-components/requests-table";
import { ExpertRequestResponse } from "@/types/expertRequests";
import { expertRequestsApi } from "@/services/api/expert-requests";
import { exceptionHandler } from "@/services/api/exception";

export default function ExpertRequests() {
  const [activeTab, setActiveTab] = useState("current");
  const [loading, setLoading] = useState<boolean>(false);
  const [requests, setRequests] = useState<ExpertRequestResponse>({
    docs: [],
    hasNextPage: false,
    hasPrevPage: false,
    limit: 10,
    page: 1,
    totalDocs: 0,
    totalPage: 1,
  });

  useEffect(() => {
    getRequests();
  }, []);

  async function getRequests() {
    setLoading(true);
    try {
      const res = await expertRequestsApi.getRequests({
        inspection_format: "PRE_INSURANCE_BODY_INSPECTION",
      });
      setRequests(res);
    } catch (err) {
      exceptionHandler(err);
    } finally {
      setLoading(false);
    }
  }

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
