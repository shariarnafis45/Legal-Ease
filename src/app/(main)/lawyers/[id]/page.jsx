import { getLawyerDetailsById } from "@/lib/api/lawyers";
import React from "react";
import LawyerDetailsClient from "./LawyerDetailsClient";
import { getUserSession } from "@/lib/core/session";
import { requestAlreadyExist } from "@/lib/api/hire";

const LawyersDetailsPage = async ({ params }) => {
  const { id } = await params;
  const lawyerDetails = await getLawyerDetailsById(id);
  const user = await getUserSession();

  const checkRequest = await requestAlreadyExist(user?.id, id);

  const hasAlreadyRequested =
    checkRequest?.status === "pending" || checkRequest?.status === "accepted";

  return (
    <LawyerDetailsClient
      lawyer={lawyerDetails}
      user={user || null}
      hasAlreadyRequested={hasAlreadyRequested}
      isAccepted={checkRequest?.status === "accepted"}
      isRejected={checkRequest?.status === "rejected"}
      isPaid={checkRequest?.paymentStatus === "paid"}
    />
  );
};

export default LawyersDetailsPage;
