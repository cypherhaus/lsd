import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const handler: Handler = async (event, context) => {
  if (event?.queryStringParameters?.lnAddress) {
    const { lnAddress } = event?.queryStringParameters;

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
