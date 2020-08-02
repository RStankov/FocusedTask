import * as React from 'react';
import useSelector from 'hooks/useSelector';
import { getSelectedScreen } from 'modules/selectors';

import about from './about';
import changelog from './changelog';
import shortcuts from './shortcuts';
import task from './task';

const SCREENS = {
  about,
  changelog,
  shortcuts,
  task,
};

export default function App() {
  const selectedScreen = useSelector(getSelectedScreen);
  const Screen = (SCREENS as any)[selectedScreen] || SCREENS.task;

  return <Screen />;
}
