import { useEffect } from "react";
import { t } from "i18next";
import { useBreadcrumb } from "@/contexts/breadcrumbContext";
import ExpertRequests from "@/components/expert-requests";

export default function ExpertRequestsPage() {
  const { setLinks } = useBreadcrumb();

  useEffect(() => {
    setLinks([{ name: t("title.expertRequests"), url: "/expert-requests" }]);
  }, [setLinks]);

  return <ExpertRequests />;
}
