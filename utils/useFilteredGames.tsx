import { useReadContract } from 'wagmi';
import PRED_ABI from '@/abi/INEOPRE.abi';

const ETHENA_FACTORY_ADDRESS = '0xFa273F31D51DD752f9893024C0A88a792CB5d093';

export const useFilteredGames = () => {
  const { data: allGames }: any = useReadContract({
    address: ETHENA_FACTORY_ADDRESS,
    abi: PRED_ABI,
    functionName: 'getGameList'
  });

  console.log(allGames)

  const filteredGames = allGames?.filter((game: any) => game?.gameId !== BigInt(0));


  return { filteredGames };
};
