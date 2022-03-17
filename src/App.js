import Footer from "components/Footer";
import Header from "components/Header";
import Main from "components/Main";
//import Navbar from 'components/NavBar'
import Home from 'components/Home'
// import Owned from 'components/Owned'
import styled from "styled-components";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: auto;
  padding: 1rem;
  background: radial-gradient(circle at center, #ff00731a, transparent 40%),
    radial-gradient(circle at top left, #ff007140, transparent 12%),
    radial-gradient(circle at top right, #ff007140, transparent 15%),
    radial-gradient(circle at bottom right, #ff007140, transparent 30%),
    radial-gradient(circle at bottom left, #ff007140, transparent 25%),
    linear-gradient(96deg, #11010a 0%, #3535353b 100%);

  &::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #72174b80;
    border-radius: 5rem;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #ff008780;
  }
`;

// export default () => {
//   return (
//     <Container>
//       <Header />
//       <Main />
//       <Footer />
//     </Container>
//   );
// };


export default class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state={
      signer : null,
      connected : false,
      address : ''
    }
    this.connect = this.connect.bind(this)
    this.metamask = this.metamask.bind(this)
  }

  componentDidMount = () => {
    try{
      if(typeof window.ethereum !== undefined || typeof window.ethereum !== null){
       window.ethereum.on('accountsChanged', () => {
         if(this.state.connected){
         notification['warning']({
         message : 'Account Change Detected In Metamask. Please re-connect your wallet.'
         })
         this.setState({
           connected : false,
           signer : null,
           address : ''
         })
       }
     })
 
     window.ethereum.on('networkChanged', () => {
       notification['info']({
         message : 'Network Change Detected In Metamask. Please ensure you are connected to BSC Testnet.'
       })
       this.setState({
         connected : false,
         signer : null,
         address : ''
       })
     })
     }
    } catch(e) {
      console.log(e)
    }
  }

  connect = (type) => {
    if(type == 'metamask'){
      this.metamask()
    }
  }

  metamask = async () => {
    try{
			if(window.ethereum === undefined || window.ethereum === null){
        notification.error({
          message : 'No Metamask Found',
          description : 'For using this application, you need to install metamask in your browser.'
        })
      }
      else{
				let provider = new ethers.providers.Web3Provider(window.ethereum);
				await window.ethereum.enable();
				const address = await provider.listAccounts();
				let network = await provider.getNetwork()
				if(network.chainId !== 42261){
					notification['error']({
						message : 'Wrong Network Detected. Please connect to Binance Test Smart Chain'
					})
					this.setState({connectWalletModalVisible : false})
				}
				else{
				let signer = await provider.getSigner();
				this.setState({connected : true, address : address[0],signer : signer})
			}
     }
		}
		catch(e){
			console.log(e)
		}
  }
  
  render(){
  const { signer, connected, address } = this.state
  return (
    <Container>
      <Header/>
      <Navbar
        signer = {signer}
        connected = {connected}
        address = {address}
        connect = {this.connect}
        />
      <Home 
        signer = {signer}
        connected = {connected}
        address = {address}
        />
      <Owned  
        signer = {signer}
        connected = {connected}
        address = {address}
      />
      <Footer/>
      </Container>
  );
 }
}
