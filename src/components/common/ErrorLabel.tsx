import { PASSWORD_CONTAINS } from "../../constants/validationSchema";

interface Props {
  children: string;
}

const errorStyle =
  "text-primary text-sm font-normal list-inside list-disc self-start";

export const ErrorLabel = ({ children }: Props) => {
  if (children === PASSWORD_CONTAINS) {
    return (
      <ul>
        <li className={errorStyle}>8 Characters minimum</li>
        <li className={errorStyle}>At least 1 lowercase letter</li>
        <li className={errorStyle}>At least 1 uppercase letter</li>
        <li className={errorStyle}>At least 1 number</li>
      </ul>
    );
  }

  return <li className={errorStyle}>{children}</li>;
};
