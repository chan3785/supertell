import { defineChain } from 'viem'

export const neoxt4 = defineChain({
  id: 12227332,
  name: 'NeoX T4',
  nativeCurrency: { name: 'GAS', symbol: 'GAS', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://neoxt4seed1.ngd.network'] },
  },
  blockExplorers: {
    default: { name: 'Neo X Explorer', url: 'https://xt4scan.ngd.network/' },
  },
  contracts: {
    wgas10: {
        address: '0x1CE16390FD09040486221e912B87551E4e44Ab17',
        blockCreated: 32961,
    },
    multicall3: {
      address: '0x82096F92248dF7afDdef72E545F06e5be0cf0F99',
      blockCreated: 36458,
    },
  },
})

export const neoxMainnet = defineChain({
  id: 47763,
  name: 'NeoX Mainnet',
  nativeCurrency: { name: 'GAS', symbol: 'GAS', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://mainnet-1.rpc.banelabs.org'] },
  },
  blockExplorers: {
    default: { name: 'Neo X Explorer', url: 'https://xexplorer.neo.org' },
  },
  contracts: {
    wgas10: {
        address: '0xdE41591ED1f8ED1484aC2CD8ca0876428de60EfF',
        blockCreated: 11262,
    },
    multicall3: {
      address: '0xD6010D102015fEa9cB3a9AbFBB51994c0Fd6E672',
      blockCreated: 4299,
    },
  },
})