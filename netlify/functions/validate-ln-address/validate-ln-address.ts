import { Handler } from "@netlify/functions";
import axios from "axios";

const CORS_HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTION",
};

const handler: Handler = async (event, context) => {
  if (event.httpMethod === "OPTION") {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: "This was a preflight call!",
    };
  }

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

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify(data.data),
    };
  }

  return {
    statusCode: 400,
    headers: CORS_HEADERS,
    body: JSON.stringify({ message: "Error settling charge" }),
  };
};

export { handler };
