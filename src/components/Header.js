import logo from "assets/logo.png";
import metamaskIcon from "assets/metamask.png";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { setAddress } from "store/global";
import { toggleNotification } from "store/notification";
import styled from "styled-components";
import { centerEllipsis } from "utils/helpers";
import { ROUTES, SOCIALS } from "../constants";
import GradientBtn from "./GradientBtn";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  padding: 1rem 2rem;
  position: fixed;
  width: 100%;
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

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const Link = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
  background-color: transparent;
  color: white;
  text-transform: uppercase;
  font-family: "Nasalization";
  font-size: 15px;
  opacity: 0.64;

  &.active {
    opacity: 0.92;
  }
`;

export default () => {
  const dispatch = useDispatch();
  const [metamaskConnected, setMetamaskConnected] = useState(
    localStorage.getItem("roseapeMetamaskConnected")
  );
  const address = useSelector((state) => state.global.address);

  const { pathname } = useLocation();

  const navigate = useNavigate();

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
      dispatch(setAddress(accounts[0]));
    }
  }, []);

  return (
    <Container>
      <Left>
        <Logo />
      </Left>
      <Links>
        {ROUTES.map(({ id, title, link }) => (
          <Link
            key={id}
            onClick={() => navigate(link)}
            className={pathname === link ? "active" : ""}
          >
            {title}
          </Link>
        ))}
      </Links>
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
          label={metamaskConnected ? centerEllipsis(address) : "Connect Wallet"}
        />
      </Right>
    </Container>
  );
};
