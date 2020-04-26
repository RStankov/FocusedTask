import * as React from 'react';
import { useSelector } from 'react-redux';
import { getSelectedScreen } from 'modules/selectedScreen';

import shortcuts from './shortcuts';
import task from './task';

const SCREENS = {
  task,
  shortcuts,
};

export default function App() {
  const selectedScreen = useSelector(getSelectedScreen());
  const Screen = SCREENS[selectedScreen] || SCREENS.task;

  return <Screen />;
}
