interface InputProps {
  onChange: (value: string) => void;
  value: string;
  placeholder: string;
  type?: string;
}

export const Input = ({ onChange, ...rest }: InputProps) => (
  <input
    onChange={(e) => onChange(e.target.value)}
    className="border my-2 border-2 border-black text-dark400 p-2 text-xl"
    {...rest}
  />
);
