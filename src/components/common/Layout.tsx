import { Sidebar } from "../Sidebar";
import { Navbar } from "./Navbar";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

export const Layout = observer(({ children }: any) => {

  const { modalView } = useStore();
  const overlay = 'fixed z-10 flex justify-center items-center bg-black duration-700 w-screen h-screen opacity-50'

  return (
    <>
    {modalView.modalOpen && <div className={overlay}></div>}
    <div className="h-screen bg-brandWhite flex flex-col">
      <Navbar />
      <main className="flex h-full">
        <Sidebar />
        <div className="w-full h-full flex p-2 flex-col">{children}</div>
      </main>
    </div>
    </>
  );
});
