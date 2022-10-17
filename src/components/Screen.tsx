import { ReactNode } from "react";
import { Navigation } from "../navigation";

export const Screen = ({ children }: { children: ReactNode }) => (
  <div>
    <Navigation />
    <div className="p-5 flex flex-col items-center">{children}</div>
  </div>
);
