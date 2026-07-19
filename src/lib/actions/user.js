import { serverMuting } from "../core/server";

export const updateUserType = async (userId, userType) => {
  console.log(userType);
  return serverMuting(`/api/users/${userId}`, {userType}, "PATCH");
};
