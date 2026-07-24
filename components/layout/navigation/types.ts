import type { RefObject } from 'react';

export interface IndicatorProps {
  isReady: boolean;
  left: number;
  animated: boolean;
  width: number;
}

export type IndicatorMeasurement = Omit<IndicatorProps, 'animated'>;
export type ItemRefs = Map<string, HTMLLIElement>;
export type ItemRefCallback = (element: HTMLLIElement | null) => void;

export interface UseNavigationMenu {
  indicatorStyles: IndicatorProps;
  getItemRef: (key: string) => ItemRefCallback;
  listRef: RefObject<HTMLUListElement | null>;
  moveIndicatorToItem: (key: string) => void;
  resetIndicatorToActiveItem: () => void;
}
