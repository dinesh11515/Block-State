import { useState } from "react";
import { NFTStorage } from "nft.storage";
import { connect } from "@tableland/sdk";
import { useContext } from "react";
import { stateContext } from "../context/stateContext";
import { Web3Storage } from "web3.storage";
import { MdTableView } from "react-icons/md";
import { ethers } from "ethers";

export default function Sell(){
    const [rent,setRent] = useState(false);
    const [sell,setSell] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState([]);
    const [price, setPrice] = useState(0);
    const [rentPrice, setRentPrice] = useState(0);
    const [details, setDetails] = useState("");
    const [address, setAddress] = useState("");
    const [url,setUrl] = useState("");
    const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY;
    const {contract,connectWallet, connected,account} = useContext(stateContext);
    const web3storage_key = process.env.NEXT_PUBLIC_WEB3_STORAGE_KEY;

    const [msg,setMsg] = useState("REGISTER PROPERTY");


    const storeImage = async () => {
        const client = new Web3Storage({ token: web3storage_key });
        const cid = await client.put([img]);
        const img_url = ("https://gateway.pinata.cloud/ipfs/"+cid+"/"+img.name);
        return img_url
    };

    const StoreMetadata = async () => {
        const nft = {
            image: img,
            name: name,
            description: description,
            price : price,
            rentPrice : rentPrice,
            details : details,
            address : address,
            rent : rent,
            sell : sell
        };
        const client = new NFTStorage({ token: NFT_STORAGE_KEY });
        const metadata = await client.store(nft);
        console.log(metadata);
        return metadata;
    };

    
    const upload = async () => {
        try {
            const id = ethers.BigNumber.from(await contract._tokenIds()).toNumber()+1;
            setMsg("Uploading data to IPFS...")
            const img_url = await storeImage();
            const metadata = await StoreMetadata();
            setUrl(`https://gateway.pinata.cloud/ipfs/${metadata.ipnft}/metadata.json`);
            setMsg("Uploading data to Tableland...")
            await UploadDataIntoTableland(id,img_url)
            setMsg("Minting...")
            const tx = await contract.createToken(metadata.ipnft,price,rentPrice,sell,rent,true);
            await tx.wait();
            setMsg("Registered Successfully");
        } catch (err) {
          alert(err.message);
          setMsg("REGISTER PROPERTY");
        }
    };


    const UploadDataIntoTableland = async (id,img_url) => {
        try{
            const tableland = await connect({ network: "testnet", chain: "polygon-mumbai" });
            // await tableland.siwe();
    
            // const data = await tableland.create(
            // `id integer, name text,price integer,rentPrice integer, description text, details text, address text,image text,rent text,sale text,owner text, primary key (id)`,
            // {
            //     prefix: `blockstate`
            // }
            // );
            // add sold and owner in tableland
            const table_name = "blockstate_80001_1967";
            const writeRes = await tableland.write(`INSERT INTO ${table_name} VALUES ('${id}','${name}','${price}','${rentPrice}','${description}','${details}','${address}','${img_url}','${rent}','${sell}');`);
            
        }
        catch(err){
            alert(err);
        }
    }    
    return(
        <div className="mt-4">
            <div className="block m-auto rounded-lg shadow-lg bg-black text-white max-w-xl">
                    <div className="form-group mb-6">
                        <input type="text" className="form-control block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                            placeholder="Property Name"
                            onChange={(e) => setName(e.target.value)}>
                        </input>

                    </div>
                    <div className="form-group mb-6">
                        <input type="number" className="form-control block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                            placeholder="Price in MATIC"
                            onChange={(e) => setPrice(e.target.value)}
                            >
                        </input>
                    </div>
                    <div className="form-group mb-6">
                        <input type="number" className="form-control block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                            placeholder="Rent Price in MATIC"
                            onChange={(e) => setRentPrice(e.target.value)}
                            >
                        </input>
                    </div>
                    <div className="form-group mb-6">
                        <input type="text" className="form-control block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            >
                        </input>
                    </div>
                    <div className="form-group mb-6">
                        <input type="text" className="form-control block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                            placeholder="Details eg:2BHK"
                            onChange={(e) => setDetails(e.target.value)}
                            >
                        </input>
                    </div>
                    <div className="form-group mb-6">
                        <input type="text" className="form-control block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput125"
                            placeholder="Address"
                            onChange={(e) => setAddress(e.target.value)}
                            >
                        </input>
                    </div>

                    <div className="mb-4">
                        Upload images of the property:
                    </div>
                    <div className="form-group form-check mb-6">
                        <div className="mb-2">This image used for NFT so choose the best one here</div>
                        <input
                        type="file"
                        accept=".png ,.jpeg,.jpg"
                        onChange={(e) => setImg(e.target.files[0])}
                            >
                        </input>
                    </div>
                    {/* <div className="form-group form-check mb-6">
                        <input
                        type="file"
                        accept=".png ,.jpeg,.jpg"
                        onChange={(e) => setImg2(e.target.files[0])}
                            >
                        </input>
                    </div>
                    <div className="form-group form-check mb-6">
                        <input
                        type="file"
                        accept=".png ,.jpeg,.jpg"
                        onChange={(e) => setImg3(e.target.files[0])}
                            >
                        </input>
                    </div> */}
                    <div className="form-group form-check mb-6">
                        <input type="checkbox"
                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                            id="exampleCheck25" onChange={()=>{setRent(!rent)}}>
                                </input>
                        <label className="form-check-label inline-block text-gray-100">For Rent</label>
                    </div>
                    <div className="form-group form-check mb-6">
                    <input type="checkbox"
                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                        id="exampleCheck25" onChange={()=>{setSell(!sell)}}>
                            </input>
                    <label className="form-check-label inline-block text-gray-100">For Sale</label>
                    </div>
                    
                    {
                        connected ? 
                            <button className="
                            w-full
                            px-6
                            py-3
                            bg-blue-600
                            text-white
                            font-medium
                            text-xs
                            leading-tight
                            rounded
                            shadow-md
                            hover:bg-blue-700 hover:shadow-lg
                            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                            active:bg-blue-800 active:shadow-lg
                            transition
                            uppercase
                            duration-150
                            ease-in-out"
                            onClick={upload}>{msg}</button>
                            :
                            <button className="
                            w-full
                            px-6
                            py-3
                            bg-blue-600
                            text-white
                            font-medium
                            text-xs
                            leading-tight
                            rounded
                            shadow-md
                            uppercase
                            hover:bg-blue-700 hover:shadow-lg
                            focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                            active:bg-blue-800 active:shadow-lg
                            transition
                            duration-150
                            ease-in-out"
                            onClick={connectWallet}>Connect wallet</button>
                    }
            </div>
        </div>
        
    )
}