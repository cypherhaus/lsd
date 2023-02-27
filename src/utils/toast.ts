import { toast } from "react-hot-toast";

export const basicToastStyle = {
  borderRadius: "20px",
  background: "#333",
  color: "#fff",
};

export const successToast = (message: string) => {
  toast.success(message, {
    duration: 3000,
    style: basicToastStyle,
  });
};

export const errorToast = (message: string) => {
  toast.error(message, {
    duration: 3000,
    style: basicToastStyle,
  });
};
