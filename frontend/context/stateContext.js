import {createContext,useState} from 'react';
import NavBar from '../components/Navbar';
import {ethers} from 'ethers';
import {abi,contract_address} from "../constants/index";
export const stateContext = createContext();

export default function Layout({children}){
    
    const [connected, setConnected] = useState(false);
    const [provider,setProvider] = useState(null);
    const [contract,setContract] = useState(null);
    const [account,setAccount] = useState(null);
    
    const networks = {
        mumbai: {
          chainId: `0x${Number(80001).toString(16)}`,
          chainName: "Mumbai Testnet",
          nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18
          },
          rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
          blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
        }
    }
    const connectWallet = async () => {
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);           
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner(account);
            if(await signer.getChainId() != 80001){
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            ...networks["mumbai"]
                        }
                    ]
                })
            }
            setProvider(signer);
            setContract(new ethers.Contract(contract_address,abi,signer));
            setAccount(await signer.getAddress())
            setConnected(true);
        }
        catch(err){
            alert(err.message);
        }
    }
    const disconnect = async() => {
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