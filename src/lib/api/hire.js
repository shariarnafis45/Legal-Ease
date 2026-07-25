import { serverFetch } from "../core/server";

export const requestAlreadyExist = async (clientId, lawyerId) => {
  return serverFetch(`/api/hiring?clientId=${clientId}&lawyerId=${lawyerId}`);
};
