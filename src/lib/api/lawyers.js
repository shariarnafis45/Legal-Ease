import { serverFetch } from "../core/server";

export const getCompleteLawyers = () => {
  return serverFetch(`/api/lawyers`);
};

export const getLawyerDetailsById = (lawyerId) => {
  return serverFetch(`/api/lawyers/${lawyerId}`);
};
