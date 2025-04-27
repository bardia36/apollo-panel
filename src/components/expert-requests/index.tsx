import TitleActions from "./title-actions";
import TableTypeTabs from "./table-type-tabs";
import { useState } from "react";
import RequestsTable from "./requests-table";

export default function ExpertRequests() {
  const [activeTab, setActiveTab] = useState("current");

  function onTabChange(tab: string) {
    setActiveTab(tab);
  }

  return (
    <>
      <div className="lg:px-4">
        <TitleActions />
        <TableTypeTabs activeTab={activeTab} onChange={onTabChange} />
      </div>
      <RequestsTable />
    </>
  );
}
