import React, { createContext, useContext, useEffect, useState } from 'react';

interface ScreenSizeContextProps {
    isMobile: boolean;
}

const ScreenSizeContext = createContext<ScreenSizeContextProps | undefined>(undefined);

export const ScreenSizeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <ScreenSizeContext.Provider value={{ isMobile }}>
            {children}
        </ScreenSizeContext.Provider>
    );
};

export const useScreenSize = (): ScreenSizeContextProps => {
    const context = useContext(ScreenSizeContext);
    if (!context) {
        throw new Error('useScreenSize must be used within a ScreenSizeProvider');
    }
    return context;
};