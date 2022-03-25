import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ERC721, ERC721ABI, PROVIDER, BASE_URI_TOKEN_LIST, BASE_URI_TOKEN_TXN} from "utils/contracts";
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

export default () => {
  const [tokenList, setTokenList] = useState([]);
  const contract = new ethers.Contract(ERC721, ERC721ABI, PROVIDER);
  const address = useSelector((state) => state.global.address);

  useEffect(async () => {
    try {
      setTokenList(
        await axios.get(`${BASE_URI_TOKEN_TXN}${address}`).then(({ data:{result}}) => 
          Promise.all(
            (result || []).map(async (e) => {
              if (e.tokenName == "RoseApe" && e.tokenSymbol == "RPE" && e.contractAddress.toLowerCase() == `${ERC721}`.toLowerCase())  {
                const meta = await contract.tokenURI(e.tokenID);
                const cid = meta.match(/(?<=ipfs:\/\/).*?(?=\/)/)[0];
                const {
                  data: { 
                    description,
                    name,
                    image 
                  },
                } = await axios.get(
                  meta.replace("ipfs://", "https://ipfs.io/ipfs/")
                );
                return {
                  ...e,
                  uri: meta,
                  cid,
                  src: `https://ipfs.io/ipfs/${cid}${image}`,
                  blockHash: e.blockHash,
                  transactionHash: e.hash,
                  symbol: e.tokenSymbol,
                  type: "ERC-721",
                  name: name,
                  description: description,
                  tokenId: e.tokenID,
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
