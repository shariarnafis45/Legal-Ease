"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user || null;
  return user;
};

export const requireRole = async (role) => {
  const user = await getUserSession();
  if (!user) {
    redirect("/auth/signin");
  }
  if (role !== user?.userType) {
    redirect("/unauthorized");
  }
};
