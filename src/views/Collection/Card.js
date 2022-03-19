import { truncate } from "lodash";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 3fr 1fr;
`;

const Card = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 1rem;
  background: #4c1735;
  border: 1px solid #4c173580;
  width: 100%;
  height: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Details = styled.div`
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  margin: 0.5rem 0;
`;

const Title = styled.h3`
  color: #ff0087;
  margin: 0.125rem 0;
`;

const Addr = styled.p`
  color: #ffffff;
  margin: 0.125rem 0;
  font-size: 12px;
  opacity: 0.72;
`;

const Symbol = styled.p`
  margin: 0.125rem 0;
  color: #ff0087;
  background-color: #ff008729;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
`;
const Type = styled.small`
  color: white;
  opacity: 0.42;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default ({
  cid,
  balance,
  contractAddress,
  decimals,
  name,
  src,
  symbol,
  type,
  uri,
}) => {
  return (
    <Container onClick={() => window.open(src, "_blank").focus()}>
      <Card>{src && <Image src={src} />}</Card>
      <Details>
        <Column>
          <Title>{name}</Title>
          <Addr>{truncate(contractAddress, { length: 27 })}</Addr>
          <Row>
            <Symbol>{symbol}</Symbol>
            <Type>{type}</Type>
          </Row>
        </Column>
      </Details>
    </Container>
  );
};
