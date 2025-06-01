import { ExpertRequestDetail } from "@/types/expert-requests";

interface RequestHistoryProps {
  requestData: ExpertRequestDetail;
}

export default function RequestHistory({ requestData }: RequestHistoryProps) {
  return (
    <div>
      33
      <span>{requestData.owner.userName}</span>
    </div>
  );
}
