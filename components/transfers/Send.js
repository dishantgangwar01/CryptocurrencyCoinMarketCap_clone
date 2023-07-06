import React, { useEffect, useState } from "react";
import { useThirdWeb, useWeb3Transfer } from "@thirdweb/react-thirdweb";

const TransferEth = () => {
  const { ethereum, address } = useThirdWeb();
  const [amount, setAmount] = useState('0');
  const [receiver, setReceiver] = useState('');

  const { fetch, error, isFetching } = useWeb3Transfer({
    type: "native",
    amount: amount !== '' ? ethereum.utils.toWei(amount, 'ether') : ethereum.utils.toWei('0.1', 'ether'),
    receiver: receiver
  });

  useEffect(() => {
    ethereum.request({ method: 'eth_requestAccounts' });
  }, [ethereum]);

  console.log(error);

  const transfer = async () => {
    try {
      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: address,
            to: receiver,
            value: amount !== '' ? ethereum.utils.toWei(amount, 'ether') : ethereum.utils.toWei('0.1', 'ether')
          }
        ]
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div>
        <input placeholder='select Token' />
        <p>Show Balance:</p>
        <input type="number" placeholder='amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
        <p>To:</p>
        <input placeholder='address' value={receiver} onChange={(e) => setReceiver(e.target.value)} />
      </div>
      <button onClick={() => transfer()} disabled={isFetching}>
        Transfer
      </button>
    </div>
  );
};

export default TransferEth;
