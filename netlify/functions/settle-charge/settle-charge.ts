import { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const handler: Handler = async (event, context) => {
  const supabaseClient = createClient(
    process.env.REACT_APP_SUPABASE_URL ?? "",
    process.env.REACT_APP_SUPABASE_KEY ?? ""
  );
  console.log({ context, event, supabaseClient });

  // await supabaseClient.from("charge").update({ settled: true }).eq("id", "1");

  const data = { message: "Hello World" };

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};

export { handler };
