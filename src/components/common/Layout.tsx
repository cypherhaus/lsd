import { Sidebar } from "../Sidebar";
import { Navbar } from "./Navbar";

export const Layout = ({ children }: any) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex h-full">
        <Sidebar />
        <div className="w-full h-full flex justify-center p-12">{children}</div>
      </main>
    </div>
  );
};
