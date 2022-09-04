
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
      <div className="flex gap-20">
        <Link href="/buy">
          <a className="">BUY</a>
        </Link>
        <Link href="/sell">
          <a className="">SELL</a>
        </Link><Link href="/rent">
          <a className="">RENT</a>
        </Link>
        {
          !connected ?
            <button onClick={connectWallet}>CONNECT</button>
            :
            <button onClick={disconnect}>CONNECTED</button>
        }
      </div>
    </div>
    
  )
}

export default NavBar;
