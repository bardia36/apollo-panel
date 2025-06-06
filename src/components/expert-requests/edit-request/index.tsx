import { exceptionHandler } from "@/apis/exception";
import { expertRequestsApi } from "@/apis/expert-requests";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { EditHeader } from "./edit-header";
import { RequestTabContent } from "./request-tab-content";
import { useState } from "react";
import RequestLoadingSkeleton from "./edit-skeleton";
// import data from "../data";

export default function () {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("details");

  const { data: request, isLoading } = useQuery({
    queryKey: ["expert-request", id],
    queryFn: async () => {
      try {
        return await expertRequestsApi.getRequestById(id || "0");
      } catch (err) {
        exceptionHandler(err);
      }
    },
    enabled: !!id,
  });

  if (isLoading) return <RequestLoadingSkeleton />;

  // const request = data;

  return (
    !!request && (
      <>
        <EditHeader
          requestData={request}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <RequestTabContent activeTab={activeTab} requestData={request} />
      </>
    )
  );
}
