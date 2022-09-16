import { MdLocationOn } from 'react-icons/md';
import { BiMessageSquareDetail } from 'react-icons/bi';
import { useContext } from "react";
import { stateContext } from "../context/stateContext";
import { ethers } from 'ethers';
export default function NftDetails(props){
    const {contract,connectWallet, connected,account} = useContext(stateContext);

    const buyNft = async () => {
        try{
            console.log(props.id)
            const tx = await contract.createMarketSale(props.id,{from:account,value:ethers.utils.parseEther(""+props.price)});
            await tx.wait();
        }
        catch(err){
            alert(err);
        }
    }

    const rentNft = async () => {
        try{
            const tx = await contract.rentOutToken(props.key,{from:account,value:ethers.utils.parseEther(props.rentPrice+"")});
            await tx.wait();
        }
        catch(err){
            alert(err);
        }
    }

    return (
        <div className="text-white pt-4 px-40">
            {/* <div className="rounded-sm aspect-w-16 aspect-h-9">
                <iframe src="https://www.youtube.com/embed/7Qivx2om0MM" width="100%" height="315" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture"></iframe>
            </div> */}
            <div className='flex flex-row-reverse mt-2'>
                <button className="bg-white p-2 rounded-md text-black" onClick={props.closeSelect}>Close</button>
            </div>
            <div className='flex'>
                <img className="h-128 w-128 rounded-md" src={props.image}></img>
                <div className='pl-10 w-128'>
                    <div className="text-3xl font-bold">
                        {props.name}
                    </div>
                    <div className='py-2 text-xl'>
                        {props.details}
                    </div>
                    {props.description}
                    <div className='flex items-center gap-2 py-2'>
                        <MdLocationOn /> {props.location}
                    </div>
                    <div className='flex w-96 bg-zinc-900 rounded-xl p-5 justify-between flex-col'>
                        <div className='flex justify-between'>
                        <div>
                            <div className='bg-zinc-800 p-2 rounded-md w-36'>
                                <div className='text-zinc-400 text-sm'>price</div>
                                <div>{props.price} MATIC</div>
                                <div className='text-zinc-400 text-md'>${props.price * 0.86}</div>
                            </div>
                        </div>
                        <div>
                            <div className='bg-zinc-800 p-2 rounded-md w-36'>
                                <div className='text-zinc-400 text-sm'>rent price</div>
                                <div>{props.rentPrice} MATIC</div>
                                <div className='text-zinc-400 text-md'>${props.rentPrice * 0.86}</div>
                            </div>
                        </div>
                        </div>
                        
                        {
                            connected ?
                                <div className='flex justify-between'>
                                    <button onClick={buyNft} className='mt-3 w-36 p-2 bg-white text-black rounded-2xl hover:bg-gray-100'>Buy</button>
                                    <button onClick={rentNft} className='mt-3 w-36 p-2 bg-white text-black rounded-2xl hover:bg-gray-100'>Rent</button>
                                </div>
                            :
                                <button className='mt-4 w-full p-2 bg-white text-black rounded-2xl hover:bg-gray-100' onClick={connectWallet}>Connect wallet</button>
                        }
                    </div>
                    
                    <div className='flex gap-16 pl-1 py-4 items-center'>
                        <div className=''>Owned By 0x625B...c5d</div>
                        <div className='flex items-center p-2 bg-blue-600 rounded-xl gap-2'>
                            <BiMessageSquareDetail />
                            <h1>Message owner</h1>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}