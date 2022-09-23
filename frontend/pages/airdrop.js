import dynamic from "next/dynamic";
import { useContext , useEffect, useState} from "react";
import { stateContext } from "../context/stateContext";
import { ethers } from "ethers";
import { airdrop_abi, airdrop_contract } from "../constants/index";
import { defaultAbiCoder as abi } from "@ethersproject/abi";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WidgetProps } from "@worldcoin/id";

const WorldIDWidget = dynamic(
    () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
    { ssr: false }
    );
    
export default function Airdrop() {
    const {provider,connectWallet, connected,account} = useContext(stateContext);
    const [contract,setContract] = useState();
    const [count , setCount] = useState(0);
    const [worldIDProof, setWorldIDProof] = useState(null);
    const nftport_key = process.env.NEXT_PUBLIC_NFTPORT_KEY;
    // console.log(worldIDProof)
    // console.log( abi.decode(["uint256[8]"], worldIDProof.proof))
    const claimNft = async () => {
        try{
            // await contract.callStatic.verify(worldIDProof.merkle_root,
            //     worldIDProof.nullifier_hash,
            //     abi.decode(["uint256[8]"], worldIDProof.proof)[0],
            //     { gasLimit: 10000000 },
            // );
            const tx = await contract.verify(worldIDProof.merkle_root,
                worldIDProof.nullifier_hash,
                abi.decode(["uint256[8]"], worldIDProof.proof)[0],
                
            );
            await tx.wait();
            // const options = {
            //     method: 'POST',
            //     url: 'https://api.nftport.xyz/v0/mints/customizable',
            //     headers: {
            //         'Content-Type': 'application/json',
            //         Authorization: nftport_key
            //     },
            //     data: {
            //         chain: 'polygon',
            //         contract_address: '0x67e9828f1392883b740613422c00aef08e9ff5b1',
            //         metadata_uri: 'ipfs://QmQ7okfvRjuwgBCM886SQ3SPdRDfjGtF2jSPWVR3qs15gU',
            //         mint_to_address: account,
            //     }
            // };

            // axios.request(options).then(function (response) {
            // console.log(response.data);
            // }).catch(function (error) {
            // console.error(error);
            // });
            toast("Claimed Successfully");
        }
        catch(err){
            if(err.errorName == "InvalidNullifier"){
                alert("You already claimed the NFT");
            }
            else{
                alert(err.message);
            }
        }
    }

    const getLeft = async (con) => {
        try{
            setCount(await con.getNftsLeft())
        }
        catch(err){
            alert(err)
        }
    }

    useEffect(() => {
        if(connected){
            const con = new ethers.Contract(airdrop_contract,airdrop_abi,provider);
            setContract(con);
            getLeft(con);
        }
    },[connected])
    console.log(count)
    return (
        <div className=" text-white px-40 flex items-center flex-col mt-48 gap-4">
            <h1 className="text-lg font-bold uppercase tracking-widest">Early Adoptors Airdrop is here 🎉 🎉</h1>
            <span className="text-sm">We are airdropping special NFT's to our 20 early Adopters.</span>
            {
                connected && <span className="text-sm">Only {count} left Claim Fast..</span>
            }
            {
                connected ?
                    <div className="flex flex-col items-center gap-4">
                        <WorldIDWidget
                            actionId="wid_e614be8c1fb6058f6e5d6dc8c98afd85"
                            signal= {""+account}
                            enableTelemetry
                            onSuccess={(verificationResponse) => setWorldIDProof(verificationResponse)}
                            onError={(error) => console.error(error)}
                        />
                        <button className="px-16 p-3 bg-blue-600 text-white rounded-full hover:shadow-lg"   disabled={!worldIDProof} onClick={claimNft}>Claim</button>
                    </div>
                    :
                    <button className="px-16 p-3 bg-blue-600 text-white rounded-full hover:shadow-lg" onClick={connectWallet}>Connect Wallet</button>
            }   
            <ToastContainer />
        </div>
    );
}