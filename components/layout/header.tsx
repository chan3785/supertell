'use client';
import Link from 'next/link';
import { Account } from '../account';
import { Button } from '../ui/button';
import { useResponsive } from '@/hooks/useResponsive';

export default function Header() {
  const { isMobile } = useResponsive();

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className={`ml-20 mr-20 flex items-center justify-between px-4 ${isMobile ? 'flex-col h-75' : 'flex-row h-20'}`}>
        <div className={`flex items-center ${isMobile ? 'space-y-2 flex-col' : 'space-x-4 flex-row'}`}>
          <Link href={'/'}>
            <Button className={`w-${isMobile ? '[30px]' : '[50px]'} ml-7 h-${isMobile ? '[10px]' : '[15px]'} font-bold`} variant="ghost">
              SuperTell
            </Button>
          </Link>
          <Link href={'/'}>
            <Button className={`w-${isMobile ? '[20px]' : '[30px]'} ml-7 h-${isMobile ? '[6px]' : '[8px]'} font-semibold`} variant="ghost">
              Price Prediction
            </Button>
          </Link>
          <Link href={'/charge'}>
            <Button className={`w-${isMobile ? '[20px]' : '[30px]'} ml-7 h-${isMobile ? '[6px]' : '[8px]'} font-semibold`} variant="ghost">
              Charge
            </Button>
          </Link>
          <Link href={'/game-info'}>
            <Button className={`w-${isMobile ? '[20px]' : '[30px]'} ml-7 h-${isMobile ? '[6px]' : '[8px]'} font-semibold`} variant="ghost">
              Game info
            </Button>
          </Link>
          <Link href={'/create-bet'}>
            <Button className={`w-${isMobile ? '[20px]' : '[30px]'} ml-7 h-${isMobile ? '[6px]' : '[8px]'} bg-[rgb(105,227,169)] font-semibold`}>
              Create Game
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <Account />
        </div>
      </nav>
    </div>
  );
}
