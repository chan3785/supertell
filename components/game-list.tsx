import { GameItem } from './game-item';
import { useFilteredGames } from '@/utils/useFilteredGames';

export const GameList = () => {
  const { allGames } = useFilteredGames();
  if (!allGames) {
    return <></>;
  }
  const games = allGames;

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-3">
      <GameItem key={games?.epoch} game={games} />
    </div>
  );
};
