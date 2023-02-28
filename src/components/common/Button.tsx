interface ButtonProps {
  onClick?: () => void;
  children: string;
  type?: "button" | "submit" | "reset";
}

export const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className="w-full uppercase rounded font-button mt-3.5 p-1.5 bg-brandGreen text-white text-lg font-bold"
      {...rest}
    >
      {children}
    </button>
  );
};
