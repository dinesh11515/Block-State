import { useState } from "react";
import { NFTStorage, File } from "nft.storage";
import mime from "mime";
import fs from "fs";
import path from "path";


export default function Sell(){

    const [rent,setRent] = useState(false);
    const [buy,setBuy] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState([]);
    const [img2, setImg2] = useState([]);
    const [img3, setImg3] = useState([]);
    const [price, setPrice] = useState(0);
    const [details, setDetails] = useState("");
    const [address, setAddress] = useState("");
    const NFT_STORAGE_KEY = process.env.NFT_STORAGE_KEY;
    console.log(name,description,img,price,details,address);

    const StoreMetadata = async (image, Name, Description) => {
        console.log("Preparing Metadata ....");
        const nft = {
            image: image,
            name: Name,
            description: Description,
        };
        console.log("Uploading Metadata to IPFS ....");
        const client = new NFTStorage({ token: NFT_STORAGE_KEY });
        const metadata = await client.store(nft);
        console.log(metadata);
        console.log("NFT data stored successfully 🚀🚀");
        console.log("Metadata URI: ", metadata.url);

        return metadata;
    };

    const upload = async () => {
        try {
          const metadata = await StoreMetadata(img, name, description);
          const uri = metadata.url;
          console.log(metadata);
          const url = `https://ipfs.io/ipfs/${metadata.ipnft}`;
          console.log("NFT metadata uploaded to IPFS");
        } catch (err) {
          console.log(err);
        }
    };
      

    
    return(
        <div className="block m-auto mt-10 p-6 rounded-lg shadow-lg bg-white max-w-xl">
            <form>
                
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
                    <label className="form-check-label inline-block text-gray-800" for="exampleCheck25">For Rent</label>
                </div>
                <div className="form-group form-check mb-6">
                <input type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                    id="exampleCheck25" onChange={()=>{setBuy(!buy)}}>
                        </input>
                <label className="form-check-label inline-block text-gray-800" for="exampleCheck25">For Sale</label>
                </div>
                
                <button type="submit" className="
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
            </form>
        </div>
        
    )
}