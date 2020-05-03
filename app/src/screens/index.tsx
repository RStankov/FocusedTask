import * as React from 'react';
import useSelector from 'hooks/useSelector';
import { getSelectedScreen } from 'modules/selectedScreen';

import task from './task';
import shortcuts from './shortcuts';
import changelog from './changelog';

const SCREENS = {
  task,
  shortcuts,
  changelog,
};

export default function App() {
  const selectedScreen = useSelector(getSelectedScreen);
  const Screen = (SCREENS as any)[selectedScreen] || SCREENS.task;

  return <Screen />;
}
