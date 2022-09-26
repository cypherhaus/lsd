import { CREATE_WALLET } from "../constants/endpoints";

export default class LightningApi {
  createWallet = async () => {
    console.log(process.env.REACT_APP_SUPABASE_FUNCTIONS_BASE_URL);
    console.log(CREATE_WALLET);
  };
}
