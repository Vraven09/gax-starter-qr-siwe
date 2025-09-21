'use client';

import React from 'react';
import { WagmiConfig, createConfig, http } from 'wagmi';
import { polygon, polygonAmoy } from 'wagmi/chains';
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

const { connectors } = getDefaultWallets({
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'GAX',
  projectId,
});

const config = createConfig({
  chains: [polygonAmoy, polygon],
  transports: {
    [polygonAmoy.id]: http(),
    [polygon.id]: http()
  },
  connectors
});

export default function WalletProvider({ children }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
