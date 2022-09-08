import { useState } from "react";
export default function Sell(){

    const [rent,setRent] = useState(false);
    const [buy,setBuy] = useState(false);
    return(
        <div className="block m-auto mt-10 p-6 rounded-lg shadow-lg bg-white max-w-md">
            <form>
                
                <div className="form-group mb-6">
                    <input type="email" className="form-control block
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
                        placeholder="Property Name">
                    </input>

                </div>
                <div className="form-group mb-6">
                    <input type="email" className="form-control block
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
                        placeholder="Price in ETH">
                    </input>

                </div>
                <div className="mb-4">
                    Choose image of the property
                </div>
                <div className="form-group form-check mb-6">
                    <input
                    type="file"
                    accept=".png ,.jpeg,.jpg"
                        >
                    </input>
                </div>
                <div className="form-group form-check mb-6">
                    <input type="checkbox"
                        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                        id="exampleCheck25" onChange={()=>setRent(true)} checked>
                            </input>
                    <label className="form-check-label inline-block text-gray-800" for="exampleCheck25">For Rent</label>
                </div>
                <div className="form-group form-check mb-6">
                <input type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                    id="exampleCheck25" onChange={()=>{setBuy(true)}} checked>
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
                ease-in-out">Register Property</button>
            </form>
        </div>
        
    )
}