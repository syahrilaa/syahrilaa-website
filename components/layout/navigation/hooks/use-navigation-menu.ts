import { useCallback, useLayoutEffect, useRef } from 'react';
import { useNavigationIndicator } from './use-navigation-indicator';
import type { ItemRefCallback, ItemRefs, UseNavigationMenu } from '../types';

type UseNavigationMenuFunction = (key?: string) => UseNavigationMenu;

export const useNavigationMenu: UseNavigationMenuFunction = activeKeyPathname => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<ItemRefs>(new Map<string, HTMLLIElement>());
  const itemRefCallbacks = useRef(new Map<string, ItemRefCallback>());
  const activeKeyRef = useRef<string | undefined>(activeKeyPathname);
  const previewKeyRef = useRef<string | undefined>(undefined);

  const { indicatorStyles, updateIndicatorStyles } = useNavigationIndicator({
    activeKeyRef,
    itemRefs,
    listRef,
    previewKeyRef,
  });

  const getItemRef = useCallback(
    (key: string) => {
      const cachedCallback = itemRefCallbacks.current.get(key);

      if (cachedCallback) return cachedCallback;

      const refCallback = (element: HTMLLIElement | null) => {
        if (element) {
          itemRefs.current.set(key, element);
        } else {
          itemRefs.current.delete(key);
        }

        if (previewKeyRef.current === key) {
          updateIndicatorStyles(key, false);
        } else if (activeKeyRef.current === key && !previewKeyRef.current) {
          updateIndicatorStyles(key, false);
        }
      };

      itemRefCallbacks.current.set(key, refCallback);
      return refCallback;
    },
    [updateIndicatorStyles]
  );

  const moveIndicatorToItem = useCallback(
    (key: string) => {
      const isHoveringInNav = Boolean(previewKeyRef.current);
      const shouldAnimate = isHoveringInNav;

      previewKeyRef.current = key;
      updateIndicatorStyles(key, shouldAnimate);
    },
    [updateIndicatorStyles]
  );

  const resetIndicatorToActiveItem = useCallback(() => {
    previewKeyRef.current = undefined;
    updateIndicatorStyles(activeKeyRef.current, true);
  }, [updateIndicatorStyles]);

  useLayoutEffect(() => {
    activeKeyRef.current = activeKeyPathname;
    updateIndicatorStyles(activeKeyPathname, false);

    const listElement = listRef.current;
    if (!listElement) return;

    const handleResize = () => {
      updateIndicatorStyles(previewKeyRef.current || activeKeyRef.current, false);
    };
    const animationFrame = window.requestAnimationFrame(handleResize);
    const resizeObserver = new ResizeObserver(handleResize);

    resizeObserver.observe(listElement);
    itemRefs.current.forEach(itemElement => resizeObserver.observe(itemElement));
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [activeKeyPathname, updateIndicatorStyles]);

  return {
    indicatorStyles,
    getItemRef,
    listRef,
    moveIndicatorToItem,
    resetIndicatorToActiveItem,
  };
};
