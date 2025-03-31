import type { NavigationList } from '~/shared/types/NavigationList';
import { ArrowRight, PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import { Button } from '~/shared/components/ui/button';
import { cn } from '../../lib/cn';
import { type RefObject, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { useOutsideClick } from '~/shared/hooks/useOutsideClick';
import { ModeToggle } from '~/shared/components/mode-toggle';
import { useAuth } from '~/shared/providers/auth-provider';

interface SidebarProps {
  isMobile: boolean;
  options: NavigationList;
  sideBarIsOpen: boolean;
  setSideBarIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({
  isMobile,
  options,
  sideBarIsOpen,
  setSideBarIsOpen,
}: SidebarProps) {
  const { logout } = useAuth();
  const sidebarRef: RefObject<HTMLDivElement | null> = useRef(null);
  const buttonRef: RefObject<HTMLButtonElement | null> = useRef(null);
  const toggleSideBar = () => {
    setSideBarIsOpen(!sideBarIsOpen);
  };
  const location = useLocation();

  const checkIfCurrentPage = (pathItem: string) => {
    return location.pathname.split('/').includes(pathItem);
  };

  useOutsideClick(sidebarRef, (event) => {
    if (
      isMobile &&
      sideBarIsOpen &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node)
    ) {
      toggleSideBar();
    }
  });

  return (
    <>
      <Button
        className="fixed top-[24px] left-0 px-1 bg-transparent hover:bg-slate-200 shadow-none [&_svg]:size-6 border-0"
        onClick={toggleSideBar}
        ref={buttonRef}
      >
        <PanelLeftOpen className="text-slate-500 dark:text-white" />
      </Button>
      <aside
        id="default-sidebar"
        className={cn(
          'fixed top-0 left-0 z-40 w-64 max-w-[200px] h-screen transition-transform',
          sideBarIsOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-label="Sidebar"
      >
        <div
          className="h-full px-4 py-6 flex flex-col justify-between overflow-y-auto bg-white dark:bg-black border-r border-slate-200"
          ref={sidebarRef}
        >
          <div>
            <div className="flex items-center justify-between px-3">
              <Button
                className="px-1 bg-transparent hover:bg-slate-200 shadow-none [&_svg]:size-5 border-0"
                onClick={toggleSideBar}
                ref={buttonRef}
              >
                <PanelLeftClose className="text-slate-500 dark:text-white" />
              </Button>
              <h2 className="text-l font-bold dark:text-white">CMS Template</h2>
            </div>
            <ul className="space-y-2 font-medium pt-12">
              {options.map((navigationItem) => (
                <li key={navigationItem.name}>
                  <Link
                    to={navigationItem.path}
                    className={cn(
                      checkIfCurrentPage(navigationItem.path) &&
                        'bg-slate-100 dark:bg-transparent',
                      'flex items-center px-3 py-2 text-black rounded-lg dark:text-white hover:bg-slate-100 dark:hover:bg-slate-700 group',
                    )}
                  >
                    <navigationItem.icon />
                    <span className="ms-4">{navigationItem.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between">
            <Button
              className="max-w-[101px] flex gap-1 cursor-pointer dark:text-white dark:border-1 dark:border-white"
              onClick={logout}
            >
              <ArrowRight className="w-4 h-4" />
              Logout
            </Button>
            <ModeToggle />
          </div>
        </div>
      </aside>
    </>
  );
}
