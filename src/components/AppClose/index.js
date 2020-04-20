import * as React from 'react';
import { isElectron, closeApp } from 'utils/electron';

export default function AppClose() {
  if (!isElectron) {
    return null;
  }

  return (
    <button style={{ float: 'right' }} onClick={closeApp}>
      close
    </button>
  );
}
