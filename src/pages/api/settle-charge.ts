import { supabase } from "../../config/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.body) {
    const { internalId, status } = req.body;
    console.log({ internalId, status });

    if (status === "expired") {
      await supabase
        .from("charges")
        .update({ expired: true })
        .eq("id", internalId);

      res.status(200).json({ message: "Succesfully expired charge" });
      return;
    }

    if (status === "completed") {
      console.log("here");
      const response = await supabase
        .from("charges")
        .update({ settled: true })
        .eq("id", internalId);

      console.log({ response });

      res.status(200).json({ message: "Succesfully updated charge" });
      return;
    }

    console.log("not status");
  }

  res.status(400).json({ message: "Error settling charge" });
};
