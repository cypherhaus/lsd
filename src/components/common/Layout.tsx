import { Sidebar } from "../Sidebar";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: any) => {
  return (
    <div className="h-screen bg-brandWhite flex flex-col">
      <Navbar />
      <main className="flex h-full">
        <Sidebar />
        <div className="w-full h-full flex p-2 flex-col">{children}</div>
      </main>
    </div>
  );
};
