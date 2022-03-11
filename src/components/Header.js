import logo from "assets/logo.png";
import styled from "styled-components";
import { SOCIALS } from "../constants";
import GradientBtn from "./GradientBtn";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  padding: 1rem 2rem;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Socials = styled.div`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Social = styled.button`
  outline: none;
  border: none;
  background-color: #ff008720;
  border-radius: 100%;
  height: 3rem;
  width: 3rem;
  padding: 0.86rem;
`;
const SocialImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  cursor: pointer;
  filter: invert(14%) sepia(100%) saturate(4429%) hue-rotate(320deg)
    brightness(100%) contrast(109%);
`;

const Logo = styled.img.attrs({ src: logo })`
  width: 5rem;
`;

export default () => {
  return (
    <Container>
      <Left>
        <Logo />
      </Left>
      <Right>
        <Socials>
          {SOCIALS.map((e, i) => (
            <Social
              key={`${e.title}-${i}`}
              title={`${e.title}`}
              alt={`${e.title}`}
            >
              <SocialImg
                onClick={() => window.open(e.link, "_blank").focus()}
                src={e.img}
              />
            </Social>
          ))}
        </Socials>
        <GradientBtn label="Connect Wallet" />
      </Right>
    </Container>
  );
};
