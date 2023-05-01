import type { FunctionalComponent, SVGAttributes, ShallowRef } from 'vue';

export type SideMenuNavigationItem = {
  icon: ShallowRef<FunctionalComponent<SVGAttributes>>;
  text: string;
  extra?: string;
  subItems?: string[];
  badgeCount?: number;
};

export type SideMenuProjectItem = {
  color: 'red' | 'blue' | 'green' | 'yellow' | 'orange' | 'purple';
  text: string;
};

export type SideMenuStatItem = {
  text: string;
  progress: number;
};
