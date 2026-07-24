import { serverMuting } from "../core/server";

export const payment = async (data) => {
  return serverMuting(`/api/payment`, data, "POST");
};
