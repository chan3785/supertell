import { createConfig, http } from 'wagmi';

//import { sepolia } from 'wagmi/chains';
import { neoxMainnet } from "@/lib/neoX";
import { metaMask, injected, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [neoxMainnet],
  connectors: [metaMask()],
  ssr: true,
  multiInjectedProviderDiscovery: false,
  transports: {
    [neoxMainnet.id]: http()
  }
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
