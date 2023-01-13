import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};
