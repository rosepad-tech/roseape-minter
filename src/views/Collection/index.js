import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ERC721, ERC721ABI, PROVIDER } from "utils/contracts";
import Card from "./Card";

const Container = styled.div`
  margin: auto;
  max-width: 1920px;
`;

const Listings = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  gap: 1rem;
`;

const BASE_URI =
  "https://testnet.explorer.emerald.oasis.dev/api?module=account&action=tokenlist&address=";

export default () => {
  const [tokenList, setTokenList] = useState([]);
  const contract = new ethers.Contract(ERC721, ERC721ABI, PROVIDER);
  const address = useSelector((state) => state.global.address);

  useEffect(async () => {
    try {
      setTokenList(
        await axios.get(`${BASE_URI}${address}`).then(({ data: { result } }) =>
          Promise.all(
            (result || []).map(async (e) => {
              if (e.type == "ERC-721" && e.symbol == "RPE")  {
                const meta = await contract.tokenURI(e.balance);
                const cid = meta.match(/(?<=ipfs:\/\/).*?(?=\/)/)[0];

                const {
                  data: { image },
                } = await axios.get(
                  meta.replace("ipfs://", "https://ipfs.io/ipfs/")
                );

                return {
                  ...e,
                  uri: meta,
                  cid,
                  src: `https://ipfs.io/ipfs/${cid}${image}`,
                };
              };
            })
          )
        )
      );
    } catch (error) {
      console.log(error);
    }
  }, [address]);

  return (
    <Container>
      <Listings>
        {((tokenList.length && tokenList) || []).map(
          (e) => e && <Card key={e.contractAddress} {...e} />
        )}
      </Listings>
    </Container>
  );
};
