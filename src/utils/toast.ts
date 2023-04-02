import { toast } from "react-hot-toast";

export const basicToastStyle = {
  background: "#EFEFEF",
  borderColor: "black",
  borderWidth: 2,
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
