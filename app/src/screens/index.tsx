import * as React from 'react';
import useSelector from 'hooks/useSelector';
import { getSelectedScreen } from 'modules/selectors';
import { Screens, IScreens } from './screens'
import useShortcuts from 'hooks/useShortcuts';
import { useTheme } from 'modules/preferences'

export default function App() {
  useTheme()
  useShortcuts();
  const selectedScreen: IScreens = useSelector(getSelectedScreen);
  const Screen = Screens[selectedScreen];

  return <Screen />;
}
