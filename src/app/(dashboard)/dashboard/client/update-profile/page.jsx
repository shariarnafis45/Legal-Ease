import React from "react";
import { getUserSession } from "@/lib/core/session";
import UpdateProfileForm from "./UpdateProfileForm";

export default async function ClientProfileUpdatePage() {
  const user = await getUserSession();

  return <UpdateProfileForm initialUser={user} />;
}