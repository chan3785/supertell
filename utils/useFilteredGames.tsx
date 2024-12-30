'use client';

import { useReadContract } from 'wagmi';
import PRED_ABI from '@/abi/INEOPRE.abi';
import { wagmiContractConfig } from '@/lib/contracts';

export const useFilteredGames = () => {
  const { data: allGames }: any = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getCurrentRound'
  });

  console.log(allGames);

  return { allGames };
};
