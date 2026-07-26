import { getClientHiringRequestHistory } from "@/lib/api/hire";
import { getUserSession } from "@/lib/core/session";
import HiringHistoryClient from "./HiringHistoryClient";

export const metadata = {
  title: "Hiring History | Dashboard",
  description: "View your lawyer hiring history and payment status.",
};

const HiringHistoryPage = async () => {
  const user = await getUserSession();

  const historyData = (await getClientHiringRequestHistory(user?.id)) || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Hiring History
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track your lawyer hiring requests, status, and payments.
          </p>
        </div>
        <HiringHistoryClient initialData={historyData} />
      </div>
    </div>
  );
};

export default HiringHistoryPage;
