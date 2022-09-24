import React, { useContext, FC, createContext } from "react";
import { Store } from "./store";

const StoreContext = createContext<Store | undefined>(undefined);

export const StoreProvider: FC<{ store: Store; children: any }> = ({
  store,
  children,
}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export const useStore = (): Store => {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error("Store used within store context is undefined");
  }
  return store;
};
