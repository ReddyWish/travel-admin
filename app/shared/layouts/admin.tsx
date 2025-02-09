import { ROUTES } from '~/shared/constants/routes';
import { ChartColumnStacked, Euro, TreePalm } from 'lucide-react';
import type { NavigationList } from '~/shared/types/NavigationList';
import { Outlet } from 'react-router';
import { cn } from '~/lib/cn';
import Sidebar from '~/shared/components/Sidebar';
import { useEffect, useState } from 'react';
import { WindowSize } from '~/shared/types/WindowSize';
import { useIsLessThanSize } from '~/shared/hooks/useIsLessThanSize';

const NAVIGATION_LIST: NavigationList = [
  {
    path: ROUTES.tours,
    name: 'Tours',
    icon: TreePalm,
  },
  {
    path: ROUTES.categories,
    name: 'Categories',
    icon: ChartColumnStacked,
  },
  {
    path: ROUTES.currencies,
    name: 'Currencies',
    icon: Euro,
  },
];

export default function Admin() {
  const isMobile = useIsLessThanSize(WindowSize.sm);
  const [sideBarIsOpen, setSideBarIsOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setSideBarIsOpen(true);
    } else {
      setSideBarIsOpen(false);
    }
  }, [isMobile]);
  return (
    <div className="max-w-[1440px] pt-[63px]">
      <Sidebar
        isMobile={isMobile}
        options={NAVIGATION_LIST}
        sideBarIsOpen={sideBarIsOpen}
        setSideBarIsOpen={setSideBarIsOpen}
      />
      <div
        className={cn(
          'h-screen pl-34 ',
          `${sideBarIsOpen ? 'sm:pl-[234px]' : 'sm:pl-[30px]'} pr-[30px] pl-10`,
        )}
      >
        <Outlet />
      </div>
    </div>
  );
}
