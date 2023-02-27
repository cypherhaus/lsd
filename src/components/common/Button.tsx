interface ButtonProps {
  onClick?: () => void;
  children: string;
  type?: "button" | "submit" | "reset";
}

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className="w-full rounded mt-3 mb-3 p-2 bg-brandGreen text-white text-l font-bold"
      {...rest}
    >
      {children}
    </button>
  );
};
