import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTION",
};

const handler: Handler = async (event, context) => {
  const supabaseClient = createClient(
    process.env.REACT_APP_SUPABASE_URL ?? "",
    process.env.REACT_APP_SUPABASE_KEY ?? ""
  );
  if (event.httpMethod === "OPTION") {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
    };
  }

  if (
    !event?.queryStringParameters?.lnAddress ||
    !event?.queryStringParameters?.id
  ) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        message: "Must provide a user id and lightning address",
      }),
    };
  }

  try {
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

    console.log(data);

    if (data.data.valid) {
      const supabaseRes = await supabaseClient
        .from("profiles")
        .update({ ln_address: lnAddress })
        .eq("id", id);

      console.log({ supabaseRes });

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          message: "Successfully added lightning address",
        }),
      };
    } else {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ message: "ln address is invalid" }),
      };
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ message: "Error processing ln address" }),
    };
  }
};

export { handler };
