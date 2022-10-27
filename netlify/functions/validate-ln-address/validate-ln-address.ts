import { Handler } from "@netlify/functions";
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

    return {
      statusCode: 200,
      body: JSON.stringify({ data }),
    };
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: "Error settling charge" }),
  };
};

export { handler };
