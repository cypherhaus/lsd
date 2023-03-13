import { ThreeDots } from "react-loader-spinner";

export const Loading = () => {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#ED5520"
      ariaLabel="three-dots-loading"
      wrapperStyle={{
        display: "flex",
        alignSelf: "center",
        marginTop: "10%",
      }}
      wrapperClass=""
      visible={true}
    />
  );
};
