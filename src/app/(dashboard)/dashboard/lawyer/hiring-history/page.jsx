import { getUserSession } from "@/lib/core/session";
import LawyerHiringHistoryWrapper from "./LawyerHiringHistoryWrapper";
import { getLawyerHiringRequestHistory } from "@/lib/api/hire";

export default async function LawyerHiringHistoryPage() {
  const lawyer = await getUserSession();
  const requests = await getLawyerHiringRequestHistory(lawyer?.id);

  return <LawyerHiringHistoryWrapper initialRequests={requests} />;
}
