import { useStore } from "../../store";

export const Navbar = () => {
  const { authView } = useStore();
  return (
    <div className="flex w-full bg-brandGreen items-center justify-between p-6">
      <div className="text-4xl text-brandOrange">DOGMO</div>
      <div
        onClick={authView.handleLogoutClick}
        className="text-lg text-white font-button cursor-pointer"
      >
        Logout
      </div>
    </div>
  );
};
