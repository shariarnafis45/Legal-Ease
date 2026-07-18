import { serverFetch } from "../core/server";

export const getCompleteLawyers = () => {
  return serverFetch(`/api/lawyers`);
};
