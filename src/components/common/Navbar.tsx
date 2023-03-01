import { useStore } from "../../store";

export const Navbar = () => {
  const { authView } = useStore();
  return (
    <div className="w-full bg-brandGreen flex justify-end p-6">
      <div
        onClick={authView.handleLogoutClick}
        className="text-white cursor-pointer"
      >
        Logout
      </div>
    </div>
  );
};
