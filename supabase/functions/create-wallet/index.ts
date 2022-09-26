// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// @ts-nocheck

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";

serve(async (req) => {
  const { id } = await req.json();

  const body = JSON.stringify({ user_label: id });
  const resp = await fetch("https://api.lnpay.co/v1/wallet", {
    method: "POST",
    headers: {
      "X-API-Key": Deno.env.get("SECRET"),
      "Content-Type": "application/json",
    },
    body,
  });

  const json = await resp.json();

  return new Response(JSON.stringify(json), {
    headers: { "Content-Type": "application/json" },
  });
});
