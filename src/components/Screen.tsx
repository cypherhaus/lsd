import { ReactNode } from "react";

export const Screen = ({ children }: { children: ReactNode }) => (
  <div className="p-5">{children}</div>
);
