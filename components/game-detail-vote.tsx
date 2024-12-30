'use client';

import { Label } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartConfig } from '@/components/ui/chart';
import { useReadContract, useWriteContract } from 'wagmi';
import PRED_ABI from '@/abi/INEOPRE.abi';
import TOKEN_ABI from '@/abi/ERC20.abi';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import Image from 'next/image';
import { tokenInfos } from '@/constants';
import { ComboboxDemo } from './command';
import { ethers } from 'ethers';
import { wagmiContractConfig } from '@/lib/contracts';

export function GameDetailVote() {
  const NEO_CONTRACT_ADDRESS = '0x7eB9c6631E539CCcd4f51eFb051f631797087B19';
  const searchParams = useSearchParams();
  const key = searchParams ? searchParams.get('key') : null;
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);
  const [startPrice, setStartPrice] = useState<number | null>(null);
  const [betUp, setBetUp] = useState<boolean | null>(null); // Up/Down 선택 상태
  const [amount, setAmount] = useState(''); // Input 필드에 입력된 숫자

  const { data: game }: any = useReadContract({
    ...wagmiContractConfig,
    functionName: 'getCurrentRound'
  });

  useEffect(() => {
    console.log('get current round', game);
    if (game) {
      let valueStr = game.startPrice.toString();

      // 2. 정수부와 소수부 분리
      let slicePart = valueStr.slice(0, 6) || '0';
      const startPrice = Number(slicePart);
      console.log('price', slicePart, Number(game.startPrice), game.startPrice);

      setStartPrice(startPrice);
      const initialPriceChange = (Math.random() * 3 - 1) * 0.000001;
      const initialPrice = Math.max(startPrice * (1 + initialPriceChange), 0);
      setCurrentPrice(initialPrice);

      const intervalId = setInterval(() => {
        const priceChange = (Math.random() * 3 - 1) * 0.00001;
        const newPrice = Math.max(startPrice * (1 + priceChange), 0);
        setCurrentPrice(newPrice);
      }, 10000);

      return () => clearInterval(intervalId);
    }
  }, [game]);

  const { writeContract } = useWriteContract();

  const BetUp = async () => {
    try {
      writeContract({
        ...wagmiContractConfig,
        functionName: 'betUp'
      });
    } catch (error) {
      console.error('Transaction failed', error);
    }
  };

  const BetDown = async () => {
    try {
      writeContract({
        ...wagmiContractConfig,
        functionName: 'betDown'
      });
    } catch (error) {
      console.error('Transaction failed', error);
    }
  };

  if (!game) {
    console.log('undefined');
    return <></>;
  }
  const tokenInfo = tokenInfos.find(
    (item) => item.address == '0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43'
  );

  const upAmount = game.totalUpAmount ? BigInt(game.totalUpAmount) : BigInt(0);
  const downAmount = game.totalDownAmount
    ? BigInt(game.totalDownAmount)
    : BigInt(0);
  const totalPoolAmount = upAmount + downAmount;

  const chartConfig: ChartConfig = {
    up: {
      label: 'Up',
      color: '#00A29A'
    },
    down: {
      label: 'Down',
      color: '#C73535'
    }
  };

  const chartData = [
    {
      name: 'Votes',
      up: Number(upAmount) / 10 ** 18,
      down: Number(downAmount) / 10 ** 18
    }
  ];

  const endDate = Number(game.closeTime) * 1000;
  const timeRemaining = endDate - Date.now();
  const oneDayInMs = 24 * 60 * 60 * 1000;

  const renderStatusButtons = () => {
    const buttons = [];

    if (game.resolved) {
      buttons.push(
        <div
          key="end"
          className="flex h-[22px] items-center justify-center rounded-full bg-[#575757] px-4 text-[10px] font-normal text-white"
        >
          End
        </div>
      );
    } else {
      buttons.push(
        <div
          key="live"
          className="flex h-[22px] items-center justify-center rounded-full bg-[#00A29A] px-4 text-[10px] font-normal text-white"
        >
          Live
        </div>
      );

      if (timeRemaining < oneDayInMs) {
        buttons.push(
          <div
            key="end-soon"
            className="flex h-[22px] items-center justify-center rounded-full bg-[#C73535] px-4 text-[10px] font-normal text-white"
          >
            End Soon
          </div>
        );
      }
    }

    return buttons;
  };

  return (
    <Card className="mx-auto grid w-full max-w-sm gap-8 border-none text-black">
      <CardHeader className="max-h-auto mx-auto w-full max-w-sm rounded-xl bg-white p-6 text-black">
        <CardTitle className="flex gap-2">
          <div className="text-lg">Pool status</div>
          <div className="flex items-center space-x-2">
            {renderStatusButtons()}
          </div>
        </CardTitle>
        <div className="flex justify-between">
          <div className="flex-colgap-2 mb-2 flex">
            <div className="flex-col">
              <div
                className="relative flex flex-row gap-1"
                style={{ width: '20px' }}
              >
                <Image
                  src={tokenInfo?.image ?? '/logo.png'}
                  alt="Logo"
                  width={30}
                  height={30}
                  layout="intrinsic"
                />
                <span className=" text-sm font-bold text-black">
                  {tokenInfo?.name ?? 'Token Name'}
                </span>
              </div>
              <div className="mr-3 text-3xl font-bold">
                $ {currentPrice ? `${currentPrice.toFixed(2)}` : 'Loading...'}
              </div>

              <div className="flex items-center">
                {currentPrice !== null && startPrice !== null ? (
                  <div className="flex items-center">
                    {Number(currentPrice) > startPrice ? (
                      <div className="flex items-center text-green-600">
                        <FaArrowUp className="mr-1" />
                        {Number(
                          ((currentPrice - startPrice) / startPrice) * 100
                        ).toFixed(2)}
                        %
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <FaArrowDown className="mr-1" />
                        {Number(
                          ((startPrice - currentPrice) / startPrice) * 100
                        ).toFixed(2)}
                        %
                      </div>
                    )}
                  </div>
                ) : (
                  <div>Price data not available</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className=" text-end font-bold">
              Started: ${' '}
              {startPrice ? `${startPrice?.toFixed(2)}` : 'Loading...'}
            </div>
            <div className=" text-end text-xs">
              <div>Total Pool Amount:</div>
              <div>{Number(totalPoolAmount) / 10 ** 18} GAS</div>
            </div>
          </div>
        </div>
        {totalPoolAmount === BigInt(0) ? (
          <div className="text-center text-gray-500">Be the first party!</div>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={36}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 20, bottom: 0 }}
              >
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" hide />
                <Tooltip cursor={false} />
                <Bar
                  dataKey="up"
                  stackId="a"
                  fill={chartConfig.up.color}
                  barSize={20}
                  radius={[10, 0, 0, 10]}
                />
                <Bar
                  dataKey="down"
                  stackId="a"
                  fill={chartConfig.down.color}
                  barSize={20}
                  radius={[0, 10, 10, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
            {totalPoolAmount > 0 && (
              <div className="mt-2 flex justify-between text-lg">
                <div className="flex items-baseline gap-1">
                  <span className="self-baseline text-[14px] font-bold text-black">
                    Up
                  </span>
                  <span className="text-[28px] font-bold">
                    {(
                      (Number(upAmount) / Number(totalPoolAmount)) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="self-baseline text-[14px] font-bold text-black">
                    Down
                  </span>
                  <span className="text-[28px] font-bold">
                    {(
                      (Number(downAmount) / Number(totalPoolAmount)) *
                      100
                    ).toFixed(0)}
                    %
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </CardHeader>

      <CardContent className="max-h-auto mx-auto flex w-full max-w-sm flex-col gap-5 rounded-xl bg-white p-6 text-black">
        <div className="flex flex-row justify-between">
          <div>
            <div className="flex items-center text-2xl font-bold">Predict</div>
            <div className="text-sm font-bold">Ended Price would be...</div>
          </div>
        </div>

        <div className="grid grid-cols-2">
          <div className="grid items-center justify-center gap-2 text-center">
            <Label>Up</Label>
            <img
              src="/ButtonUp.png"
              alt="Vote Up"
              className="w-200 h-110 cursor-pointer object-contain transition-transform duration-75 active:scale-95 active:opacity-75"
              onClick={() => BetUp()}
            />
          </div>
          <div className="grid items-center justify-center gap-2 text-center">
            <Label>Down</Label>
            <img
              src="/ButtonDown.png"
              alt="Vote Down"
              className="w-200 h-100 cursor-pointer object-contain transition-transform duration-75 active:scale-95 active:opacity-75"
              onClick={() => BetDown()}
            />
          </div>
        </div>
        <div className="mr-3 flex items-center justify-end">
          <Image
            src="https://assets.coingecko.com/coins/images/858/standard/GAS_512_512.png?1696501992"
            alt="Logo"
            width={25}
            height={25}
            className="mr-0"
          />
          <span className=" text-xl font-bold text-black">GAS</span>
        </div>
      </CardContent>
      <button
        className="text-bold rounded bg-white"
        onClick={() => {
          if (currentPrice !== null) {
            writeContract({
              abi: PRED_ABI,
              address: NEO_CONTRACT_ADDRESS,
              functionName: 'endGame',
              args: [game.gameId]
            });
          } else {
            console.log('Current price is not available yet');
          }
        }}
      >
        End game (DEMO)
      </button>
    </Card>
  );
}
