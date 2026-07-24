export type DurationKeys = 'INSTANT' | 'FASTEST' | 'FASTER' | 'FAST' | 'NORMAL' | 'SLOW' | 'SLOWER' | 'SLOWEST';

export const MOTION_DURATIONS: Record<DurationKeys, number> = {
  INSTANT: 0,
  FASTEST: 0.08,
  FASTER: 0.12,
  FAST: 0.18,
  NORMAL: 0.24,
  SLOW: 0.32,
  SLOWER: 0.44,
  SLOWEST: 0.56,
} as const;
