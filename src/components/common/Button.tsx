interface ButtonProps {
  onClick?: () => void;
  children: string;
  type?: "button" | "submit" | "reset";
}

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className="rounded p-3 bg-black text-white text-xl font-bold"
      {...rest}
    >
      {children}
    </button>
  );
};
