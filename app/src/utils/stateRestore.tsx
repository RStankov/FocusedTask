import storage from 'utils/storage';

export const VERSION = 2;

export function preloadStore() {
  const version = storage.get('reduxStoreVersion', 1);
  const store = storage.get('reduxStore', {});

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
  if (version === VERSION) {
    return store;
  }

  const convert = STATE_CONVERT[version];

  if (convert) {
    return convert(store);
  }

  return {};
}

const STATE_CONVERT = {
  1: (store: any) => {
    return {
      selectedScreen: store.selectedScreen || 'task',
      task: {
        future: [],
        past: [],
        lastAction: null,
        present: store.task || {},
      },
    };
  },
} as any;
