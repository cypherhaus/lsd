import { useStore } from "../../store";

export const Navbar = () => {
  const { authView } = useStore();
  return (
    <div className="w-full bg-black flex justify-end p-6">
      <div onClick={authView.logout} className="text-white cursor-pointer">
        Logout
      </div>
    </div>
  );
};
