import { requireRole } from "@/lib/core/session";

const LawyerLayout = async ({children}) => {
  await requireRole("lawyer");
  return children;
};

export default LawyerLayout;
