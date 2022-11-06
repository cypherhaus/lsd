import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StoreProvider } from "./store/provider";
import { SupabaseWrapper } from "./config/supabase";
import { createStore } from "./store/store";
import { Toaster } from "react-hot-toast";

const store = createStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* @ts-ignore */}
    <SupabaseWrapper>
      <StoreProvider store={store}>
        <Toaster />
        <App />
      </StoreProvider>
    </SupabaseWrapper>
  </React.StrictMode>
);
