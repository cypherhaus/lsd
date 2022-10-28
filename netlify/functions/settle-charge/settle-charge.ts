import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const handler: Handler = async (event, context) => {
  const supabaseClient = createClient(
    process.env.REACT_APP_SUPABASE_URL ?? "",
    process.env.REACT_APP_SUPABASE_KEY ?? ""
  );
  if (event?.queryStringParameters?.id) {
    // TODO: Double check with ZBD that this is actually settled and not some punter

    console.log({ event });

    const response = await supabaseClient
      .from("charges")
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
