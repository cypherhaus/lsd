import { Layout } from "../../components/common/Layout";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

export default function Settings() {
  const productId = "price_1Mp3cGHhNVk5cpHJVnF7UdYb";

  const handleSubsciption = async () => {
    const { data } = await axios.get(`/api/create-session/${productId}`);
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? "");
    await stripe?.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <Layout>
      <button onClick={handleSubsciption} className="bg-white w-20">
        Checkout
      </button>
    </Layout>
  );
}
