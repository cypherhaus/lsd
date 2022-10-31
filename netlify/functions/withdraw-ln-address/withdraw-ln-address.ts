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
    };
  }

  if (
    !event?.queryStringParameters?.lnAddress ||
    !event?.queryStringParameters?.amount
  ) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        message: "Must provide a lightning address and amount",
      }),
    };
  }

  try {
    const { lnAddress, amount } = event?.queryStringParameters;

    const data = await axios.post(
      `https://api.zebedee.io/v0/ln-address/send-payment`,
      {
        lnAddress,
        amount: parseInt(amount) * 1000,
        comment: "Withdraw from Supa ZBD",
      },
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
      headers: CORS_HEADERS,
      body: JSON.stringify({
        message: "Successfully withdrawn to lightning address",
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        message: "Error withdrawing to lightning addreess",
      }),
    };
  }
};

export { handler };
