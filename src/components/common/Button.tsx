import { BUTTON_VARIANT } from "../../constants/buttons";

interface ButtonProps {
  onClick?: () => void;
  children: string;
  type?: "button" | "submit" | "reset";
  variant?: string;
  icon?: JSX.Element;
}

export const Button = ({ children, variant, icon, ...rest }: ButtonProps) => {
  const Style = (): string => {
    let style =
      "inline-block flex flex-col items-center gap-2 uppercase rounded font-button font-bold px-4 py-1.5 bg-brandGreen text-white text-md";
    variant === BUTTON_VARIANT.WHITE &&
      (style =
        "inline-block flex flex-col items-center gap-2 rounded font-button font-bold px-3 py-1 bg-white border-2 border-black text-black");
    variant === BUTTON_VARIANT.TRANSPARENT &&
      (style = "font-button font-bold cursor-pointer mt-3");
    return style;
  };

  return (
    <button className={Style()} {...rest}>
      <div className="flex gap-3 flex-row items-center">
        {icon}
        {children}
      </div>
    </button>
  );
};
