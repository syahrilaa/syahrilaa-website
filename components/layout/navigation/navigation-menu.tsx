'use client';
import * as Primitive from '@radix-ui/react-navigation-menu';
import { usePathname } from 'next/navigation';
import React from 'react';
import { routes } from '~/config/menu-routes';
import { useNavigationMenu } from './hooks/use-navigation-menu';
import { NavigationMenuIndicator } from './navigation-menu-indicator';
import { NavigationMenuItem } from './navigation-menu-item';
import type { MenuRoute } from '~/config/menu-routes';

const isActiveRoute = (pathname: string, routePathname: string) => {
  if (routePathname === '/') return pathname === routePathname;
  return pathname === routePathname || pathname.startsWith(`${routePathname}/`);
};

const getActivePathname = (pathname: string, routes: MenuRoute[]) => {
  const activeRoute = routes.find(menu => isActiveRoute(pathname, menu.pathname));
  if (typeof activeRoute !== 'undefined') return activeRoute.pathname;
};

export const NavigationMenu: React.FC = () => {
  const pathname = usePathname();
  const filteredRoutes = routes.filter(item => !item.disabled);
  const activePathname = getActivePathname(pathname, filteredRoutes);
  const { indicatorStyles, getItemRef, listRef, moveIndicatorToItem, resetIndicatorToActiveItem } =
    useNavigationMenu(activePathname);

  return (
    <Primitive.NavigationMenu className="relative z-10">
      <Primitive.NavigationMenuList
        ref={listRef}
        className="nav-list"
        onBlur={event => {
          const nextFocusedElement = event.relatedTarget as Node | null;
          if (!event.currentTarget.contains(nextFocusedElement)) {
            resetIndicatorToActiveItem();
          }
        }}
        onPointerLeave={resetIndicatorToActiveItem}
      >
        {filteredRoutes.map(menu => {
          const isActive = menu.pathname === activePathname;
          return (
            <NavigationMenuItem
              key={menu.pathname}
              ref={menu.cta ? undefined : getItemRef(menu.pathname)}
              isActive={isActive}
              cta={menu.cta}
              onFocus={() => {
                if (!menu.cta) moveIndicatorToItem(menu.pathname);
              }}
              onPointerEnter={() => {
                if (menu.cta) {
                  resetIndicatorToActiveItem();
                } else {
                  moveIndicatorToItem(menu.pathname);
                }
              }}
              {...menu}
            />
          );
        })}
      </Primitive.NavigationMenuList>
      <NavigationMenuIndicator
        isVisible={indicatorStyles.isReady}
        left={indicatorStyles.left}
        animated={indicatorStyles.animated}
        width={indicatorStyles.width}
      />
    </Primitive.NavigationMenu>
  );
};
