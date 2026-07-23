import { serverMuting } from "../core/server";

export const updateUserType = async (userId, userType) => {
  return serverMuting(`/api/users/${userId}`, { userType }, "PATCH");
};

export const updateLawyerProfile = async (userId, data) => {
  console.log(userId, data);
  return serverMuting(`/api/lawyers/${userId}`, data, "PATCH");
};
