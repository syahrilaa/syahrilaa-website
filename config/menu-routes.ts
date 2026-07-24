import { PhoneIcon } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type React from 'react';

export interface MenuRoute {
  title: string;
  pathname: string;

  description?: string;
  icon?: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;

  cta?: true;
  disabled?: boolean;
}

export type Routes = MenuRoute[];

export const routes: Routes = [
  {
    title: 'Home',
    pathname: '/',
  },
  {
    title: 'About',
    pathname: '/about',
  },
  {
    title: 'Work',
    pathname: '/projects',
  },
  {
    title: 'Blog',
    pathname: '/blog',
  },
  {
    title: 'Contact',
    pathname: '/contact',
    icon: PhoneIcon,
    cta: true,
  },
];
