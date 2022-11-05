import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
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

  const { token, amount } = JSON.parse(event.body);
  if (!amount) {
    return {
      statusCode: 400,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        message: "Must provide an amount",
      }),
    };
  }

  if (event.httpMethod === "POST") {
    try {
      const { sub } = jwt.verify(token, process.env.JWT_SECRET);

      const amountInMsats = (parseInt(amount) * 1000).toString();
      const chargeId = uuidv4();
      await supabaseClient.from("charges").insert({
        id: chargeId,
        amount: parseInt(amountInMsats) / 1000,
        user_id: sub,
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
  } else {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
    };
  }
};

export { handler };
