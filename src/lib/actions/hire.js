import { serverMuting } from "../core/server";

export const sendHiringRequest = async (data) => {
  return serverMuting(`/api/hire-request`, data, "POST");
};
