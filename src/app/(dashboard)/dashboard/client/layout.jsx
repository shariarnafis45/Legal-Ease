import { requireRole } from "@/lib/core/session";

const ClientLayout = async ({children}) => {
  await requireRole("client");
  return children;
};

export default ClientLayout;
