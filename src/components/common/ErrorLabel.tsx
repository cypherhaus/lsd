interface Props {
    children: string
}

const errorStyle = 'text-brandOrange text-xs font-normal list-inside list-disc'

export const ErrorLabel = ({ children }: Props) => {
    if(children === 'password-contains') {
        return (
            <ul>
                <li className={errorStyle}>8 Characters minimum</li>
                <li className={errorStyle}>At least 1 lowercase letter</li>
                <li className={errorStyle}>At least 1 uppercase letter</li>
                <li className={errorStyle}>At least 1 number</li>
            </ul>
        )
    } else {
        return (
            <li className={errorStyle}>{children}</li>
          );
    }
};
