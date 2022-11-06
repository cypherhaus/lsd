import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
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

  if (event.httpMethod === "POST") {
    try {
      const { amount, token } = JSON.parse(event.body);

      if (!amount) {
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({
            message: "Must provide an amount",
          }),
        };
      }
      const { sub } = jwt.verify(token, process.env.JWT_SECRET);

      const balanceCheck = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", sub)
        .single();

      if (!balanceCheck.data.ln_address) {
        return {
          statusCode: 404,
          headers: CORS_HEADERS,
          body: JSON.stringify({
            message: "No lightning address associated with that account",
          }),
        };
      }

      if (!balanceCheck.data) {
        return {
          statusCode: 500,
          headers: CORS_HEADERS,
          body: JSON.stringify({
            message: "Failed to get balance",
          }),
        };
      }

      const balance = balanceCheck.data.balance;

      if (balance < parseInt(amount)) {
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({
            message: "Insufficient balance",
          }),
        };
      }

      if (balance > parseInt(amount)) {
        const withdrawal = await supabaseClient.from("withdrawals").insert({
          user_id: sub,
          ln_address: balanceCheck.data.ln_address,
          amount,
        });

        if (!withdrawal.data) {
          return {
            statusCode: 500,
            headers: CORS_HEADERS,
            body: JSON.stringify({
              message: "Internal Server Error",
            }),
          };
        }

        const data = await axios.post(
          `https://api.zebedee.io/v0/ln-address/send-payment`,
          {
            lnAddress: balanceCheck.data.ln_address,
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

        if (!data.data) {
          return {
            statusCode: 500,
            headers: CORS_HEADERS,
            body: JSON.stringify({
              message: "Internal Server Error",
            }),
          };
        }

        await supabaseClient
          .from("withdrawals")
          .update({
            settled: true,
          })
          .eq("id", withdrawal.data[0].id);

        return {
          statusCode: 200,
          headers: CORS_HEADERS,
          body: JSON.stringify({
            message: "Successfully withdrawn sats",
            settlementId: withdrawal.data[0].id,
          }),
        };
      }

      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          message: "Server Error",
        }),
      };
    } catch (err) {
      console.log({ err });
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          message: "Error withdrawing to lightning addreess",
        }),
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
