import { useStore } from "../../store";

export const Navbar = () => {
  const { authView } = useStore();
  return (
    <div className="w-full bg-white flex justify-end p-6">
      <div onClick={authView.logout} className="text-black">
        Logout
      </div>
    </div>
  );
};
