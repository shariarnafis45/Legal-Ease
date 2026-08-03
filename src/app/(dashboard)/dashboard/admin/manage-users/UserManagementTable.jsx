"use client";
import React, { useState } from "react";
import {
  Trash2,
  Shield,
  User,
  Gavel,
  Loader2,
  ChevronDown,
  Briefcase,
  AlertTriangle,
  X,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import {
  showErrorToast,
  showSuccessToast,
} from "@/app/components/shared/customToast";
import Image from "next/image";

const UserManagementTable = ({ initialUsers }) => {
  const [users, setUsers] = useState(initialUsers || []);
  const [loadingId, setLoadingId] = useState(null);

  // Modal State
  const [userToDelete, setUserToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRoleChange = async (userId, newRole) => {
    setLoadingId(userId);
    try {
      if (newRole === "admin") {
        const { data, error } = await authClient.admin.updateUser({
          userId: userId,
          data: { userType: newRole, role: newRole },
        });
      }
      const { data, error } = await authClient.admin.updateUser({
        userId: userId,
        data: { userType: newRole },
      });

      if (error) throw error;

      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, userType: newRole } : user,
        ),
      );

      showSuccessToast("User role updated successfully!");
    } catch (error) {
      showErrorToast("Failed to update role! Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  // Delete Modal Open
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
  };

  // Confirm Delete Action
  const confirmDelete = async () => {
    if (!userToDelete) return;
    setIsDeleting(true);

    try {
      const { error } = await authClient.admin.removeUser({
        userId: userToDelete.id,
      });

      if (error) throw error;

      setUsers(users.filter((u) => u.id !== userToDelete.id));
      showSuccessToast("User deleted successfully!");
      setUserToDelete(null);
    } catch (error) {
      showErrorToast("Failed to delete user!");
    } finally {
      setIsDeleting(false);
    }
  };

  const RoleBadge = ({ role }) => {
    const currentRole = role?.toLowerCase() || "client";

    const roleStyles = {
      admin:
        "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200 dark:border-rose-500/20",
      lawyer:
        "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20",
      client:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20",
    };

    const icons = {
      admin: <Shield className="w-3.5 h-3.5 mr-1.5" />,
      lawyer: <Gavel className="w-3.5 h-3.5 mr-1.5" />,
      client: <Briefcase className="w-3.5 h-3.5 mr-1.5" />,
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm ${
          roleStyles[currentRole] || roleStyles.client
        }`}
      >
        {icons[currentRole] || icons.client}
        <span className="capitalize">{currentRole}</span>
      </span>
    );
  };

  return (
    <>
      <div className="bg-white dark:bg-[#0B1324] rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-lg shadow-slate-200/20 dark:shadow-none overflow-hidden transition-all relative">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0B1324]/50 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
              User Management
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Manage your clients, lawyers, and admins
            </p>
          </div>
          <div className="px-3 py-1 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-semibold border border-indigo-100 dark:border-indigo-500/20">
            Total: {users.length}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800/60">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  User Info
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Status
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300">
                  Current Role
                </th>
                <th className="px-6 py-4 font-semibold text-slate-700 dark:text-slate-300 text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors duration-200 group"
                >
                  {/* Name & Avatar */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-sm bg-slate-100 dark:bg-slate-800 shrink-0">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-slate-500 dark:text-slate-400 font-bold bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white capitalize">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Email Verified Status */}
                  <td className="px-6 py-4">
                    {user.emailVerified ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-100 dark:border-emerald-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
                        Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-semibold border border-amber-100 dark:border-amber-500/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Role Badge */}
                  <td className="px-6 py-4">
                    <RoleBadge role={user.userType} />
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3 opacity-100 lg:opacity-60 lg:group-hover:opacity-100 transition-opacity duration-300">
                      {/* Role Selector */}
                      <div className="relative group/select">
                        <select
                          disabled={loadingId === user.id}
                          value={user.userType || "client"}
                          onChange={(e) =>
                            handleRoleChange(user.id, e.target.value)
                          }
                          className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 py-1.5 pl-3 pr-9 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all hover:border-slate-300 dark:hover:border-slate-500 shadow-sm w-[115px]"
                        >
                          <option value="client">Make Client</option>
                          <option value="lawyer">Make Lawyer</option>
                          <option value="admin">Make Admin</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500 dark:text-slate-400">
                          {loadingId === user.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5 group-hover/select:text-indigo-500 transition-colors" />
                          )}
                        </div>
                      </div>

                      {/* Delete Trigger Button */}
                      <button
                        onClick={() => handleDeleteClick(user)}
                        disabled={loadingId === user.id}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-all duration-200 disabled:opacity-50 border border-transparent hover:border-rose-100 dark:hover:border-rose-500/20"
                        title="Delete User"
                      >
                        {loadingId === user.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-rose-500" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {/* Empty State */}
              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-16 text-center text-slate-500 dark:text-slate-400 bg-slate-50/30 dark:bg-slate-900/20"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                        <User className="w-8 h-8 text-slate-400 dark:text-slate-500" />
                      </div>
                      <p className="text-base font-semibold text-slate-700 dark:text-slate-300">
                        No users found
                      </p>
                      <p className="text-sm mt-1">
                        Your database is currently empty.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Premium Confirmation Modal */}
      {userToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                Confirm Deletion
              </h3>
              <button
                onClick={() => !isDeleting && setUserToDelete(null)}
                disabled={isDeleting}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-14 h-14 bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 rounded-full flex items-center justify-center mb-4 ring-4 ring-rose-50 dark:ring-rose-500/10">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  Delete{" "}
                  <span className="text-rose-600 dark:text-rose-400 capitalize">
                    {userToDelete.name}
                  </span>
                  ?
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Are you sure you want to permanently remove this user? This
                  action cannot be undone and all associated data will be lost.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex gap-3">
              <button
                onClick={() => setUserToDelete(null)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-sm shadow-rose-600/20 disabled:opacity-70"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Yes, Delete
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserManagementTable;
