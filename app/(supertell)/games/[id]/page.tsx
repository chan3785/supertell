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
import { wagmiContractConfig } from '@/lib/contracts';

export default function Page() {
  const [gameTitle, setGameTitle] = useState('');
  const [eventDate, setEventDate] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState('');

  const { data: game }: any = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getCurrentRound'
  });

  useEffect(() => {
    if (game) {
      const milliseconds = Number(game.closeTime) * 10 ** 3;
      setEventDate(milliseconds);
      console.log(milliseconds);
    }
  }, [game]);

  useEffect(() => {
    if (eventDate) {
      const updateTimer = () => {
        const now = Date.now();
        const timeDiff = eventDate - now;

        if (timeDiff > 0) {
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
          const timeString = `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

          setTimeLeft(timeString);
        } else {
          setTimeLeft('Betting Ended');
        }
      };

      const timerInterval = setInterval(updateTimer, 1000);

      return () => clearInterval(timerInterval);
    }
  }, [eventDate]);

  return (
    <div className="mt-0 max-h-screen space-y-6 overflow-y-auto p-4 md:p-8">
      <Breadcrumbs
        className="mb-4"
        linkHref="/"
        linkTitle="Games"
        pageName={'BTC' + ' / USD'}
      />
      <div className="flex w-4/6 justify-between">
        <h1 className="mb-5 scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
          Will BTC / USD go UP or DOWN in 24 hours
        </h1>
      </div>

      <div className="flex justify-between">
        <div className="flex h-full w-2/3 space-x-2">
          <div className="h-full w-full space-y-5 overflow-y-auto pr-2">
            <div className="flex space-x-6">
              <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
                BTC / USD
              </Badge>
              <Badge className="text-F7F8F8 rounded-3xl bg-[#575757] p-1.5 px-5 text-xs">
                {`${timeLeft}`}
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
