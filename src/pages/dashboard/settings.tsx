import { Layout } from "../../components/common/Layout";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { BASIC_PLAN_ID } from "../../constants/stripe";

export default function Settings() {
  const handleSubsciption = async () => {
    const { data } = await axios.get(`/api/create-session/${BASIC_PLAN_ID}`);
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
