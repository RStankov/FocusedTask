import * as React from 'react';
import store from 'modules';
import { ReactComponent as PreferencesIcon } from 'icons/preferences.svg';
import styles from './styles.module.css';
import { openShortcuts, openChangelog } from 'modules/selectedScreen';
import { set, removeCompletedTodos, reset } from 'modules/task';

import {
  isElectron,
  openMenu,
  closeApp,
  readStoreFromFile,
  writeStoreToFile,
  confirm,
} from 'utils/electron';

export default function AppClose() {
  if (!isElectron) {
    return null;
  }

  return <PreferencesIcon className={styles.button} onClick={openAppMenu} />;
}

function openAppMenu() {
  openMenu([
    {
      label: 'New Task',
      click: () =>
        confirm({
          message: 'Are you sure?',
          detail: 'Your current task data will be erased.',
          fn: () => store.dispatch(reset()),
        }),
    },
    {
      label: 'Task Open...',
      click: async () => {
        const newStore = await readStoreFromFile();

        if (newStore) {
          store.dispatch(set(newStore.task));
        }
      },
    },
    {
      label: 'Task Save As...',
      click: () => writeStoreToFile(store.getState()),
    },
    {
      type: 'separator',
    },
    {
      label: 'Clear Completed Todos',
      click: () => store.dispatch(removeCompletedTodos()),
    },
    {
      label: 'Show Shortcuts',
      click: () => store.dispatch(openShortcuts()),
    },
    {
      label: 'Show Changelog',
      click: () => store.dispatch(openChangelog()),
    },
    {
      type: 'separator',
    },
    {
      label: 'Quit',
      click: closeApp,
    },
  ]);
}
