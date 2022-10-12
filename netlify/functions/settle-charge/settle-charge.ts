import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const handler: Handler = async (event, context) => {
  const supabaseClient = createClient(
    process.env.REACT_APP_SUPABASE_URL ?? "",
    process.env.REACT_APP_SUPABASE_KEY ?? ""
  );

  if (event?.queryStringParameters?.id) {
    const response = await supabaseClient
      .from("charge")
      .update({ settled: true })
      .eq("id", event?.queryStringParameters?.id);

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
