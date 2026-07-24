import React from 'react';
import { Header } from '~/components/layout/header';

const MarketingLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative size-full">
      <Header />
      <main className="h-dvh min-h-dvh w-full">{children}</main>
    </div>
  );
};

export default MarketingLayout;
