import { ReactNode } from "react";

export const Page = ({ children }: { children: ReactNode }) => (
  <div className="flex">{children}</div>
);
