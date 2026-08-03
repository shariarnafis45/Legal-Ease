import { getUsersList } from "@/lib/api/users";
import UserManagementTable from "./UserManagementTable";

const AdminUserManagePage = async () => {
  const users = await getUsersList();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Manage Users
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View, update roles, and manage all users in the system.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-full border border-indigo-100 dark:border-indigo-500/20 font-medium text-sm transition-all shadow-sm">
          Total Users: <span className="font-bold">{users?.length || 0}</span>
        </div>
      </div>

      {/* Client Component for the Table */}
      <UserManagementTable initialUsers={users} />
    </div>
  );
};

export default AdminUserManagePage;
