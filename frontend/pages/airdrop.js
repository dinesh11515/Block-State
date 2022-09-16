import dynamic from "next/dynamic";
import { WidgetProps } from "@worldcoin/id";

const WorldIDWidget = dynamic(
    () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
    { ssr: false }
);

export default function Airdrop() {

    return (
        <div className=" text-white px-40 flex items-center flex-col mt-48 gap-4">
            <h1 className="text-lg font-bold uppercase tracking-widest">Early Adoptors Airdrop is here</h1>
            <span className="text-sm">We are airdropping special NFT's to 20 early Adopters.</span>
            <div>

                <WorldIDWidget
                    actionId="wid_BPZsRJANxct2cZxVRyh80SFG" // obtain this from developer.worldcoin.org
                    signal="my_signal"
                    enableTelemetry
                    onSuccess={(verificationResponse) => console.log(verificationResponse)}
                    onError={(error) => console.error(error)}
                />
            </div>
            <button className="px-16 p-3 bg-blue-600 text-white rounded-full  hover:bg-blue-700 hover:shadow-lg">Claim</button>
        </div>
    );
}