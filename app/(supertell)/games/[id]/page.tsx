'use client';

import { useState, useEffect } from 'react';
import { GameDetail } from '@/components/game-detail';
import { GameDetailComment } from '@/components/game-detail-comment';
import { GameDetailVote } from '@/components/game-detail-vote';
import { Badge } from '@/components/ui/badge';
import { useReadContract } from 'wagmi';
import { Breadcrumbs } from '@/components/breadcrumbs';
import PRED_ABI from '@/abi/INEOPRE.abi';
import { useSearchParams } from 'next/navigation';
import { tokenInfos } from '@/constants';
import { Card, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function Page() {
  const [gameTitle, setGameTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [timeLeft, setTimeLeft] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [duration, setDuration] = useState('');
  const NEO_CONTRACT_ADDRESS = '0x45c2B0Eff2b489623C7e55083BE991f26b541B70';
  const searchParams = useSearchParams();
  const key = searchParams ? searchParams.get('key') : null;

  const { data: game }: any = useReadContract({
    address: NEO_CONTRACT_ADDRESS,
    abi: PRED_ABI,
    functionName: 'getGame',
    args: [key]
  });

  useEffect(() => {
    if (game) {
      const milliseconds = Number(game.startTime);
      const date = new Date(milliseconds);
      const year = date.getFullYear() + 50;
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}.${month}.${day}`;
      setEventDate(formattedDate);
      const tokenInfo = tokenInfos.find(
        (item) => item.address === '0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43'
      );

      setTokenName(tokenInfo?.name ?? 'Token Name');
      setDuration(game.duration);
      const updateTimer = () => {
        const endDate = Number(eventDate);
        const now = Date.now();
        const timeDiff = endDate - now;

        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

          const timeString =
            days > 0
              ? `${days}D ${hours.toString().padStart(2, '0')}:${minutes
                  .toString()
                  .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
              : `${hours.toString().padStart(2, '0')}:${minutes
                  .toString()
                  .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

          setTimeLeft('Ends in ' + timeString);
        } else {
          setTimeLeft('Betting Ended');
        }
      };

      const timerInterval = setInterval(updateTimer, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [game]);

  return (
    <div className="mt-0 max-h-screen space-y-6 overflow-y-auto p-4 md:p-8">
      <Breadcrumbs
        className="mb-4"
        linkHref="/"
        linkTitle="Games"
        pageName={tokenName + ' / USD'}
      />
      <div className="flex w-4/6 justify-between">
        <h1 className="mb-5 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
          Will {tokenName ?? 'Token Name'} / USD go UP or DOWN in{' '}
          {Number(duration) / 60} mins?
        </h1>
      </div>

      <div className="flex justify-between">
        <div className="flex h-full w-2/3 space-x-2">
          <div className="h-full w-full space-y-5 overflow-y-auto pr-2">
            <div className="flex space-x-6">
              <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
                {tokenName} / USD
              </Badge>
              <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
                {!game?.isEnded ? `${timeLeft}` : 'End'}
              </Badge>
              <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
                {game?.category || 'Loading...'}
              </Badge>
            </div>
            <GameDetail />
            <GameDetailComment />
          </div>
        </div>
        <div className="h-full w-1/3 space-y-4 overflow-y-auto pl-2">
          <GameDetailVote />
        </div>
      </div>
    </div>
  );
}
