import { useState } from "react";
import TitleActions from "./title-actions";
import TableTypeTabs from "./table-components/table-type-tabs";
import RequestsTable from "./table-components/requests-table";

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
