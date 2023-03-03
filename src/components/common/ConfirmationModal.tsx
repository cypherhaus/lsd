interface ModalProps {
    children: JSX.Element;
}
  
export const ConfirmationModal = ({ children, ...rest }: ModalProps): JSX.Element => {
  
    return (
      <div
        className={"z-60 absolute md:top-[30%] lg:right-[38%] lg:left-[38%] md:right-[25%] md:left-[25%] top-[20%] right-[5%] left-[5%] bg-white rounded px-12 py-7 border-2 border-black"}
        {...rest}
      >
        {children}
      </div>
    );
};
  