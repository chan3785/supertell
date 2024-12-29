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