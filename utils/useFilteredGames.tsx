import { useReadContract } from 'wagmi';
import PRED_ABI from '@/abi/INEOPRE.abi';

const NEO_CONTRACT_ADDRESS = '0x45c2B0Eff2b489623C7e55083BE991f26b541B70';

export const useFilteredGames = () => {
  const { allGames }: any = useReadContract({
    address: NEO_CONTRACT_ADDRESS,
    abi: PRED_ABI,
    functionName: 'getCurrentRound'
  });

  console.log(allGames);

  return { allGames };
};
