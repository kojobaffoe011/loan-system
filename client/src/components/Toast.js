import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showErrorToast = (error) => {
  toast.error(error, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const showSuccessToast = (success) => {
  toast.success(success, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
