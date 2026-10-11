import { useToast } from "../../context/ToastContext";
import { FcOk, FcCancel } from "react-icons/fc";

function Toast() {
  const { toastData } = useToast();

  const success: string = "bg-(--success-soft) text-(--success)";
  const error: string = "bg-(--error-soft) text-(--success)";

  const show: string = "translate-y-2 opacity-100";
  const hide: string = "-translate-y-20 unset opacity-0";

  return (
    <div
      className={`absolute top-6 left-1/2 -translate-x-1/2 z-100 text-(--text-primary) w-fit max-w-sm bg-(--surface) border border-(--border) py-2 px-6 rounded-lg shadow-md text-xs font-semibold flex items-center justify-center gap-2 transition-all unset duration-300 unset ease-in-out ${toastData.status ? show : hide} ${toastData.type === "success" ? success : error}`}
    >
      {toastData.status ? <FcOk size={20} /> : <FcCancel size={20} />}
      <span className="">{toastData.message}</span>
    </div>
  );
}

export default Toast;
