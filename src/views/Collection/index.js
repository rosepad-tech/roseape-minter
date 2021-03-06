import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  BASE_URI_TOKEN_TXN,
  ERC721,
  ERC721ABI,
  PROVIDER,
} from "utils/contracts";
import Card from "./Card";
import loaderGif from 'assets/kingape.png';

const Container = styled.div`
  margin: auto;
  max-width: 1920px;
`;
const Symbol = styled.p`
  margin: 0.125rem 0;
  color: #ff0087;
  background-color: #ff008729;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;
const Listings = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(auto-fill, minmax(min(200px, 100%), 1fr));
  gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: 100%;
    padding: 0 1rem;
  }
`;

export default () => {
  const [tokenList, setTokenList] = useState([]);
  const contract = new ethers.Contract(ERC721, ERC721ABI, PROVIDER);
  const address = useSelector((state) => state.global.address);
  const [loader, setLoader] = useState(loaderGif);
  const [loaderMessage, setLoaderMessage] = useState('');
  console.log(address);
  useEffect(async () => {
    
    try {
      
      setTokenList(
        await axios
          .get(`${BASE_URI_TOKEN_TXN}${address}`)
          .then(({ data: { result } }) =>
            Promise.all(
              (result || []).map(async (e) => {
                setLoaderMessage("Loading RoseApe Tokens");
                if (
                  e.tokenName == "RoseApe" &&
                  e.tokenSymbol == "RPE" &&
                  e.contractAddress.toLowerCase() == `${ERC721}`.toLowerCase()
                ) {
                  console.log(">>>" + e.hash);
                  const meta = await contract.tokenURI(e.tokenID);
                  const cid = meta.match(/(?<=ipfs:\/\/).*?(?=\/)/)[0];
                  const {
                    data: { description, name, image },
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
                }
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
      {tokenList.length === 0 ? 
        <div>
          <center>
            <img src={loader} width="200" height="200" alt="loader" />
            <Symbol>{loaderMessage}</Symbol>
          </center>
        </div>
        :
        <Listings>
          {((tokenList.length && tokenList) || []).map(
            (e) => e && <Card key={e.contractAddress} {...e} />
          )}
        </Listings>
      }
      
    </Container>
  );
};
