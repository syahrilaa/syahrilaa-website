import React from 'react';
import { HeaderDockWrapper } from './header-dock-wrapper';
import { NavigationMenu } from './navigation/navigation-menu';

export const Header = (): React.JSX.Element => {
  return (
    <header className="header-wrapper fixed inset-x-0 top-0 w-full bg-linear-to-b from-surface/65 to-transparent backdrop-blur-xs">
      <div className="header-wrapper-inline relative mx-auto w-full max-w-7xl md:px-6">
        <div className="min-h-max w-full pt-4">
          <div className="z-50 flex items-center justify-center">
            <HeaderDockWrapper className="flex items-center justify-center">
              <NavigationMenu />
            </HeaderDockWrapper>
          </div>
        </div>
      </div>
    </header>
  );
};
