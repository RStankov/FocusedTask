import about from './about';
import changelog from './changelog';
import preferences from './preferences';
import shortcuts from './shortcuts';
import task from './task';

export const Screens = {
  about,
  changelog,
  preferences,
  shortcuts,
  task,
};

export type IScreens = keyof typeof Screens
