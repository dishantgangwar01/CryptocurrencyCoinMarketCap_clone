import React, { useEffect, useState } from 'react';
import { useNativeBalance } from 'react-thirdweb';
import AssetSelector from './AssetSelector';

export default function CoinTransfer() {
  const [receiver, setReceiver] = useState('');
  const [asset, setAsset] = useState(null);
  const [tx, setTx] = useState(null);
  const [amount, setAmount] = useState('');
  const [isPending, setIsPending] = useState(false);
  const { balance } = useNativeBalance();

  console.log('Native balance:', balance);

  async function transfer() {
    const { amount, receiver, asset } = tx;

    let options = {};

    switch (asset.token_address) {
      case '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee':
        options = {
          from: ThirdWeb.eth.defaultAccount,
          to: receiver,
          value: ThirdWeb.utils.toWei(amount, 'ether'),
          gas: '21000',
        };
        break;
      default:
        options = {
          from: ThirdWeb.eth.defaultAccount,
          to: asset.token_address,
          value: ThirdWeb.utils.toHex(ThirdWeb.utils.toWei(amount, 'ether')),
          data: ThirdWeb.utils.hexToBytes(
            `0xa9059cbb000000000000000000000000${ThirdWeb.utils.stripHexPrefix(receiver)}${ThirdWeb.utils
              .stripHexPrefix(
                ThirdWeb.utils.toHex(
                  ThirdWeb.utils.toBN(
                    ThirdWeb.utils.toWei(amount, 'ether'),
                  ).toString(),
                ),
              )
              .padStart(64, '0')}`,
          ),
          gas: '100000',
        };
    }

    setIsPending(true);

    ThirdWeb.eth.sendTransaction(options, (error, hash) => {
      if (error) {
        openNotification({
          message: '📃 Error',
          description: `${error.message}`,
        });
        console.error(error);
        setIsPending(false);
      } else {
        openNotification({
          message: '🔊 New Transaction',
          description: `${hash}`,
        });
        console.log('🔊 New Transaction', hash);
      }
    });
  }

  useEffect(() => {
    if (asset && amount && receiver) {
      setTx({ amount, receiver, asset });
    } else {
      setTx(null);
    }
  }, [asset, amount, receiver]);

  return (
    <div>
      <input placeholder="select Token" />
      <p>Show Balance: {balance}</p>
      <input
        type="number"
        placeholder="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <p>To:</p>
      <input
        placeholder="address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />

      <button onClick={transfer}>Transfer</button>
      <AssetSelector setAsset={setAsset} />
    </div>
  );
}
