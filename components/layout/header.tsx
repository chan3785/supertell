'use client';
import Link from 'next/link';
import { Account } from '../account';
import { Button } from '../ui/button';
import { useResponsive } from '@/hooks/useResponsive';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from 'react';

export default function Header() {
  const { isMobile } = useResponsive();
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className={`ml-20 mr-20 flex items-center px-4 ${isMobile ? 'flex-col h-30 justify-center' : 'flex-row h-20  justify-between'}`}>
        <div className={`flex items-center ${isMobile ? 'space-y-1 flex-col justify-center' : 'space-x-4 flex-row'}`}>
        {showPopup && (
  <AlertDialog open={showPopup} onOpenChange={setShowPopup}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>This product is Beta</AlertDialogTitle>
        <AlertDialogDescription>
          The project is in testing phase and is yet to be audited. 
          Any losses incurred due to my actions are my own responsibility. <br/> 
          I am participating at my own risk.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => setShowPopup(false)}>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
)}
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
          <Link href={'/game-info'}>
            <Button className={`w-${isMobile ? '[20px]' : '[30px]'} ml-7 h-${isMobile ? '[6px]' : '[8px]'} font-semibold ${isMobile ? 'hidden' : 'block'}`} variant="ghost">
              Game info
            </Button>
          </Link>
        </div>
        <div className={`flex items-center gap-2 ${isMobile ? 'mb-[6px] justify-center' : ''}`}>
          <Account />
        </div>
      </nav>
    </div>
  );
}
