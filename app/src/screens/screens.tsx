import about from './about';
import changelog from './changelog';
import shortcuts from './shortcuts';
import task from './task';

export const SCREENS = {
  about,
  changelog,
  shortcuts,
  task,
};

export type Screens = keyof typeof SCREENS
