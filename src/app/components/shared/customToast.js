import toast from "react-hot-toast";
import { FaCircleXmark, FaXmark, FaCircleCheck } from "react-icons/fa6"; 

export const showErrorToast = (message) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white dark:bg-[#0B1324] shadow-2xl rounded-2xl pointer-events-auto flex border border-rose-500/30 p-4 transition-all duration-300`}
      >
        <div className="flex items-start gap-3 w-full">
          <FaCircleXmark className="text-rose-500 text-xl flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-slate-800 dark:text-white">
              Action Failed
            </p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              {message}
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <FaXmark size={16} />
          </button>
        </div>
      </div>
    ),
    { duration: 4000 }
  );
};


export const showSuccessToast = (message) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-white dark:bg-[#0B1324] shadow-2xl rounded-2xl pointer-events-auto flex border border-emerald-500/30 p-4 transition-all duration-300`}
      >
        <div className="flex items-start gap-3 w-full">
          <FaCircleCheck className="text-emerald-500 text-xl flex-shrink-0 mt-0.5" />
          <div className="flex-1 text-left">
            <p className="text-sm font-bold text-slate-800 dark:text-white">
              Success
            </p>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
              {message}
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <FaXmark size={16} />
          </button>
        </div>
      </div>
    ),
    { duration: 4000 }
  );
};