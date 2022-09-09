import {createContext,useState} from 'react';
import NavBar from '../components/Navbar';
import {ethers} from 'ethers';
import {abi} from "../artifacts/contracts/RentableNFT.sol/RentableNFTMarketplace.json";
export const stateContext = createContext();

export default function Layout({children}){
    
    const [connected, setConnected] = useState(false);
    const [provider,setProvider] = useState(null);
    const [contract,setContract] = useState(null);
    const [account,setAccount] = useState(null);
    
    const connectWallet = async () => {
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);           
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner(account);
            if(await signer.getChainId() != 80001){
                throw new Error("Please connect to the Mumbai testnet network");
            }
            setProvider(signer);
            setContract(new ethers.Contract("0x95e16bCc6AD0b09CF84CeE50c39277D48C811830",abi["abi"],signer));
            setAccount(await signer.getAddress())
            setConnected(true);
        }
        catch(err){
            alert(err.message);
        }
    }
    const disconnect = async() => {
        if(provider.close) {
            await provider.close();
            await web3Modal.clearCachedProvider();
          }
        setConnected(false);
        setProvider(null);
        setContract(null);
        setAccount(null);
    }
    return(
        <stateContext.Provider value={{
            connected,
            provider,
            contract,
            account,
            connectWallet,
            disconnect
        }}>
            <NavBar />
            {children}
        </stateContext.Provider>
    )
}