import diamond from "assets/diamond.svg";
import { ethers } from "ethers";
import styled from "styled-components";
import { ERC721, ERC721ABI, BASE_URI_TX, BASE_URI_TOKEN_TXN, RARITY_API } from "utils/contracts";
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
  @media (max-width: 100%) {
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

const LitTextArea = styled.textarea`
  background-color: black;
  -webkit-box-shadow: inset 0 0 1.4rem #ff008073;
  -moz-box-shadow: inset 0 0 1.4rem #ff008073;
  box-shadow: inset 0 0 1.4rem #ff008073;
  border-radius: 1rem;
  width: fit-content;
  height: fit-content;
  padding: 1.5rem 2.7rem;
  margin: 2rem 0;
  color: #fff;
  font-size: 36px;
  font-weight: 500;
`;

const LitInput = styled.input`
  background-color: black;
  -webkit-box-shadow: inset 0 0 1.4rem #ff008073;
  -moz-box-shadow: inset 0 0 1.4rem #ff008073;
  box-shadow: inset 0 0 1.4rem #ff008073;
  border-radius: 1rem;
  width: fit-content;
  height: fit-content;
  padding: 1.5rem 2.7rem;
  margin: 2rem 0;
  color: white;
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
  const baseUri = "https://ipfs.io/ipfs/QmTymciMsxGjGbG24oVigctR87oDFfZugwKutpP3p5HSGc/";
  const [tokenId, setTokenId] = useState(0);
  const [metadata, setMetadata] = useState("");
  const [traitRarityScore, setTraitRarityScore] = useState("");
  const [image, setImage] = useState("https://ipfs.io/ipfs/QmTymciMsxGjGbG24oVigctR87oDFfZugwKutpP3p5HSGc/0.png");
  //{"metadata":{"name":"ROSEAPE#1400","description":"Brutally enhance RoseApe variant - 1400","image":"/1400.png","attributes":[{"trait_type":"0background","value":"rose_network"},{"trait_type":"1baseape","value":"Orangutan_Botanist"},{"trait_type":"2baseclothes","value":"tron"},{"trait_type":"3earrings","value":"gold_ear"},{"trait_type":"4eyes","value":"tank"},{"trait_type":"5headwear","value":"golden_hat"},{"trait_type":"6mouth","value":"playful"},{"trait_type":"7roses","value":"trans"},{"trait_type":"8necklace","value":"snake"},{"trait_type":"9crypto","value":"protocollabs"}]},"tokenId":"1400","totalSupply":"1400","traitRarityScores":{"background":9.271523178807946,"baseape":5.737704918032787,"baseclothes":9.655172413793103,"earrings":9.929078014184396,"eyes":9.58904109589041,"headwear":10.526315789473685,"mouth":10.144927536231885,"roses":9.333333333333334,"necklace":10.071942446043165,"crypto":8.974358974358974},"totalRarityScore":93.23339770014968}

  const calculateRarity = async () => {

    await axios.get(`${RARITY_API}${tokenId}`)
      .then(res => {
        console.log(res.data);
        setTokenId(res.data.tokenId);
        setMetadata(res.data);
        setTraitRarityScore(res.data.traitRarityScores);
        setImage(baseUri + "/" + res.data.tokenId + ".png");
      })
      .catch(err => {
        setMetadata("No Data");
        console.log(err);
      })

    console.log("calculateRarity");
    console.log(metadata);
  };
  return (
    <Container>
      <Head>
        <Title>RoseApes721 - Rarity Calculator</Title>
      </Head>
      <LitContainer style={{ float: 'left', width: '45%' }}>
        <Span>
          <LitInput style={{ width: '100%', fontSize: '20px', marginTop: '20px' }} type="text" placeholder="Enter TokenID" onChange={(e) => setTokenId(e.target.value)} />
        </Span>
        <Options>
          <GradientMintBtn label={"Calculate Rarity!"} onClick={calculateRarity}></GradientMintBtn>
        </Options>
        <Span>

          <Span><Title>Score Range Legend:</Title></Span>
          <table>
            <tbody>
              <tr>
                <td>
                  <Span><GradText>{'105.00+'}</GradText></Span>
                </td>
                <td>
                  <Span><GradText>Legendary</GradText></Span>
                </td>
              </tr>
              <tr>
                <td>
                  <Span><GradText>{'104 - 105'}</GradText></Span>
                </td>
                <td>
                  <Span><GradText>Epic</GradText></Span>
                </td>
              </tr>
              <tr>
                <td>
                  <Span><GradText>{'<104 to 100'}</GradText></Span>
                </td>
                <td>
                  <Span><GradText>Rare</GradText></Span>
                </td>
              </tr>
              <tr>
                <td>
                  <Span><GradText>{'<100 to 68'}</GradText></Span>
                </td>
                <td>
                  <Span><GradText>Uncommon</GradText></Span>
                </td>
              </tr>
              <tr>
                <td>
                  <Span><GradText>{'<68'}</GradText></Span>
                </td>
                <td>
                  <Span><GradText>Common</GradText></Span>
                </td>
              </tr>
            </tbody>
          </table>
        </Span>
      </LitContainer>
      {/* To provide a guideline for the community. Here are the score range that will indicate the rarity of your NFT

105.00 + - Legendary
104 - 105 - Epic
<104 to 100 - Rare
<100 to 68 - Uncommon
<68 - Common */}
      <LitContainer style={{ float: 'right', width: '45%' }}>
        <Span>
          <img src={image} alt="RoseApe" style={{ paddingTop: '10px', width: '250px', height: '250px' }} />
        </Span>
        <Span>
          <Span><Title>Rarity Score: {metadata.totalRarityScore}</Title></Span>
          <Span><Sub>Background: {traitRarityScore.background}</Sub></Span>
          <Span><Sub>Base Ape: {traitRarityScore.baseape}</Sub></Span>
          <Span><Sub>Clothes: {traitRarityScore.baseclothes}</Sub></Span>
          <Span><Sub>Earrings: {traitRarityScore.earrings}</Sub></Span>
          <Span><Sub>Eyes: {traitRarityScore.eyes}</Sub></Span>
          <Span><Sub>Headwear: {traitRarityScore.headwear}</Sub></Span>
          <Span><Sub>Mouth: {traitRarityScore.mouth}</Sub></Span>
          <Span><Sub>Roses: {traitRarityScore.roses}</Sub></Span>
          <Span><Sub>Necklace:{traitRarityScore.necklace}</Sub></Span>
          <Span><Sub>Crypto: {traitRarityScore.crypto}</Sub></Span>
        </Span>

        {/* <Span><Sub>API: <a href="https://rarity-api.roseape.io/">https://rarity-api.roseape.io/</a></Sub></Span>
        <Span><Sub>Get TokenID Traits: <a href="https://rarity-api.roseape.io/traits/:tokenId">https://rarity-api.roseape.io/traits/:tokenId</a></Sub></Span>
        <Span><Sub>Get TokenID Traits w MD: <a href="https://rarity-api.roseape.io/metadata-traits/:tokenId">https://rarity-api.roseape.io/metadata-traits/:tokenId</a></Sub></Span>
        <Span><Sub>Get Traits Guidlines: <a href="https://rarity-api.roseape.io/traits-guideline">https://rarity-api.roseape.io/traits-guideline</a></Sub></Span> */}
      </LitContainer>

    </Container>
  );
};
