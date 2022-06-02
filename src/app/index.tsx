import React from "react";
import { 
  useAccount, 
  useBalance, 
  useConnect, 
  useDisconnect,
  useNetwork
} from "wagmi";
import styles from './index.module.scss';
import { Buffer } from 'buffer';

Buffer.from('anything', 'base64');
window.Buffer = window.Buffer || require('buffer').Buffer;

const App: React.FC = () => {
  const { connect, connectors, error, isConnecting, pendingConnector } = useConnect();
  const { data: accountData } = useAccount();
  const { data: balanceData } = useBalance({
    addressOrName: accountData?.address,
  });
  const { disconnect } = useDisconnect();
  const { activeChain } = useNetwork();

  return (
    <main>
      {!accountData?.address 
        ?
          <div>
            {connectors.map((connector) => (
              <button
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => connect(connector)}
              >
                {connector.name}
                {!connector.ready && '(unsupported)'}
                {isConnecting && connector.id === pendingConnector?.id && '(connecting)'}
              </button>
            ))}

            {error && <div>{error.message}</div>}
          </div>
        :
          <div>
            <button onClick={() => disconnect()}>Disconnect Wallet</button>
          </div>
      }
      {accountData?.address && 
        <div>
          <p>Account: {accountData?.address}</p>
          <p>Balance: {balanceData?.formatted} {balanceData?.symbol}</p>
          <p>Network: {activeChain?.name}</p>
        </div>
      }
    </main>
  );
}

export default App;