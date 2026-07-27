import { getUserSession } from "@/lib/core/session";
import React from "react";
import ManageLegalProfileClient from "./ManageLegalProfileClient";

export default async function LawyerProfileUpdatePage() {
  const initialLawyerData = await getUserSession();

  return <ManageLegalProfileClient initialData={initialLawyerData} />;
}
