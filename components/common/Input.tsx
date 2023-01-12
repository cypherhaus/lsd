interface InputProps {
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
  type?: string;
}

export const Input = ({ onChange, ...rest }: InputProps) => (
  <input
    onChange={(e) => onChange(e.target.value)}
    className="placeholder:text-dark200 outline-none font-white my-2 border-b-2  border-black  p-2 text-xl bg-transparent"
    {...rest}
  />
);
