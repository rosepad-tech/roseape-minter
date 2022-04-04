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

  const [loading, setLoading] = useState(false);
  const [showHash, setShowHash] = useState(false);
  const [loadingText, setLoadingText] = useState("Mint");
  const [quantity, setQuantity] = useState(1);
  const [hash, setHash] = useState("");
  const [price, setPrice] = useState(150);
  const [totalPrice, setTotalPrice] = useState(150);
  const [textStatus, setTextStatus] = useState("");
  const [whitelistEventOnly, setWhitelistEventOnly] = useState(false);
  const whiteListPrice = 100;
  const publicPrice = 150; // hide for now. set to 150 later.
  let whitelistOwnerLimit = 3;
  let publicOwnerLimit = 15;
  let wlParticipantMessage = "";
  let value = 0;


  useEffect(async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ERC721, ERC721ABI, signer);

    try {
      const address = await signer.getAddress()
      //const numberOfRpe = await contract.getNumberOfTokens(address);
      //const isUserWhitelisted = await contract.isUserWhitelisted(address);
      //const isUserWhitelistedFromIpfs = await checkWhiteList(address);

      //if (isUserWhitelisted || isUserWhitelistedFromIpfs) {
        //wlParticipantMessage = "You are whitelisted";
        //whitelistOwnerLimit = await contract._whitelistOwnershipLimit();
        //setTotalPrice(whiteListPrice * quantity);
        //setWhitelistEventOnly(true);
      //} else {
        setPrice(publicPrice);
        publicOwnerLimit = await contract._publicOwnershipLimit();
        setTotalPrice(publicPrice * quantity);
      //}
    } catch (error) {
      console.log(error);
    }

  }, []);


  const setQuantityVsPrice = async (quantity) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ERC721, ERC721ABI, signer);

    try {
      const address = await signer.getAddress()
      //const numberOfRpe = await contract.getNumberOfTokens(address);
      //const isUserWhitelisted = await contract.isUserWhitelisted(address);
      //const isUserWhitelistedFromIpfs = await checkWhiteList(address);

      //if (isUserWhitelisted || isUserWhitelistedFromIpfs) {
        //value = whiteListPrice * quantity;
        //setPrice(whiteListPrice);
      //} else {
      value = publicPrice * quantity;
      setPrice(publicPrice);
      //}
      setTotalPrice(value);
      setQuantity(quantity);
    } catch (error) {
      console.log(error);
    }
  }

  const timeout = async (delay) => {
    return new Promise(res => setTimeout(res, delay));
  }

  const Mint = async () => {

    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ERC721, ERC721ABI, signer);
    //const address = await signer.getAddress();
    //const isUserWhitelisted = await contract.isUserWhitelisted(address);
    //const isUserWhitelistedFromIpfs = await checkWhiteList(address);

 //   if (isUserWhitelisted || isUserWhitelistedFromIpfs) {
//      value = whiteListPrice * quantity;
//    } else {
    value = publicPrice * quantity;
    //}

    let tx = await contract["mint(uint256)"](quantity, { value: ethers.utils.parseEther(value.toString()) })
      .then(tx => {
        setLoadingText("Minting...");
        tx.wait().then(receipt => {
          setLoadingText("Minted ");
          setHash(receipt.transactionHash);
          setLoading(false);
          setShowHash(true);
        }).catch(err => {
          console.log(err);
          setLoadingText("Mint");
          setLoading(false);
          setShowHash(false);
        });
      }).catch(error => {
        setLoadingText("Mint");
        setLoading(false);
      });
  };

  if (false) {
    return (
      <Container>
        <Head>
          <Title>RoseApes721</Title>
        </Head>
        <Span>
          <Value>
            <Sub>Minting day is coming!</Sub>
          <GradText>03/30/2022 - 1PM UTC</GradText>
          </Value>
        </Span>
      </Container>
    )
  }

  if (whitelistEventOnly) {
    return (
      <Container>
        <Span>
          <Value>
            <GradText>Whitelist sale is on-going! Connect your whitelisted wallet to participate!</GradText>

            <Small>*Refresh page after connecting your whitelisted wallet!</Small>
          </Value>
        </Span>
      </Container>
    )
  } else {
    return (
      <Container>
       
        <Span>
          <Value>
            <GradText>Rose#Ape</GradText>
            <br/>
            <GradText>Public Sale has ended!</GradText>
          </Value>
        </Span>
         
        <Head>
          <Title>+ The rest of the Blind-box reveal will be revealed soon!</Title>
          <Title>+ Rarity calculator will be available soon!</Title>
          <Title>+ Congratulations to all RoseApe owners!</Title>
        </Head>
        <LitContainer>
        <Value>
        <p style={{fontSize: '20px'}}><a href="https://explorer.emerald.oasis.dev/token/0x784dbb7B1028507348A65dD14DE49223D09a73d0/token-transfers">RoseApe NFT Contract</a></p>
        <p style={{fontSize: '20px'}}>Learn more about <a href="https://rosepad.gitbook.io/rosepad/">RosePad!</a></p>
        
        </Value>
      </LitContainer>

        {/* <LitContainer>
          <Span style={{ gap: "0.125rem" }}>
            <Label style={{ margin: "0" }}>Price / RoseApe NFT</Label>
            <Div>
              <Price>{price}</Price>
              <Small>ROSE / NFT</Small>
            </Div>
          </Span>
          <Span style={{ gap: "0.125rem", paddingTop: '10px' }}>
            <Label style={{ margin: "0" }}>Total Price</Label>
            <Div>
              <Price>{totalPrice}</Price>
              <Small>Total </Small>
            </Div>
          </Span>
        </LitContainer>
        <Small>How Many? (Please note we only allow max of 15 RoseApe per account for the Public sale)</Small>
        <Span>{textStatus}</Span>
        <Options>
          <GradientMintBtn stroked={true} label={1} onClick={(value) => { setQuantityVsPrice(1); setLoadingText("Mint"); setShowHash(false); }} > </GradientMintBtn>
          <GradientMintBtn stroked={true} label={2} onClick={(value) => { setQuantityVsPrice(2); setLoadingText("Mint"); setShowHash(false); }} > </GradientMintBtn>
          <GradientMintBtn stroked={true} label={3} onClick={(value) => { setQuantityVsPrice(3); setLoadingText("Mint"); setShowHash(false); }} > </GradientMintBtn>
          <GradientMintBtn stroked={true} label={5} onClick={(value) => { setQuantityVsPrice(5); setLoadingText("Mint"); setShowHash(false); }} > </GradientMintBtn>
        <GradientMintBtn stroked={true} label={15} onClick={(value) => { setQuantityVsPrice(15); setLoadingText("Mint"); setShowHash(false); }} > </GradientMintBtn>
        </Options>
        <Small>Ready?</Small>

        <Options>
          {loading ?
            <GradientMintBtn label={loadingText + " " + quantity + " RoseApe(s)"}></GradientMintBtn>
            :
            <GradientMintBtn label={loadingText + " " + quantity + " RoseApe(s)"} onClick={Mint}></GradientMintBtn>
          }
        </Options>

        <Options>
          {showHash ?
            <GradientBtn
              label="View your NFT Transaction"
              stroked={true}
              onClick={(event) => (window.open(BASE_URI_TX + hash, "_blank"))}
            />
            : null}
        </Options> */}

        <Div>{textStatus}</Div>
        <Div>
          {/* <Diamond /> */}
          {/* <Span>
          <Label>Rarity Score</Label>
          <Score>123.3</Score>
        </Span> */}
        </Div>
      </Container>
    );
  }
};
