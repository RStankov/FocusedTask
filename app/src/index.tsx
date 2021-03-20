import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Screen from './screens';
import store from './modules';
import { Provider } from 'react-redux';
import { resizeBasedOnContent } from 'utils/electron';
import AppDrag from './components/AppDrag';
import { initialLoadTheme } from 'screens/preferences'

resizeBasedOnContent();


function App() {
  React.useEffect(() => {
    const theme = initialLoadTheme()
    document.documentElement.setAttribute("data-theme", theme);
  }, [])

  return (<>
    <AppDrag />
    <Screen />
  </>)
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);



