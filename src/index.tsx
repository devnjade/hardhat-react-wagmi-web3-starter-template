import App from 'app';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiConfig, createClient } from 'wagmi'
import { connector } from 'web3/connector';

const client = createClient(connector)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <WagmiConfig client={client}>
    <App />
  </WagmiConfig>
);
