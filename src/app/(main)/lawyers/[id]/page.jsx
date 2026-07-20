import { getLawyerDetailsById } from "@/lib/api/lawyers";

import React from "react";
import LawyerDetailsClient from "./LawyerDetailsClient";
import { getUserSession } from "@/lib/core/session";

const LawyersDetailsPage = async ({ params }) => {
  const { id } = await params;
  const lawyerDetails = await getLawyerDetailsById(id);
  const session = await getUserSession();

  if (!lawyerDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white">
        <h2 className="text-2xl font-bold">Lawyer Not Found</h2>
      </div>
    );
  }

  return (
    <LawyerDetailsClient lawyer={lawyerDetails} user={session?.user || null} />
  );
};

export default LawyersDetailsPage;
