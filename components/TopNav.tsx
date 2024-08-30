import { ConnectWalletButton } from "./ConnectWalletButton";

export default function TopNav(){
    return(
        <div className="px-10 py-5 flex items-center justify-between">
            <div className="text-lg font-semibold">QuickBite</div>
            <div>
                <ConnectWalletButton/>
            </div>
        </div>
    )
}