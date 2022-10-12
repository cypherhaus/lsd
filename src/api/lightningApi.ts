import axios from "axios";
import { CREATE_CHARGE } from "../constants/endpoints";

export default class LightningApi {
  createCharge = async (id: string, amount: string) => {
    const url = `${process.env.REACT_APP_SUPABASE_FUNCTIONS_BASE_URL}/${CREATE_CHARGE}`;
    console.log(
      `${process.env.REACT_APP_SUPABASE_FUNCTIONS_BASE_URL}/${CREATE_CHARGE}`
    );

    try {
      const response = await axios.post(
        url,
        {
          id,
          description: "Desc",
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_SUPABASE_KEY}`,
            // "Content-Type": "application/json",
          },
        }
      );
      return response;
    } catch (err) {}
  };
}
