import NftCard from "../components/nftCard"
import NftDetails from "../components/nftDetails"
import { useState } from "react"
export default function Buy(){
    const [selected,setSelected] = useState(null);
    const data = [
        {
            name: "House",
            price: "1000",
            description: "This is a house",
            details : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
            location: "Mumbai"
        },
        {
            name: "House",
            price: "1000",
            description: "This is a house",
            details : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
            location: "Mumbai"
        },
        {
            name: "House",
            price: "1000",
            description: "This is a house",
            details : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
            location: "Mumbai"
        },
        {
            name: "House",
            price: "1000",
            description: "This is a house",
            details : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
            location: "Mumbai"
        },
        {
            name: "House",
            price: "1000",
            description: "This is a house",
            details : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
            location: "Mumbai"
        },
        {
            name: "House",
            price: "1000",
            description: "This is a house",
            details : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
            location: "Mumbai"
        },
        {
            name: "House",
            price: "1000",
            description: "This is a house",
            details : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
            location: "Mumbai"
        },
        {
            name: "House",
            price: "1000",
            description: "This is a house",
            details : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
            location: "Mumbai"
        },

    ]

    const clickSelect = (item) => {
        setSelected(item);
    }


    return(
        
            selected === null ?
            
            <div className="grid grid-cols-4 gap-2 px-40 bg-black text-white pt-28">
                {data.map((item) => {
                    return(<NftCard key={item.name} item={item} name={item.name} price={item.price} description={item.description} location={item.location} clickSelect={clickSelect}/>)})}
            </div>
            
            :

            <div className="pt-28 px-40 bg-black h-screen">
                <NftDetails name={selected.name} price={selected.price} description={selected.description} details={selected.details} location={selected.location}/>
            </div>

        
    )
}