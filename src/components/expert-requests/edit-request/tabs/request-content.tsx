import { ExpertRequestDetail } from "@/types/expert-requests";

interface RequestContentProps {
  requestData: ExpertRequestDetail;
}

export default function RequestContent({ requestData }: RequestContentProps) {
  return (
    <div>
      22
      <span>{requestData.owner.userName}</span>
    </div>
  );
}
