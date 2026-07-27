import { serverFetch } from "../core/server";

export const requestAlreadyExist = async (clientId, lawyerId) => {
  return serverFetch(`/api/hiring?clientId=${clientId}&lawyerId=${lawyerId}`);
};
export const getClientHiringRequestHistory = async (clientId) => {
  return serverFetch(`/api/client/hiring-request?clientId=${clientId}`);
};
export const getLawyerHiringRequestHistory = async (lawyerId) => {
  return serverFetch(`/api/lawyer/hiring-request?lawyerId=${lawyerId}`);
};
