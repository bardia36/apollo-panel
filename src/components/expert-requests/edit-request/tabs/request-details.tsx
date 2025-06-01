import { ExpertRequestDetail } from "@/types/expert-requests";

interface RequestDetailsProps {
  requestData: ExpertRequestDetail;
}

export default function RequestDetails({ requestData }: RequestDetailsProps) {
  return (
    <div>
      11
      <span>{requestData.owner.userName}</span>
    </div>
  );
}
