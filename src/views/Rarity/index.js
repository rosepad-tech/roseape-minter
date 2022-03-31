import diamond from "assets/diamond.svg";
import { ethers } from "ethers";
import styled from "styled-components";
import { ERC721, ERC721ABI, BASE_URI_TX, BASE_URI_TOKEN_TXN } from "utils/contracts";
import GradientBtn from "../../components/GradientBtn";
import GradientMintBtn from "../../components/GradientMintBtn";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { TripleMaze } from 'react-spinner-animated';
import { toggleNotification } from "store/notification";
import useSound from 'use-sound';
import mintSound from 'assets/button-3.mp3';
import { QuantityPicker } from 'react-qty-picker';
import axios from "axios";
import { checkWhiteList } from "utils/helpers";


import 'assets/spinner/index.css'

const Container = styled.div`
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const Title = styled.h2`
  color: #ff0087;
  margin: 0.5rem 0;
`;
const Sub = styled.h4`
  color: #ffffff;
  margin: 0.5rem 0;
`;

const Value = styled.h1`
  color: #ffffff;
  font-size: 56px;
  margin: 0.125rem -0;
`;
const Label = styled.h4`
  color: #ff0087;
`;

const Options = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const Head = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-direction: column;
  margin: 1rem 0;
  margin-bottom: 2rem;

  @media (max-width: 1024px) {
    align-items: center;
  }
`;

const Span = styled.div`
  display: flex;
  gap: 0.25rem;
  flex-direction: column;
`;

const Div = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

const Score = styled.h2`
  color: #ffffff;
  margin: 0.125rem 0;
  font-family: "Jakarta Sans";
  font-weight: 600;
  transform: translate(0, -0.75rem);
`;

const Diamond = styled.img.attrs({ src: diamond })`
  width: 3rem;
  filter: invert(14%) sepia(100%) saturate(4429%) hue-rotate(320deg)
    brightness(100%) contrast(109%);
  padding: 0 0.5rem;
`;

const LitContainer = styled.div`
  background-color: black;
  -webkit-box-shadow: inset 0 0 1.4rem #ff008073;
  -moz-box-shadow: inset 0 0 1.4rem #ff008073;
  box-shadow: inset 0 0 1.4rem #ff008073;
  border-radius: 1rem;
  width: fit-content;
  height: fit-content;
  padding: 1.5rem 2.7rem;
  margin: 2rem 0;
`;

const Price = styled.h2`
  color: #fff;
  font-size: 36px;
  font-weight: 500;
  margin: 0.125rem 0;
`;
const Small = styled.h5`
  color: #fff;
  opacity: 0.5;
  font-size: 16px;
  margin: 0.125rem 0;
`;

const GradText = styled.span`
  background: -webkit-linear-gradient(
    90deg,
    rgba(255, 189, 12, 1) 0%,
    rgba(232, 13, 214, 1) 120%,
    rgba(255, 0, 183, 1) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;


export default () => {

  const [tokenId, setTokenId] = useState(0);

  const calculateRarity = async () => {

    // setLoading(true);
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();
    // const contract = new ethers.Contract(ERC721, ERC721ABI, signer);
    // //const address = await signer.getAddress();
    // //const isUserWhitelisted = await contract.isUserWhitelisted(address);
    // //const isUserWhitelistedFromIpfs = await checkWhiteList(address);

    // //   if (isUserWhitelisted || isUserWhitelistedFromIpfs) {
    // //      value = whiteListPrice * quantity;
    // //    } else {
    // value = publicPrice * quantity;
    // //}

    // let tx = await contract["mint(uint256)"](quantity, { value: ethers.utils.parseEther(value.toString()) });
  };
  return (
    <Container>
      <Head>
        <Title>RoseApes721 - Rarity Calculator</Title>
      </Head>
      <Span>
        <Value>
          <GradText>Coming Soon!</GradText>
        </Value>
      </Span>

      <LitContainer>
        <Span>
          <input style={{ width: '500px', fontSize: '20px' }} type="text" disabled="true" placeholder="Enter TokenID" onChange={(e) => setTokenId(e.target.value)} />
        </Span>
      </LitContainer>
      <Options>
        <GradientMintBtn label={"Calculate Rarity - Coming Soon!"} onClick={calculateRarity}></GradientMintBtn>
      </Options>
      {/* 
      <LitContainer>
        <table>
          <thead>
            <tr>
              <th>Traits</th>
              <th>Rarity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </LitContainer> */}

    </Container>
  );
};
