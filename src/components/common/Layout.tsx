import { Sidebar } from "../Sidebar";
import { Navbar } from "./Navbar";
import { observer } from "mobx-react-lite";

interface Props {
  children: JSX.Element;
}

export const Layout = observer(({ children }: Props) => {
  return (
    <>
      <div className="h-screen bg-brandWhite overflow-hidden flex flex-col">
        <Navbar />
        <main className="flex h-full pr-8">
          <Sidebar />
          <div className="w-full h-[92%] overflow-scroll overflow-x-hidden flex flex-col items-center justify-center text-2xl">
            {children}
          </div>
        </main>
      </div>
    </>
  );
});
