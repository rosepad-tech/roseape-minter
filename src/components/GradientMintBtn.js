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
  
  padding: 0.75rem 1.75rem;
  border-radius: 5rem;
  height: fit-content;
  width: fit-content;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background: linear-gradient(90deg, yellow, orange, red, violet, purple, blue, yellow);
  background: radial-gradient(circle at center, #e100ff8d, transparent 40%),
  radial-gradient(circle at top left, #ff9900, transparent 12%),
  radial-gradient(circle at top right, #ff0073, transparent 15%),
  radial-gradient(circle at bottom right, #ffbb00, transparent 30%),
  radial-gradient(circle at bottom left, #ff0073, transparent 25%),
  linear-gradient(96deg, #e7175d 0%, #f81f4e 100%);
  background-size: 400%;
  border-radius: 20px;
  

  @keyframes animate {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 400%;
    }
  }

  &:hover {
    animation: animate 8s linear infinite;
  }

  &:before {
    content: "";
    position: absolute;
    top: -5px;
    left: -5px;
    right: -5px;
    bottom: -5px;
    z-index: -1;
    background: linear-gradient(45deg, #f15523, #ef3224, #7c3697);
    background-size: 400%;
    border-radius: 40px;
    opacity: 0;
    transition: 0.5%;
  }

  &:hover:before {
    filter: blur(20px);
    opacity: 1;
    animation: animate 8s linear infinite;
  }
`;

const Icon = styled.img`
  width: 1.5rem;
`;

const Label = styled.label`
  font-family: "Nasalization";
  cursor: pointer;
  z-index: 2;

  @media (max-width: 768px) {
    display: ${({ icon }) => (icon ? "none" : "block")};
  }
`;

export default ({
  label,
  children,
  stroked = false,
  onClick = () => null,
  icon,
}) => {
  return (
    <Container onClick={() => onClick()}>
      {stroked && <Inset />}
      {icon && <Icon src={icon} />}
      <Label icon={!!icon} style={{ color: stroked ? "#ff0073" : "white" }}>
        {label || children}
      </Label>
    </Container>
  );
};
