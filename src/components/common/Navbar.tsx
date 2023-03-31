import { useStore } from "../../store";

export const Navbar = () => {
  const { authView } = useStore();
  return (
    <div className="text-white flex w-full bg-brandGreen items-center justify-between p-6">
      create-dash-app
      <div
        onClick={authView.handleLogoutClick}
        className="text-lg text-white font-button cursor-pointer"
      >
        Logout
      </div>
    </div>
  );
};
