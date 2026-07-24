import * as Primitive from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import React from 'react';
import { tv } from 'tailwind-variants';
import type { MenuRoute } from '~/config/menu-routes';

interface NavigationMenuItemProps extends MenuRoute {
  isActive?: boolean;
  onFocus?: React.FocusEventHandler<React.ComponentRef<typeof Primitive.NavigationMenuItem>>;
  onPointerEnter?: React.PointerEventHandler<React.ComponentRef<typeof Primitive.NavigationMenuItem>>;
}

const classes = tv({
  base: 'nav-item',
  variants: {
    cta: {
      true: 'item-cta',
      false: undefined,
    },
  },
});

export const NavigationMenuItem = React.forwardRef<
  React.ComponentRef<typeof Primitive.NavigationMenuItem>,
  NavigationMenuItemProps
>(({ isActive = false, cta = false, onFocus, onPointerEnter, title, pathname }, ref) => {
  return (
    <Primitive.NavigationMenuItem
      ref={ref}
      className={classes({ cta })}
      data-active={isActive ? true : undefined}
      data-cta={cta ? true : undefined}
      onFocus={onFocus}
      onPointerEnter={onPointerEnter}
    >
      <Primitive.NavigationMenuLink asChild active={isActive} className="item-link">
        <Link href={pathname} className="flex items-center justify-center gap-2.5">
          {title}
        </Link>
      </Primitive.NavigationMenuLink>
    </Primitive.NavigationMenuItem>
  );
});

NavigationMenuItem.displayName = 'NavigationMenuItem';
