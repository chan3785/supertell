'use client';
import { GameItem } from './game-item';
import { useFilteredGames } from '@/utils/useFilteredGames';

export const GameList = () => {
  const { allGames } = useFilteredGames();

  if (!allGames) {
    return <></>;
  }

  return (
    <div className="grid w-full grid-cols-1 md:grid-cols-3">
      {allGames &&
        allGames.map((game: any) => {
          return <GameItem key={game?.gameId} game={game} />;
        })}
    </div>
  );
};
