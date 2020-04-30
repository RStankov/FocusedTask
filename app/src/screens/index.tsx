import * as React from 'react';
import useSelector from 'hooks/useSelector';
import { getSelectedScreen } from 'modules/selectedScreen';

import shortcuts from './shortcuts';
import task from './task';

const SCREENS = {
  task,
  shortcuts,
};

export default function App() {
  const selectedScreen = useSelector(getSelectedScreen);
  const Screen = (SCREENS as any)[selectedScreen] || SCREENS.task;

  return <Screen />;
}
