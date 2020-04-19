import * as React from 'react';

let closeApp = null;
if (window.require) {
  const remote = window.require('electron').remote;
  closeApp = () => {
    remote.getCurrentWindow().close();
  };
}

export default function AppClose() {
  if (!closeApp) {
    return null;
  }

  return (
    <button style={{ float: 'right' }} onClick={closeApp}>
      close
    </button>
  );
}
