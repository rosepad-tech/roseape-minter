import brand from "assets/brand.png";
import caret from "assets/caret.svg";
import kingape from "assets/kingape.png";
import hiddenape from "assets/hidden.png";
import bossape from "assets/boss.png";
import { StackedCarousel } from "react-stacked-carousel";
import styled from "styled-components";
import Body from "./Body";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  margin: auto;
  max-width: 1920px;
`;
const Carousel = styled.div`
  position: relative;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    width: 240px;
    height: 360px;
  }

  .card {
    background: #4c1735;
    border-radius: 1rem;
    border: 1px solid #4c173580;
    padding: 10px;
    width: 100%;
    height: 100%;
  }
`;
const Brand = styled.img.attrs({ src: brand })`
  width: 12rem;
`;

const Card = styled.div``;

const CaretBtn = styled.button`
  background: ${() =>
    `radial-gradient(circle at bottom right, #ffffff29, #ffffff11 72%),
    radial-gradient(circle at top left, #ffffff11, #ffffff11 36%),
    linear-gradient(96deg, #ffffff11 0%, #ffffff3b 100%)
    `};
  border: 1px solid #ffffff0a;
  padding: 1rem;
  display: grid;
  place-content: center;
  border-radius: 100%;
  aspect-ratio: 1;
  top: 50%;
  transform: translate(0, -50%);
  z-index: 2;
  position: absolute;
  display: grid;
  place-content: center;
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const Caret = styled.img.attrs({ src: caret })`
  width: 1.2rem;
  filter: invert(1);
`;

const Span = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  width: 500px;
  height: 500px;
  object-fit: cover;
  border-style: dotted solid;
  border-radius: 40px;
`;

export default () => {
  const onCardChange = (event) => {};

  return (
    <Container>
      <Brand />
      <Span>
        <Image src={bossape} />
        {/* <Carousel>
          <StackedCarousel
            autoRotate={false}
            onCardChange={onCardChange}
            containerClassName={"container"}
            cardClassName="card"
            // leftButton={
            //   <CaretBtn style={{ left: 0 }}>
            //     <Caret style={{ transform: "rotate(90deg)" }} />
            //   </CaretBtn>
            // }
            // rightButton={
            //   <CaretBtn style={{ right: 0 }}>
            //     <Caret style={{ transform: "rotate(-90deg)" }} />
            //   </CaretBtn>
            // }
          >
            <Card key={"1"}>
              <Image src={hiddenape} />
            </Card>
            <Card key={"2"}>
              <Image />
            </Card>
          </StackedCarousel>
        </Carousel> */}
        <Body />
      </Span>
    </Container>
  );
};
