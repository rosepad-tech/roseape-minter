import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toggleNotification } from "store/notification";

export default () => {
  const [provider, setProvider] = useState(null);
  const dispatch = useDispatch();

  useEffect(async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const network = await provider.getNetwork();

      if (network.chainId !== 97) {
        dispatch(
          toggleNotification({
            message: "Wrong Network Detected.",
            description: "Please connect to Binance Test Smart Chain",
          })
        );
        setProvider(null);
        return;
      } else {
        setProvider(provider);
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

    return () => setProvider(null);
  }, []);

  return provider;
};
