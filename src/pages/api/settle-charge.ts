import { supabase } from "../../config/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req?.body) {
    const { internalId, status } = JSON.parse(req.body);

    if (status === "expired") {
      await supabase
        .from("charges")
        .update({ expired: true })
        .eq("id", internalId);

      res.status(200).json({ message: "Succesfully expired charge" });
      return;
    }

    if (status === "completed") {
      await supabase
        .from("charges")
        .update({ settled: true })
        .eq("id", internalId);

      res.status(200).json({ message: "Succesfully updated charge" });
      return;
    }
  }

  res.status(400).json({ message: "Error settling charge" });
};
