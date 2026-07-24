'use client';
import { motion } from 'motion/react';
import React, { useMemo } from 'react';
import { cn } from 'tailwind-variants';
import { MOTION_TRANSITIONS } from '~/lib/motion/transitions';
import type { IndicatorProps } from './types';
import type { HTMLMotionProps, Transition } from 'motion/react';

interface NavigationMenuIndicatorProps extends HTMLMotionProps<'span'>, Omit<IndicatorProps, 'isReady'> {
  isVisible?: boolean;
}

export const NavigationMenuIndicator = React.forwardRef<HTMLSpanElement, NavigationMenuIndicatorProps>(
  ({ className, isVisible = true, animated = true, width = 32, left = 0, ...props }, ref) => {
    const transition = useMemo<Transition>(() => {
      if (animated) {
        return {
          ...MOTION_TRANSITIONS.SMOOTH,
          opacity: MOTION_TRANSITIONS.SMOOTH,
          width: MOTION_TRANSITIONS.SPRING,
        };
      }

      return {
        left: MOTION_TRANSITIONS.INSTANT,
        opacity: MOTION_TRANSITIONS.SMOOTH,
        width: MOTION_TRANSITIONS.INSTANT,
      };
    }, [animated]);
    return (
      <motion.span
        ref={ref}
        animate={{
          left,
          opacity: isVisible ? 1 : 0,
          top: 0,
          width,
        }}
        className={cn('nav-indicator', className)}
        initial={false}
        transition={transition}
        data-animated={animated}
        {...props}
      />
    );
  }
);

NavigationMenuIndicator.displayName = 'NavigationMenuIndicator';
