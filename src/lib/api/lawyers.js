import { serverFetch } from "../core/server";

export const getCompleteLawyers = (query) => {
  return serverFetch(`/api/lawyers?${query}`);
};

export const getLawyerDetailsById = (lawyerId) => {
  return serverFetch(`/api/lawyers/${lawyerId}`);
};
