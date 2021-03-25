import storage from 'utils/storage';
import generateId from 'utils/generateId';
import { getSelectedTask } from 'modules/selectors';

export const VERSION = 3;

export function preloadStore() {
  const version = storage.get('reduxStoreVersion', 1);
  const store = storage.get('reduxStore');

  if (!store) {
    return undefined;
  }

  if (version === VERSION) {
    return store;
  }

  const convert = STORE_CONVERT[version];

  if (convert) {
    return convert(store);
  }

  return undefined;
}

export function saveStore(store: any) {
  storage.set('reduxStoreVersion', VERSION);
  storage.set('reduxStore', store);
}

export function exportTask(store: any) {
  return JSON.stringify({
    version: VERSION,
    date: new Date(),
    task: getSelectedTask(store),
  });
}

export function importTask(json: any) {
  const data = JSON.parse(json);

  if (!data) {
    return null;
  }

  const convert = IMPORT_CONVERT[data.version];

  if (convert) {
    return convert(data);
  }

  return undefined;
}

const IMPORT_CONVERT: any = {
  1: ({ store }: any) => ({ ...store.task, id: generateId('task') }),
  2: ({ store }: any) => ({ ...store.task.present, id: generateId('task') }),
  3: ({ task }: any) => task,
};

const STORE_CONVERT: any = {
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
        selected: task.id,
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
  3: (store: any) => store,
};
