import * as React from 'react';
import useSelector from 'hooks/useSelector';
import { getSelectedScreen } from 'modules/selectors';
import { SCREENS } from './screens'


export default function App() {
  const selectedScreen = useSelector(getSelectedScreen);
  const Screen = SCREENS[selectedScreen];

  return <Screen />;
}
