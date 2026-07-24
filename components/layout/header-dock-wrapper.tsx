'use client';
import { Slot } from '@radix-ui/react-slot';
import React from 'react';
import { cn } from 'tailwind-variants';

interface HeaderDockWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const HeaderDockWrapper: React.FC<HeaderDockWrapperProps> = ({ className, children, asChild, ...props }) => {
  const Comp = asChild ? Slot : 'div';
  return (
    <Comp className={cn('header-dock-wrapper', className)} {...props}>
      {children}
    </Comp>
  );
};
