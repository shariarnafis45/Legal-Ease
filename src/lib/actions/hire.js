import { serverMuting } from "../core/server";

export const sendHiringRequest = async (data) => {
  return serverMuting(`/api/hire-request`, data, "POST");
};

export const updateHiringStatus = async (clientId, lawyerId, status) => {

  return serverMuting(
    `/api/update-hiring-status?clientId=${clientId}&lawyerId=${lawyerId}`,
    status,
    "PATCH",
  );
};
