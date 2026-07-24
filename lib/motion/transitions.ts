import { MOTION_DURATIONS } from './durations';
import { MOTION_EASINGS } from './easings';
import type { Transition } from 'motion/react';

export type TransitionKeys =
  | 'INSTANT'
  | 'FADE'
  | 'SMOOTH'
  | 'GENTLE'
  | 'SPRING'
  | 'SMOOTH_SPRING'
  | 'SUPER_SMOOTH'
  | 'SNAPPY'
  | 'RESPONSIVE'
  | 'BOUNCE'
  | 'ELASTIC'
  | 'LAYOUT';

export const MOTION_TRANSITIONS: Record<TransitionKeys, Transition> = {
  INSTANT: {
    duration: MOTION_DURATIONS.INSTANT,
  },
  FADE: {
    duration: MOTION_DURATIONS.FAST,
  },
  SMOOTH: {
    duration: MOTION_DURATIONS.NORMAL,
    ease: MOTION_EASINGS.SMOOTH,
  },
  GENTLE: {
    type: 'spring',
    stiffness: 180,
    damping: 24,
    mass: 1,
  },
  SPRING: {
    type: 'spring',
    stiffness: 260,
    damping: 24,
    mass: 1,
  },
  SMOOTH_SPRING: {
    type: 'spring',
    stiffness: 180,
    damping: 26,
    mass: 1.2,
  },
  SUPER_SMOOTH: {
    type: 'spring',
    stiffness: 120,
    damping: 30,
    mass: 1.5,
  },
  SNAPPY: {
    type: 'spring',
    stiffness: 520,
    damping: 30,
    mass: 0.8,
  },
  RESPONSIVE: {
    type: 'spring',
    stiffness: 700,
    damping: 38,
  },
  BOUNCE: {
    type: 'spring',
    stiffness: 380,
    damping: 16,
  },
  ELASTIC: {
    type: 'spring',
    stiffness: 260,
    damping: 10,
  },
  LAYOUT: {
    type: 'spring',
    stiffness: 400,
    damping: 36,
  },
} as const;
