interface Props {
  text: string;
}

export const Tooltip = ({ text }: Props) => {
  return (
    <div className="w-full top-[25%] right-[-140%] transition-opacity opacity-0 peer-hover:opacity-100 cursor-default absolute">
      <span className="font-button font-bold text-md bg-black text-white py-1 px-2 whitespace-nowrap">
        {text}
      </span>
    </div>
  );
};
