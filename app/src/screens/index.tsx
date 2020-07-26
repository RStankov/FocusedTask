import * as React from 'react';
import useSelector from 'hooks/useSelector';
import { getSelectedScreen } from 'modules/selectors';

import task from './task';
import tasksList from './tasksList';
import shortcuts from './shortcuts';
import changelog from './changelog';

const SCREENS = {
  task,
  tasksList,
  shortcuts,
  changelog,
};

export default function App() {
  const selectedScreen = useSelector(getSelectedScreen);
  const Screen = (SCREENS as any)[selectedScreen] || SCREENS.task;

  return <Screen />;
}
