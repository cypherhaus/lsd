import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const handler: Handler = async (event, context) => {
  const supabaseClient = createClient(
    process.env.REACT_APP_SUPABASE_URL ?? "",
    process.env.REACT_APP_SUPABASE_KEY ?? ""
  );
  if (
    event?.queryStringParameters?.lnAddress &&
    event?.queryStringParameters?.id
  ) {
    const { lnAddress, id } = event?.queryStringParameters;

    const data = await axios.get(
      `https://api.zebedee.io/v0/ln-address/validate/${lnAddress}`,
      {
        headers: {
          apikey: process.env.REACT_APP_ZEBEDEE_KEY ?? "",
          "Content-Type": "application/json",
        },
      }
    );

    console.log({ data });

    if (data) {
      const response = await supabaseClient
        .from("profile")
        .update({ lnAddress })
        .eq("id", id);

      console.log({ response });
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Succesfully updated charge" }),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: "Error settling charge" }),
  };
};

export { handler };
