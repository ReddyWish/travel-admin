import type { LucideIcon } from 'lucide-react';

export interface NavigationItem {
    path: string;
    name: string;
    icon: LucideIcon;
}

export type NavigationList = NavigationItem[];
