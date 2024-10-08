import { useState , useEffect } from 'react'
import abi from "./contractJson/abi.json";
import './App.css';
import { ethers } from 'ethers';
import Donate from './components/donate';
import Memo from './components/memo';

interface AppState {
  provider: ethers.BrowserProvider | null;
  signer: ethers.Signer | null;
  contract: ethers.Contract | null;
}

declare global {
  interface Window{
  ethereum : any
  }
}

function App() {
  const [state, setState] = useState<AppState>({
    provider:null , signer:null , contract:null
  });
  const [account, setAccount] = useState<String>('Not connected>');

  const template = async() => {
    const contractAddress = "0x8B0D0d4D66168F26B2184874a25CB2e2FAE3b283"; //to reach to that blockchain
    const contractAbi = abi.abi; //to manipulate or interact with that blockchain

    //metamask connection

    const ethereum = window.ethereum;
    if (ethereum) {
     
      const account = await ethereum.request({
        method:"eth_requestAccounts",
      })

      window.ethereum.on("accountsChanged", () => {
        window.location.reload();
      })

      setAccount(account[0]); 

      const provider = new ethers.BrowserProvider(ethereum); //helpful to read operation on blockchain
      const signer = await provider.getSigner(); //helpful to write operation on blockchain

      const contract = new ethers.Contract(
         contractAddress , contractAbi , signer
      ) //creating a contract instance
      
      setState({ provider: provider, signer: signer, contract: contract });
    } else {
      console.log("plz download metamask extension");
    }

  }

  useEffect(() => {
    template();
  }, []);

  

  return (
    <>
      {state.contract != null ? (
        <>
          <div className="  h-[100vh]">
            <div className="image_title bg-gradient-to-tr from-slate-50 to-slate-300 w-full mx-auto">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvs0TtaTIzS9uUJZFB3GYk0T9rwxRueNZ2Qw&s"
                alt=""
                className="mx-auto shadow-lg"
              />
              <h1 className="text-3xl  text-center mt-3 underline font-bold text-green-800">
                Help the landslide victims
              </h1>
            </div>
            
            <Donate state={state} />
            {/* <Memo state = {state}/> */}
          </div>
        </>
      ) : (
        "error providing contract"
      )}
            <footer className='footer bg-green-900 text-white h-16 sticky top-[100%] p-3'>
              {" "}
              Connected to <b> {account} </b> 
            </footer>
    </>
  );
}

export default App
