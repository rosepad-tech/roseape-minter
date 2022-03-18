import Footer from "components/Footer";
import Header from "components/Header";
import Main from "components/Main";
import Notification from "components/Notification";
import { useDispatch } from "react-redux";
import { toggleNotification } from "store/notification";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: auto;
  padding: 1rem;
  background: radial-gradient(circle at center, #ff00731a, transparent 40%),
    radial-gradient(circle at top left, #ff007140, transparent 12%),
    radial-gradient(circle at top right, #ff007140, transparent 15%),
    radial-gradient(circle at bottom right, #ff007140, transparent 30%),
    radial-gradient(circle at bottom left, #ff007140, transparent 25%),
    linear-gradient(96deg, #11010a 0%, #3535353b 100%);

  &::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #72174b80;
    border-radius: 5rem;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ff008780;
  }
`;

export default () => {
  const dispatch = useDispatch();

  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (_) => {
      dispatch(
        toggleNotification({
          message:
            "Account Change Detected In Metamask. Please re-connect your wallet.",
        })
      );
    });

    window.ethereum.on("accountsChanged", (_) => {
      dispatch(
        toggleNotification({
          message:
            "Network Change Detected In Metamask. Please ensure you are connected to BSC Testnet.",
        })
      );
    });
  }

  return (
    <Container>
      <Notification />
      <Header />
      <Main />
      <Footer />
    </Container>
  );
};
