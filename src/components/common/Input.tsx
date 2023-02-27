interface InputProps {
  error: boolean;
  placeholder: string;
  onChange?: (e: any) => void;
  value?: string;
}

export const Input = ({ error, ...rest }: InputProps) => (
  <input
    className={`placeholder:text-dark200 outline-none font-white my-2 border-b-2  border-black  p-2 text-xl bg-transparent ${
      error && "border-[red]"
    }`}
    {...rest}
  />
);
