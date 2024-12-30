const PRED_ABI = [
  {
    type: 'constructor',
    inputs: [
      { name: '_oracleAddress', type: 'address', internalType: 'address' }
    ],
    stateMutability: 'nonpayable'
  },
  { type: 'receive', stateMutability: 'payable' },
  {
    type: 'function',
    name: 'BTC_PAIR_INDEX',
    inputs: [],
    outputs: [{ name: '', type: 'uint64', internalType: 'uint64' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'BUFFER_PERIOD',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'EPOCH_LENGTH',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'TREASURY_FEE',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'betDown',
    inputs: [
      { name: 'user', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'betUp',
    inputs: [
      { name: 'user', type: 'address', internalType: 'address' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'payable'
  },
  {
    type: 'function',
    name: 'claim',
    inputs: [{ name: 'epoch', type: 'uint256', internalType: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'currentEpoch',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getCurrentEpoch',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getCurrentRound',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct SuperTell.Round',
        components: [
          { name: 'epoch', type: 'uint256', internalType: 'uint256' },
          { name: 'startTime', type: 'uint256', internalType: 'uint256' },
          { name: 'closeTime', type: 'uint256', internalType: 'uint256' },
          { name: 'startPrice', type: 'int256', internalType: 'int256' },
          { name: 'closePrice', type: 'int256', internalType: 'int256' },
          { name: 'totalUpAmount', type: 'uint256', internalType: 'uint256' },
          { name: 'totalDownAmount', type: 'uint256', internalType: 'uint256' },
          { name: 'totalAmount', type: 'uint256', internalType: 'uint256' },
          { name: 'resolved', type: 'bool', internalType: 'bool' }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getUserBet',
    inputs: [
      { name: 'epoch', type: 'uint256', internalType: 'uint256' },
      { name: 'user', type: 'address', internalType: 'address' }
    ],
    outputs: [
      {
        name: '',
        type: 'tuple',
        internalType: 'struct SuperTell.UserBet',
        components: [
          { name: 'isUp', type: 'bool', internalType: 'bool' },
          { name: 'amount', type: 'uint256', internalType: 'uint256' },
          { name: 'claimed', type: 'bool', internalType: 'bool' }
        ]
      }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'getUserBetEpochs',
    inputs: [{ name: 'user', type: 'address', internalType: 'address' }],
    outputs: [{ name: '', type: 'uint256[]', internalType: 'uint256[]' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'oracle',
    inputs: [],
    outputs: [
      { name: '', type: 'address', internalType: 'contract ISupraSValueFeed' }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'owner',
    inputs: [],
    outputs: [{ name: '', type: 'address', internalType: 'address' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'pause',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'paused',
    inputs: [],
    outputs: [{ name: '', type: 'bool', internalType: 'bool' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'renounceOwnership',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'rounds',
    inputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    outputs: [
      { name: 'epoch', type: 'uint256', internalType: 'uint256' },
      { name: 'startTime', type: 'uint256', internalType: 'uint256' },
      { name: 'closeTime', type: 'uint256', internalType: 'uint256' },
      { name: 'startPrice', type: 'int256', internalType: 'int256' },
      { name: 'closePrice', type: 'int256', internalType: 'int256' },
      { name: 'totalUpAmount', type: 'uint256', internalType: 'uint256' },
      { name: 'totalDownAmount', type: 'uint256', internalType: 'uint256' },
      { name: 'totalAmount', type: 'uint256', internalType: 'uint256' },
      { name: 'resolved', type: 'bool', internalType: 'bool' }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'transferOwnership',
    inputs: [{ name: 'newOwner', type: 'address', internalType: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'treasuryAmount',
    inputs: [],
    outputs: [{ name: '', type: 'uint256', internalType: 'uint256' }],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'unpause',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'function',
    name: 'userBets',
    inputs: [
      { name: '', type: 'uint256', internalType: 'uint256' },
      { name: '', type: 'address', internalType: 'address' }
    ],
    outputs: [
      { name: 'isUp', type: 'bool', internalType: 'bool' },
      { name: 'amount', type: 'uint256', internalType: 'uint256' },
      { name: 'claimed', type: 'bool', internalType: 'bool' }
    ],
    stateMutability: 'view'
  },
  {
    type: 'function',
    name: 'withdrawTreasury',
    inputs: [],
    outputs: [],
    stateMutability: 'nonpayable'
  },
  {
    type: 'event',
    name: 'BetPlaced',
    inputs: [
      {
        name: 'epoch',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      },
      { name: 'user', type: 'address', indexed: true, internalType: 'address' },
      { name: 'isUp', type: 'bool', indexed: false, internalType: 'bool' },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Claimed',
    inputs: [
      {
        name: 'epoch',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      },
      { name: 'user', type: 'address', indexed: true, internalType: 'address' },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        name: 'previousOwner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'newOwner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Paused',
    inputs: [
      {
        name: 'account',
        type: 'address',
        indexed: false,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'RoundResolved',
    inputs: [
      {
        name: 'epoch',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      },
      {
        name: 'closePrice',
        type: 'int256',
        indexed: false,
        internalType: 'int256'
      },
      { name: 'upWon', type: 'bool', indexed: false, internalType: 'bool' }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'RoundStarted',
    inputs: [
      {
        name: 'epoch',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256'
      },
      {
        name: 'startTime',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'TreasuryWithdrawn',
    inputs: [
      {
        name: 'owner',
        type: 'address',
        indexed: true,
        internalType: 'address'
      },
      {
        name: 'amount',
        type: 'uint256',
        indexed: false,
        internalType: 'uint256'
      }
    ],
    anonymous: false
  },
  {
    type: 'event',
    name: 'Unpaused',
    inputs: [
      {
        name: 'account',
        type: 'address',
        indexed: false,
        internalType: 'address'
      }
    ],
    anonymous: false
  },
  { type: 'error', name: 'EnforcedPause', inputs: [] },
  { type: 'error', name: 'ExpectedPause', inputs: [] },
  {
    type: 'error',
    name: 'OwnableInvalidOwner',
    inputs: [{ name: 'owner', type: 'address', internalType: 'address' }]
  },
  {
    type: 'error',
    name: 'OwnableUnauthorizedAccount',
    inputs: [{ name: 'account', type: 'address', internalType: 'address' }]
  },
  { type: 'error', name: 'ReentrancyGuardReentrantCall', inputs: [] }
];

export default PRED_ABI;
