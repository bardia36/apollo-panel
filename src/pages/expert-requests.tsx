import { useEffect } from "react";
import { useBreadcrumb } from "@/context/breadcrumbContext";
import { t } from "i18next";

export default function ExpertRequestsPage() {
  const { setLinks } = useBreadcrumb();

  useEffect(() => {
    setLinks([{ name: t("title.expertRequests"), url: "/expert-requests" }]);
  }, [setLinks]);

  return <div>ExpertRequests</div>;
}
