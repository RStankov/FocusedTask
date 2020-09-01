import * as React from 'react';
import store from 'modules';
import { ReactComponent as PreferencesIcon } from 'icons/preferences.svg';
import styles from './styles.module.css';
import { removeCompletedTodos } from 'modules/task';
import { newTask, deleteTask } from 'modules/actions';
import { getSelectedTask, getAllTasks } from 'modules/selectors';
import { selectTask, importTask } from 'modules/actions';

import {
  openShortcuts,
  openChangelog,
  openAbout,
} from 'modules/selectedScreen';

import {
  isElectron,
  openMenu,
  closeApp,
  readTaskFromFile,
  writeTaskToFile,
  confirm,
  IMenuItem,
} from 'utils/electron';

export default function AppClose() {
  if (!isElectron) {
    return null;
  }

  return (
    <span className={styles.button}>
      <PreferencesIcon className={styles.button} onClick={openAppMenu} />
    </span>
  );
}

function openAppMenu() {
  const allTask = getAllTasks(store.getState());
  const selectedTask = getSelectedTask(store.getState());

  openMenu([
    {
      label: 'New',
      click: () => store.dispatch(newTask()),
    },
    {
      label: 'Open',
      submenu: (allTask.map(task => ({
        label: task.title,
        type: 'checkbox',
        checked: task.id === selectedTask.id,
        click: () => store.dispatch(selectTask(task)),
      })) as IMenuItem[]).concat([
        {
          type: 'separator',
        },
        {
          label: 'New',
          click: () => store.dispatch(newTask()),
        },
      ]),
    },
    {
      label: 'Delete',
      click: () =>
        confirm({
          message: 'Are you sure?',
          detail: 'Your current task data will be erased.',
          fn: () => store.dispatch(deleteTask(selectedTask)),
        }),
    },
    {
      label: 'Save As...',
      click: () => writeTaskToFile(store.getState()),
    },
    {
      label: 'Import...',
      click: async () => {
        const task = await readTaskFromFile();
        if (task) {
          store.dispatch(importTask(task));
        }
      },
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
      label: 'About',
      click: () => store.dispatch(openAbout()),
    },
    {
      label: 'Changelog',
      click: () => store.dispatch(openChangelog()),
    },
    {
      label: 'Shortcuts',
      click: () => store.dispatch(openShortcuts()),
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
