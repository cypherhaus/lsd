import axios from "axios";
import { CREATE_CHARGE, SETTLE_CHARGE } from "../constants/endpoints";
import { supabase } from "../config/supabase";
export default class LightningApi {
  createCharge = async (amount: string) => {
    const url = `${process.env.REACT_APP_SUPABASE_FUNCTIONS_BASE_URL}/${CREATE_CHARGE}`;

    let chargeId = "";
    try {
      const { data } = await supabase.from("charge").insert({ amount });
      if (data) {
        chargeId = data[0].id;
      }
    } catch (err) {
      console.log({ err });
      return;
    }

    if (chargeId) {
      try {
        const response = await axios.post(
          url,
          {
            id: chargeId,
            description: "Desc",
            amount,
            callback: `${process.env.REACT_APP_SUPABASE_FUNCTIONS_BASE_URL}/${SETTLE_CHARGE}?id=${chargeId}`,
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
            },
          }
        );
        return response;
      } catch (err) {}
    }
  };
}
