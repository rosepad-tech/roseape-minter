import { ethers } from "ethers";
import { compact, range } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { TEST_COLLECTIONS, TEST_DATA } from "test";
import { ERC721, ERC721ABI, PROVIDER } from "utils/contracts";
import { bin2String } from "utils/helpers";
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

  //  Get the collections from
  //const tokenList = "https://testnet.explorer.emerald.oasis.dev/api?module=account&action=tokenlist&address="+state.global.Address;
  const contract = new ethers.Contract(ERC721, ERC721ABI, PROVIDER);
  const address = useSelector((state) => state.global.address);

  const [collection, setCollection] = useState([]);

  useEffect(async () => {
    try {
      const totalSupply = (await contract.totalSupply()).toNumber();

      const items = await Promise.all(
        range(totalSupply).map(async (id) => {
          if (id === 0) return;

          const owner = await contract.ownerOf(id);
          if (owner === address) {
            const info = await contract.tokenInfo(id);

            return {
              id,
              uri: bin2String(info[2]),
              name: bin2String(info[1]),
              description: bin2String(info[0]),
              info: bin2String(info[3]),
            };
          }
        })
      );

      setCollection(compact(items));

      console.log(collection);
    } catch (error) {
      console.log(error);
      // throw Error(error);
    }
  }, []);

  return (
    <Container>
      <Listings>
        {(collection.length ? collection : TEST_DATA.result).map(
          (e) => e &&          
          <Card key={e.id} {...e}  />

        )}
      </Listings>
    </Container>
  );
};
