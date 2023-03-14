interface Props {
  text: string;
}

export const Tooltip = ({ text }: Props) => {
  return (
    <div className="w-full absolute top-[25%] right-[-140%]">
      <span className="truncate font-button font-bold text-md border-2 border-brandWhite rounded-md text-center bg-white px-2 py-1">
        {text}
      </span>
    </div>
  );
};
