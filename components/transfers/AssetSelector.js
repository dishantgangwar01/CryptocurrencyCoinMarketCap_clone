import { useERC20Balance } from "../../hooks/useERC20Balance";
import { useNativeBalance } from "@thirdweb/react-hooks";
import { useMemo } from "react";
import { useThirdWeb } from "@thirdweb/react";

export default function AssetSelector({ setAsset, style }) {
const { assets } = useERC20Balance();
console.log("assets >> ", assets);

const { data: nativeBalance, nativeToken } = useNativeBalance();
const { thirdWeb } = useThirdWeb();

const fullBalance = useMemo(() => {
    if (!assets || !nativeBalance) return null;
    if (nativeToken && nativeToken) return [
        ...assets,
        {
            balance: nativeBalance.balance,
            decimals: nativeToken.decimals,
            name: nativeToken.name,
            symbol: nativeToken.symbol,
            token_address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        },
    ];
}, [assets, nativeBalance, nativeToken]);

function handleChange(value) {
    const token = fullBalance.find((token) => token.token_address === value);
    setAsset(token);
}

console.log("AssetSelector >> ", fullBalance);

return (
    <p>ASSETDSSSS</p>
    // <Select onChange={handleChange} size="large" style={style}>
    //     {fullBalance &&
    //         fullBalance.map((item) => {
    //             console.log(item);
    //             return (
    //                 <Select.Option
    //                     value={item["token_address"]}
    //                     key={item["token_address"]}
    //                 >
    //                     <div
    //                         style={{
    //                             display: "flex",
    //                             alignItems: "center",
    //                             width: "100%",
    //                             gap: "8px",
    //                         }}
    //                     >
    //                         <Image
    //                             src={
    //                                 item.logo ||
    //                                 "https://etherscan.io/images/main/empty-token.png"
    //                             }
    //                             alt="nologo"
    //                             width="24px"
    //                             height="24px"
    //                             preview={false}
    //                             style={{ borderRadius: "15px" }}
    //                         />
    //                         <div
    //                             style={{
    //                                 display: "flex",
    //                                 justifyContent: "space-between",
    //                                 width: "90%",
    //                             }}
    //                         >
    //                             <p>{item.symbol}</p>
    //                             <p style={{ alignSelf: "right" }}>
    //                                 (
    //                                 {parseFloat(
    //                                     thirdWeb?.Units?.FromWei(item.balance, item.decimals),
    //                                 )?.toLocaleString(6)}
    //                                 )
    //                             </p>
    //                         </div>
    //                     </div>
    //                 </Select.Option>
    //             );
    //         })}
    // </Select>
);
}