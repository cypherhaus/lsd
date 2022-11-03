import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import queryString from "query-string";
import jwt from "jsonwebtoken";

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
    !event?.queryStringParameters?.amount ||
    !event?.queryStringParameters?.id
  ) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        message: "Must provide a user id, lightning address and token",
      }),
    };
  }

  if (event.httpMethod === "POST") {
    const { token } = JSON.parse(event.body);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log({ decoded });

    const { amount, id } = event?.queryStringParameters;

    try {
      const amountInMsats = (parseInt(amount) * 1000).toString();
      const chargeId = uuidv4();

      await supabaseClient.from("charges").insert({
        id: chargeId,
        amount: parseInt(amountInMsats) / 1000,
        user_id: id,
      });

      const data = await axios.post(
        "https://api.zebedee.io/v0/charges",
        {
          expiresIn: 600,
          amount: amountInMsats,
          description: "-",
          internalId: chargeId,
          callbackUrl: `${process.env.REACT_APP_SERVERLESS_BASE_URL}/settle-charge?id=${chargeId}`,
        },
        {
          headers: {
            apikey: process.env.REACT_APP_ZEBEDEE_KEY ?? "",
            "Content-Type": "application/json",
          },
        }
      );

      return {
        statusCode: 201,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          message: "Successfully created charge",
          ...data.data,
        }),
      };
    } catch (err) {
      console.log({ err });
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({ message: "Error creating charge" }),
      };
    }
  }
  return {
    statusCode: 500,
    headers: CORS_HEADERS,
    body: JSON.stringify({ message: "Error creating charge" }),
  };
};

export { handler };
