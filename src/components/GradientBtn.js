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
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    ${Inset} {
      background-color: #25051bfa;
    }
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

// export default ({ label, children, stroked = false, onClick = () => null }) => {
//   return (
//     <Container onClick={() => onClick()}>
//       {stroked && <Inset />}
//       <Label style={{ color: stroked ? "#ff0073" : "white" }}>
//         {label || children}
//       </Label>
//     </Container>
//   );
// };


export default class Navbar extends React.Component{

  constructor(props){
      super(props)
      this.state={
          connecting : false,
          modal : false
      }
  }

  render(){
      const {connecting,modal} = this.state
      const {connected, address} = this.props
      return(
        <Container>
          <div className="navbar-wrapper">
            <div className="navbar container">
              <h1>ProofSys</h1>
              <div>
                  {
                  connected ? 
                  <div className="connected-card">
                      <img src="https://dynamic-assets.coinbase.com/4861e50787caa9405703c71e788467e8242f5d15a7a51335c299dc3e87a8d1d08bfd19ab67ad8bb2581b525af27c8dcbd0c78ede837eeaff75ae9b96716bf75e/asset_icons/1597d628dd19b7885433a2ac2d7de6ad196c519aeab4bfe679706aacbf1df78a.png" />
                      <p>{address.slice(0,10) + '..........' + address.slice(35,42)}</p>
                  </div>
                  :
                  <Button loading={connecting} type="primary" onClick={()=>{this.setState({modal : true})}}>
                      Connect Wallet
                  </Button>
                  }
              </div>
            </div>  
            <Modal title="Connect Wallet" visible={modal && !connected} footer={null} onCancel={()=>{this.setState({ modal : false })}}>
              <div className="connect-card" onClick={()=>{this.props.connect('metamask')}}>
                  <img src={Metamask} />
                  <h2>Metamask</h2>
                  <p>Connect to your metamask wallet</p>
              </div>
            </Modal>  
          </div>
        </Container>
      )
  }
}
