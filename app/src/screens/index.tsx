import * as React from 'react';
import useSelector from 'hooks/useSelector';
import { getSelectedScreen } from 'modules/selectors';
import { Screens, IScreens } from './screens'
import useShortcuts from 'hooks/useShortcuts';

export default function App() {
  useShortcuts();
  const selectedScreen: IScreens = useSelector(getSelectedScreen);
  const Screen = Screens[selectedScreen];

  return <Screen />;
}
