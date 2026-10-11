import {
  useState,
  useContext,
  createContext,
  type ReactNode,
  useRef,
} from "react";

type toastType = "success" | "error";

interface IToastProp {
  children: ReactNode;
}

export interface IToast {
  status: boolean;
  type: toastType;
  message: string;
}

interface IToastContext {
  toastData: IToast;
  displayToast: (type: toastType, message: string) => void;
}

const ToastContext = createContext<IToastContext | undefined>(undefined);

export function ToastProvider({ children }: IToastProp) {
  const [toastData, setToastData] = useState<IToast>({
    status: false,
    type: "success",
    message: "",
  });

  const toastTimer = useRef<number | null>(null);

  function displayToast(type: toastType, message: string): void {
    if (type.trim() === "" || message.trim() === "") {
      throw new Error("Cannot display toaster without any type and message");
    }
    if (toastTimer.current !== null) window.clearTimeout(toastTimer.current);
    setToastData({ status: true, type: type, message: message });
    toastTimer.current = setTimeout(() => {
      setToastData((prev) => ({ ...prev, status: false }));
    }, 1500);
  }

  return (
    <ToastContext.Provider value={{ toastData, displayToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = (): IToastContext => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("userToast must be used within and ToastProvider");
  }
  return context;
};
