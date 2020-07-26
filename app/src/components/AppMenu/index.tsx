import * as React from 'react';
import store from 'modules';
import { ReactComponent as PreferencesIcon } from 'icons/preferences.svg';
import styles from './styles.module.css';
import { removeCompletedTodos } from 'modules/task';
import { newTask, deleteTask } from 'modules/actions';
import { getSelectedTask } from 'modules/selectors';

import {
  openShortcuts,
  openChangelog,
  openTasksList,
} from 'modules/selectedScreen';

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
      click: () => store.dispatch(newTask()),
    },
    {
      label: 'Save Task As...',
      click: () => writeStoreToFile(store.getState()),
    },
    {
      label: 'Open Task...',
      click: async () => {
        await readStoreFromFile();
      },
    },
    {
      label: 'Delete Task',
      click: () =>
        confirm({
          message: 'Are you sure?',
          detail: 'Your current task data will be erased.',
          fn: () =>
            store.dispatch(deleteTask(getSelectedTask(store.getState()))),
        }),
    },
    {
      type: 'separator',
    },
    {
      label: 'Clear Completed Todos',
      click: () => store.dispatch(removeCompletedTodos()),
    },
    {
      type: 'separator',
    },
    {
      label: 'Show Tasks List',
      click: () => store.dispatch(openTasksList()),
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
