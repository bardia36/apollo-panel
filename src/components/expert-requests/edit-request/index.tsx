import { exceptionHandler } from "@/apis/exception";
import { expertRequestsApi } from "@/apis/expert-requests";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { EditHeader } from "./edit-header";

export default function () {
  const { id } = useParams();

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

  if (isLoading) return <div>Loading...</div>;

  return (
    !!request && (
      <div>
        <EditHeader
          requestData={{
            _id: request?._id,
            status: request?.status,
            key: request?.key,
            createdAt: request?.createdAt,
          }}
        />
      </div>
    )
  );
}
