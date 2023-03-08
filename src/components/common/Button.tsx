interface ButtonProps {
  onClick?: () => void;
  children: string;
  type?: "button" | "submit" | "reset";
  variant?: string;
  icon?: JSX.Element;
}

export const Button = ({ children, variant, icon, ...rest }: ButtonProps) => {
  const style =
    variant === "white"
      ? "inline-block flex flex-col items-center gap-2 rounded font-button font-bold px-3 py-1 bg-white border-2 border-black text-black"
      : "inline-block flex flex-col items-center gap-2 uppercase rounded font-button font-bold px-4 py-1.5 bg-brandGreen text-white text-md";

  return (
    <button className={style} {...rest}>
      <div className="flex gap-3 flex-row items-center">
        {icon}
        {children}
      </div>
    </button>
  );
};
