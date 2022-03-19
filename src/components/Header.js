import logo from "assets/logo.png";
import metamaskIcon from "assets/metamask.png";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleNotification } from "store/notification";
import styled from "styled-components";
import { centerEllipsis } from "utils/helpers";
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
  const dispatch = useDispatch();
  const [metamaskConnected, setMetamaskConnected] = useState(
    localStorage.getItem("roseapeMetamaskConnected")
  );
  const [account, setAccount] = useState("");

  const connectMetamask = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== 42261) {
        dispatch(
          toggleNotification({
            message: "Wrong Network Detected.",
            description: "Please connect to Binance Test Smart Chain",
          })
        );

        return;
      } else {
        setMetamaskConnected(true);
        localStorage.setItem("roseapeMetamaskConnected", true);
      }
    } else {
      dispatch(
        toggleNotification({
          message: "No Metamask Found!",
          description:
            "For using this application, you need to install metamask in your browser.",
        })
      );
    }
  };

  useEffect(async () => {
    if (localStorage.getItem("roseapeMetamaskConnected")) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();
      setAccount(accounts[0]);
    }
  }, []);

  return (
    <Container>
      <Left>
        <Logo />
      </Left>
      <Right>
        {/* <Socials>
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
        </Socials> */}
        <GradientBtn
          icon={metamaskIcon}
          onClick={connectMetamask}
          label={metamaskConnected ? centerEllipsis(account) : "Connect Wallet"}
        />
      </Right>
    </Container>
  );
};
