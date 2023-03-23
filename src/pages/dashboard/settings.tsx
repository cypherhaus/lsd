import { useEffect, useState } from "react";
import { Layout } from "../../components/common/Layout";
import { loadStripe } from "@stripe/stripe-js";
import { useStore } from "../../store";
import { supabase } from "../../config/supabase";

export default function Settings() {
  const { authView } = useStore();
  const [stripe, setStripe] = useState<any>(null);

  const productId = "";

  const initStripe = async () => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? "");
    setStripe(stripe);
  };

  useEffect(() => {
    const retrieveSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) authView.init(data.session?.user?.id);
    };

    retrieveSession();
    initStripe();
  }, []);

  const handleCheckout = async () => {
    const sessionData = {
      lineItems: [
        {
          price: productId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      successUrl: "http://localhost:3000/dashboard/settings",
      cancelUrl: "http://localhost:3000/dashboard/settings",
    };

    await stripe.redirectToCheckout(sessionData);
  };

  return (
    <Layout>
      <button onClick={handleCheckout} className="bg-white w-20">
        Checkout
      </button>
    </Layout>
  );
}
