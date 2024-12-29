import { createConfig, http } from 'wagmi';

//import { sepolia } from 'wagmi/chains';
import { neoxt4 } from "@/lib/neoX";
import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [neoxt4],
  connectors: [metaMask()],
  ssr: true,
  multiInjectedProviderDiscovery: false,
  transports: {
    [neoxt4.id]: http()
  }
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
