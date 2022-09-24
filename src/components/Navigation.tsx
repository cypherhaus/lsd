import styled from "styled-components";

const Wrapper = styled.div`
  float: right;
`;

const Link = styled.a`
  font-size: 18px;
  margin: 0px 15px;
  text-decoration: none;
  margin-bottom: 2rem;
  color: black;
  cursor: pointer;
  font-weight: bold;
`;

export const Navigation = () => {
  return (
    <Wrapper>
      <Link href="/">HOME</Link>
      <Link href="/wallet">WALLET</Link>
      <Link>LOGOUT</Link>
    </Wrapper>
  );
};
