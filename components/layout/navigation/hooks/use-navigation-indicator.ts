import { useCallback, useState } from 'react';
import type { IndicatorProps, IndicatorMeasurement, ItemRefs } from '../types';
import type { RefObject } from 'react';

interface UseNavigationIndicatorOptions {
  activeKeyRef: RefObject<string | undefined>;
  itemRefs: RefObject<ItemRefs>;
  listRef: RefObject<HTMLUListElement | null>;
  previewKeyRef: RefObject<string | undefined>;
}

export const defaultIndicatorProps: IndicatorProps = {
  isReady: false,
  left: 0,
  animated: false,
  width: 0,
};

export const useNavigationIndicator = ({
  activeKeyRef,
  itemRefs,
  listRef,
  previewKeyRef,
}: UseNavigationIndicatorOptions) => {
  const [indicatorStyles, setIndicatorStyles] = useState<IndicatorProps>(defaultIndicatorProps);

  const getMeasuredIndicatorStyles = useCallback(
    (targetKey?: string): IndicatorMeasurement | undefined => {
      const listElement = listRef.current;
      const targetItemElement = targetKey ? itemRefs.current.get(targetKey) : undefined;

      if (!listElement || !targetItemElement) {
        return;
      }

      const listRect = listElement.getBoundingClientRect();
      const targetItemRect = targetItemElement.getBoundingClientRect();

      return {
        isReady: true,
        left: targetItemRect.left - listRect.left + targetItemRect.width / 2,
        width: targetItemRect.width,
      };
    },
    [itemRefs, listRef]
  );

  const updateIndicatorStyles = useCallback(
    (targetKey = previewKeyRef.current || activeKeyRef.current, animated = true) => {
      const measuredStyles = getMeasuredIndicatorStyles(targetKey);

      if (!measuredStyles) {
        setIndicatorStyles(defaultIndicatorProps);
        return;
      }

      setIndicatorStyles(() => ({
        ...measuredStyles,
        animated,
      }));
    },
    [activeKeyRef, getMeasuredIndicatorStyles, previewKeyRef]
  );

  return {
    indicatorStyles,
    updateIndicatorStyles,
  };
};
