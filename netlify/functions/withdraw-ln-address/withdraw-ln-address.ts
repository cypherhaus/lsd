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
    !event?.queryStringParameters?.amount ||
    !event?.queryStringParameters?.userId
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
    const { amount, userId } = event?.queryStringParameters;

    const balanceCheck = await supabaseClient
      .from("profiles")
      .select()
      .eq("id", userId);

    if (!balanceCheck.data) {
      return {
        statusCode: 500,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          message: "Failed to get balance",
        }),
      };
    }

    const balance = balanceCheck.data[0].balance;

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
      const lnAddress = balance.ln_address;

      const settlement = await supabaseClient.from("settlements").insert({
        type: "WITHDRAW",
        user_id: userId,
        debit: amount,
      });

      if (!settlement.data) {
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
        .from("settlements")
        .update({
          is_complete: true,
        })
        .eq("id", settlement.data[0].id);

      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          message: "Successfully withdrawn sats",
          settlementId: settlement.data[0].id,
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
