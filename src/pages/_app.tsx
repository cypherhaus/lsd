import "../styles/globals.css";
import type { AppProps } from "next/app";
import { StoreProvider } from "../store/provider";
import { createStore } from "../store/store";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "../config/supabase";
import { Toaster } from "react-hot-toast";

const store = createStore();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <StoreProvider store={store}>
          <Toaster />
          <Component {...pageProps} />
        </StoreProvider>
      </SessionContextProvider>
    </>
  );
}
