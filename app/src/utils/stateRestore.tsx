import storage from 'utils/storage';
import generateId from 'utils/generateId';

export const VERSION = 3;

export function preloadStore() {
  const version = storage.get('reduxStoreVersion', 1);
  const store = storage.get('reduxStore');

  return convertStore(version, store);
}

export function saveStore(store: any) {
  storage.set('reduxStoreVersion', VERSION);
  storage.set('reduxStore', store);
}

export function exportStore(store: any) {
  return JSON.stringify({
    version: VERSION,
    date: new Date(),
    store,
  });
}

export function importStore(data: any) {
  const { version, store } = JSON.parse(data);

  saveStore(convertStore(version, store));
}

function convertStore(version: number, store: any) {
  if (!store) {
    return undefined;
  }

  if (version === VERSION) {
    return store;
  }

  const convert = STATE_CONVERT[version];

  if (convert) {
    return convert(store);
  }

  return undefined;
}

const STATE_CONVERT = {
  1: (store: any) => {
    let task = { ...store.task, id: generateId('task') };

    return {
      selectedScreen: store.selectedScreen || 'task',
      tasks: {
        select: task.id,
        tasks: {
          [task.id]: task,
        },
        undo: {
          lastAction: null,
          past: [],
          future: [],
        },
      },
    };
  },
  2: (store: any) => {
    let task = { ...store.task.present, id: generateId('task') };

    return {
      selectedScreen: store.selectedScreen || 'task',
      tasks: {
        select: task.id,
        tasks: {
          [task.id]: task,
        },
        undo: {
          lastAction: null,
          past: [],
          future: [],
        },
      },
    };
  },
} as any;
