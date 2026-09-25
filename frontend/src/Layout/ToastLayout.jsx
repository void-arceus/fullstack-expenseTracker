import { Outlet } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import Toaster from "../Animations/Toaster";

const ToastLayout = () => {
  const { toast } = useToast();

  return (
    <>
      <Toaster show={toast.show} message={toast.message} type={toast.type} />
      <Outlet />
    </>
  );
};

export default ToastLayout;
