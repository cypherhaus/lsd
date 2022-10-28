import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const handler: Handler = async (event, context) => {
  const supabaseClient = createClient(
    process.env.REACT_APP_SUPABASE_URL ?? "",
    process.env.REACT_APP_SUPABASE_KEY ?? ""
  );
  if (event?.body) {
    const { internalId, status } = JSON.parse(event.body);
    // TODO: Double check with ZBD that this is actually settled and not some punter

    if (status === "expired") {
      await supabaseClient
        .from("charges")
        .update({ expired: true })
        .eq("id", internalId);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Succesfully expired charge" }),
      };
    }

    if (status === "completed") {
      await supabaseClient
        .from("charges")
        .update({ settled: true })
        .eq("id", internalId);

      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Succesfully updated charge" }),
      };
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({ message: "Error settling charge" }),
  };
};

export { handler };
