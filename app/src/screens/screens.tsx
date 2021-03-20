import about from './about';
import changelog from './changelog';
import preferences from './preferences';
import shortcuts from './shortcuts';
import task from './task';

export const SCREENS = {
  about,
  changelog,
  preferences,
  shortcuts,
  task,
};

export type Screens = keyof typeof SCREENS
