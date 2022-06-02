import { WagmiConfig, createClient, defaultChains, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { infuraProvider } from 'wagmi/providers/infura'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const infuraId: any = process.env.REACT_APP_INFURA_ID

// Configure chains & providers with the Infura provider.
// Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
// You can also use your own provider/ Alchemys, Check out https://wagmi.sh/docs/getting-started.

const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
  infuraProvider({ infuraId }),
  publicProvider(),
])

export const connector = {
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
}