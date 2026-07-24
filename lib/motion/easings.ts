import type { Easing } from 'motion';

export type EasingKeys = 'STANDARD' | 'ACCELERATE' | 'DECELERATE' | 'EMPHASIZE' | 'SMOOTH' | 'SNAP';

export const MOTION_EASINGS: Record<EasingKeys, Easing | Easing[]> = {
  STANDARD: [0.2, 0, 0, 1],
  ACCELERATE: [0.3, 0, 1, 1],
  DECELERATE: [0, 0, 0, 1],
  EMPHASIZE: [0.2, 0, 0, 1],
  SMOOTH: [0.16, 1, 0.3, 1],
  SNAP: [0.34, 1.56, 0.64, 1],
} as const;
