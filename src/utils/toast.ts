import { toast } from "react-hot-toast";
import { Ri24HoursFill } from "react-icons/ri";

export const basicToastStyle = {
  borderRadius: "20px",
  background: "#333",
  color: "#fff",
};

export const successToast = (message: string) => {
  toast(message, {
    icon: "⚡️",
    duration: 3000,
    style: basicToastStyle,
  });
};

export const errorToast = (message: string) => {
  toast.error(message, {
    duration: 3000,
    style: basicToastStyle,
    // style: basicToastStyle,
  });
};

export const paymentSuccessToast = () => {
  toast("Payment Sent!", {
    icon: "⚡️",
    duration: 3000,
    style: basicToastStyle,
  });
};

export const paymentRecievedToast = () => {
  toast("Received Sats!", {
    icon: "⚡️",
    duration: 3000,
    style: basicToastStyle,
  });
};
