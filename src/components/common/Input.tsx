interface InputProps {
  error: boolean;
  placeholder: string;
  onChange?: (e: any) => void;
  value?: string;
}

export const Input = ({ error, ...rest }: InputProps) => (
  <input
    className={`placeholder:text-dark200 outline-none font-white border-2 rounded border-black my-1.5 px-3 py-1 text-xl bg-transparent ${
      error && "border-brandOrange"
    }`}
    {...rest}
  />
);
