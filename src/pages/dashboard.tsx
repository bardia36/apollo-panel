import { useEffect } from "react";
import { useBreadcrumb } from "@/contexts/breadcrumbContext";

export default function IndexPage() {
  const { setLinks } = useBreadcrumb();

  useEffect(() => setLinks([]), [setLinks]);

  return <div>Dashboard</div>;
}
