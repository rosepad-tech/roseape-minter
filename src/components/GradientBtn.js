import styled from "styled-components";

const Inset = styled.div`
  background-color: black;
  width: calc(100% - 0.2rem);
  height: calc(100% - 0.2rem);
  position: absolute;
  border-radius: 5rem;
  top: 0.1rem;
  left: 0.1rem;
`;

const Container = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  background: radial-gradient(circle at center, #e100ff8d, transparent 40%),
    radial-gradient(circle at top left, #ff9900, transparent 12%),
    radial-gradient(circle at top right, #ff0073, transparent 15%),
    radial-gradient(circle at bottom right, #ffbb00, transparent 30%),
    radial-gradient(circle at bottom left, #ff0073, transparent 25%),
    linear-gradient(96deg, #e7175d 0%, #f81f4e 100%);
  padding: 0.75rem 1.75rem;
  border-radius: 5rem;
  height: fit-content;
  width: fit-content;
  display: grid;
  place-content: center;
  position: relative;

  &:hover {
    ${Inset} {
      background-color: #25051bfa;
    }
  }
`;

const Label = styled.label`
  font-family: "Nasalization";
  cursor: pointer;
  z-index: 2;
`;

export default ({ label, children, stroked = false, onClick = () => null }) => {
  return (
    <Container onClick={() => onClick()}>
      {stroked && <Inset />}
      <Label style={{ color: stroked ? "#ff0073" : "white" }}>
        {label || children}
      </Label>
    </Container>
  );
};
