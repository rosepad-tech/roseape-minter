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
  border-radius: 1rem;
  border: 1px solid #4c173580;
  padding: 10px;
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
`;

const Title = styled.h3`
  color: #ff0087;
`;

const Description = styled.p`
  color: #ffffff;
`;

export default ({ img, title, description }) => {
  return (
    <Container>
      <Card>{img && <Image src={img} />}</Card>
      <Details>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </Details>
    </Container>
  );
};
