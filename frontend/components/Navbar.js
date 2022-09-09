
import Link from "next/link"
import { stateContext } from "../context/stateContext";
import { useContext } from "react";

const NavBar = (props) => {
  const {connectWallet, connected ,disconnect} = useContext(stateContext);

  return (
    <div className="flex justify-between m-5 px-48" >
      <Link href="/">
          <a className="">BLOCK STATE</a>
      </Link>
      <div className="flex items-center gap-20">
        <button className="p-2 bg-blue-600 text-white rounded-md  hover:bg-blue-700 hover:shadow-lg">Become Member</button>
        <Link href="/buy">
          <a className="p-2 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:rounded-md">BUY</a>
        </Link>
        <Link href="/sell">
          <a className="p-2 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:rounded-md">SELL</a>
        </Link><Link href="/rent">
          <a className="p-2 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:rounded-md">RENT</a>
        </Link>
        {
          !connected ?
            <button onClick={connectWallet} className="p-2 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:rounded-md">CONNECT</button>
            :
            <button onClick={disconnect} className="">CONNECTED</button>
        }
      </div>
    </div>
    
  )
}

export default NavBar;
