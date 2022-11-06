import { toast } from "react-hot-toast";

const basicStyle = {
  borderRadius: "20px",
  background: "#333",
  color: "#fff",
};

export const successToast = (message: string) => {
  toast(message, {
    icon: "⚡️",
    duration: 3000,
    style: basicStyle,
  });
};

export const paymentSuccessToast = () => {
  toast("Payment Sent!", {
    icon: "⚡️",
    duration: 3000,
    style: basicStyle,
  });
};

export const paymentRecievedToast = () => {
  toast("Received Sats!", {
    icon: "⚡️",
    duration: 3000,
    style: basicStyle,
  });
};
