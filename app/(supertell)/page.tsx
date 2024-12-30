'use client';
import { GameList } from '@/components/game-list';
import { useResponsive } from '@/hooks/useResponsive';


export default function Page() {
  const { isMobile } = useResponsive();

  return (
    <div className={`space-y-6 p-4 md:p-8 overflow-y-scroll h-full max-h-[calc(100vh-100px)] ${isMobile ? 'mt-16' : ''}`}>
      <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-center`}>
      
        <img src="/neoxgrind.png" alt="Description of image" className={`w-23 h-23 ${isMobile ? 'hidden' : ''}`} />
        <div className="ml-4">
          <h2 className={`scroll-m-20 font-bold tracking-tight ${isMobile ? 'text-2xl' : 'text-4xl lg:text-3xl mb-5'}`}>
            SuperTell Price Prediction
          </h2>
          <h1 className={`scroll-m-20 font-extrabold tracking-tight ${isMobile ? 'text-3xl' : 'text-4xl lg:text-5xl'}`}>
            Get precise news and predict the price
          </h1>
        </div>
      </div>
      <div>
        <GameList/>
      </div>
    </div>
  );
}
