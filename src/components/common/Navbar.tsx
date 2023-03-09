import { useStore } from "../../store";
import Image from "next/image";
import Logo from "../../media/logo.svg";

export const Navbar = () => {
  const { authView } = useStore();
  return (
    <div className="flex w-full bg-brandGreen items-center justify-between p-6">
      <Image src={Logo} width="200" alt="Dogmo App logo" />
      <div
        onClick={authView.handleLogoutClick}
        className="text-lg text-white font-button cursor-pointer"
      >
        Logout
      </div>
    </div>
  );
};
