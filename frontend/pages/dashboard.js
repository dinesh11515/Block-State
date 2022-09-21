import { useState } from "react";
export default function Dashboard() {
    const [data,setData] = useState([]);

    const getDetails = async () => {
        try{
            const response = await fetch("https://api.covalenthq.com/v1/80001/tokens/0xd33bd6917a278e11cf812e5f3e29c132558e1edd/nft_transactions/1/?quote-currency=USD&format=JSON&key=ckey_4760467d5dde4c2f902585f848d");
            const data = await response.json();
            const len = data.data.items[0].nft_transactions.length;
            setData(Object.entries(data.data.items[0].nft_transactions[len-1]));
        }
        catch(err){
            alert(err);
        }
    }
    console.log(data.length)
    return (
        <div className=" bg-black h-screen text-white px-40 flex justify-between">
            <div>
                <div className="flex gap-10 items-center">
                    <h1>Get the TokenIds and Owner Details</h1>
                    <button className="p-2 bg-blue-600 text-white rounded-md  hover:bg-blue-700 hover:shadow-lg" onClick={getDetails}>GET</button>
                </div>
                <div>
                    <h1>Get the Specific token Details</h1>
                    <input type="text" placeholder="Enter the TokenId" />
                    <button className="p-2 bg-blue-600 text-white rounded-md  hover:bg-blue-700 hover:shadow-lg">GET</button>
                </div>
            </div>
            <div className="bg-gray-600 w-1/2 h-5/6 rounded-md">
                {/* {data.map((item) => {
                    return <p>{item[0]}:{item[1]}</p>})} */}
                {
                    // for(let i=0;i<data.length;i++){
                    //     <p>{data[i][0]}:{data[i][1]}</p>
                    // }
                }
            </div>
        </div>
    )
}