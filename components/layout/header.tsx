'use client';
import Link from 'next/link';
import { Account } from '../account';
import { Button } from '../ui/button';
import { useResponsive } from '@/hooks/useResponsive';

export default function Header() {
  const { isMobile } = useResponsive();

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className={`ml-20 mr-20 flex items-center px-4 ${isMobile ? 'flex-col h-75 justify-center' : 'flex-row h-20  justify-between'}`}>
        <div className={`flex items-center ${isMobile ? 'space-y-1 flex-col justify-center' : 'space-x-4 flex-row'}`}>
          <Link href={'/'}>
            <Button className={`w-${isMobile ? '[50px]' : '[50px]'} ml-7 h-${isMobile ? '[30px]' : '[15px]'} font-bold`} variant="ghost">
              SuperTell
            </Button>
          </Link>
          <Link href={'/'}>
            <Button className={`w-${isMobile ? '[20px]' : '[30px]'} ml-7 h-${isMobile ? '[6px]' : '[8px]'} font-semibold ${isMobile ? 'hidden' : 'block'}`} variant="ghost">
              Price Prediction
            </Button>
          </Link>
          <Link href={'/charge'}>
            <Button className={`w-${isMobile ? '[20px]' : '[30px]'} ml-7 h-${isMobile ? '[6px]' : '[8px]'} font-semibold ${isMobile ? 'hidden' : 'block'}`} variant="ghost">
              Charge
            </Button>
          </Link>
          <Link href={'/game-info'}>
            <Button className={`w-${isMobile ? '[20px]' : '[30px]'} ml-7 h-${isMobile ? '[6px]' : '[8px]'} font-semibold ${isMobile ? 'hidden' : 'block'}`} variant="ghost">
              Game info
            </Button>
          </Link>
          <Link href={'/create-bet'}>
            <Button className={`w-${isMobile ? '[20px]' : '[30px]'} ml-7 h-${isMobile ? '[6px]' : '[8px]'} ${isMobile ? 'mb-[4px]' : ''} bg-[rgb(105,227,169)] font-semibold`}>
              Create Game
            </Button>
          </Link>
        </div>
        <div className={`flex items-center gap-2 ${isMobile ? 'mb-[4px] justify-center' : ''}`}>
          <Account />
        </div>
      </nav>
    </div>
  );
}
