import { Sidebar } from "../Sidebar";
import { Navbar } from "./Navbar";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

interface Props {
  children: JSX.Element;
}

export const Layout = observer(({ children }: Props) => {
  const { modalView } = useStore();
  const overlay =
    "fixed z-10 flex justify-center items-center bg-black w-screen h-screen opacity-50";

  return (
    <>
      {modalView.modalOpen && <div className={overlay}></div>}
      <div className="h-screen bg-brandWhite overflow-hidden flex flex-col">
        <Navbar />
        <main className="flex h-full">
          <Sidebar />
          <div className="w-full h-[92%] overflow-scroll overflow-x-hidden flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </>
  );
});
