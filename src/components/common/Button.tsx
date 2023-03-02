interface ButtonProps {
  onClick?: () => void;
  children: string;
  type?: "button" | "submit" | "reset";
  variant?: string;
  icon?: JSX.Element
}

export const Button = ({ children, variant, icon, ...rest }: ButtonProps) => {

  const style = variant === 'white' 
      ? 'flex flex-row items-center gap-2 rounded font-button font-bold mt-3.5 mb-3.5 px-3 py-1 bg-white border-2 border-black text-black'
      : 'w-full items-center gap-2 uppercase rounded font-button font-bold mt-3.5 mb-3.5 px-4 py-1.5 bg-brandGreen text-white text-md'

  return (
    <button
      className={style}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
};
