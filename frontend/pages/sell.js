import { useState } from "react";
import { NFTStorage, File } from "nft.storage";
import mime from "mime";
import { connect } from "@tableland/sdk";


export default function Sell(){

    const [rent,setRent] = useState(false);
    const [sell,setSell] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState([]);
    const [img2, setImg2] = useState([]);
    const [img3, setImg3] = useState([]);
    const [price, setPrice] = useState(0);
    const [details, setDetails] = useState("");
    const [address, setAddress] = useState("");
    const [url,setUrl] = useState("");
    const NFT_STORAGE_KEY = process.env.NEXT_PUBLIC_NFT_STORAGE_KEY;

    const StoreMetadata = async () => {
        console.log("Preparing Metadata ....");
        const nft = {
            image: img,
            name: name,
            description: description,
            img2 : img2,
            img3 : img3,
            price : price,
            details : details,
            address : address,
            rent : rent,
            sell : sell
        };
        console.log("Uploading Metadata to IPFS ....");

        const client = new NFTStorage({ token: NFT_STORAGE_KEY });
        const metadata = await client.store(nft);
        return metadata;
    };

    

    const upload = async () => {
        try {
          const metadata = await StoreMetadata();
          setUrl(`https://ipfs.io/ipfs/${metadata.ipnft}/metadata.json`);
          UploadDataIntoTableland()
        } catch (err) {
          alert(err);
        }
    };
    console.log(url);

    const UploadDataIntoTableland = async () => {
        try{
            const response = await fetch(url);
            const data = await response.json();
            const tableland = await connect({ network: "testnet", chain: "polygon-mumbai" });
            await tableland.siwe();
    
            // const { name } = await tableland.create(
            // `id integer, name text,price integer, description text, details text, address text,img1 text,img2 text,img3 text,rent text,sale text, primary key (id)`,
            // {
            //     prefix: `blockstate`
            // }
            // );
            const name = "blockstate_80001_1667"
            const writeRes = await tableland.write(`INSERT INTO ${name} VALUES (2,'${data.name}','${data.price}','${data.description}','${data.details}','${data.address}','${data.img1}','${data.img2}','${data.img3}','${data.rent}','${data.sell}');`);
            const readRes = await tableland.read(`SELECT * FROM ${name};`);
    
            console.log(readRes);
        }
        catch(err){
            alert(err);
        }
    }    
    return(
        <div className="block m-auto mt-10 p-6 rounded-lg shadow-lg bg-white max-w-xl">
            
                
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
                <div className="form-group form-check mb-6">
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
                </div>
                <div className="form-group form-check mb-6">
                    <input type="checkbox"
                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                        id="exampleCheck25" onChange={()=>{setRent(!rent)}}>
                            </input>
                    <label className="form-check-label inline-block text-gray-800">For Rent</label>
                </div>
                <div className="form-group form-check mb-6">
                <input type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                    id="exampleCheck25" onChange={()=>{setSell(!sell)}}>
                        </input>
                <label className="form-check-label inline-block text-gray-800">For Sale</label>
                </div>
                
                <button className="
                w-full
                px-6
                py-2.5
                bg-blue-600
                text-white
                font-medium
                text-xs
                leading-tight
                uppercase
                rounded
                shadow-md
                hover:bg-blue-700 hover:shadow-lg
                focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                active:bg-blue-800 active:shadow-lg
                transition
                duration-150
                ease-in-out"
                onClick={upload}>Register Property</button>
            
        </div>
        
    )
}