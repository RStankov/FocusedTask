import storage from 'utils/storage';

const VERSION = 2;

export function preloadState() {
  const version = storage.get('reduxStoreVersion', 1);
  const state = storage.get('reduxStore', {});

  if (version === VERSION) {
    return state;
  }

  const convert = STATE_CONVERT[version];

  if (convert) {
    return convert(state);
  }

  return {};
}

export function storeState(state: any) {
  storage.set('reduxStoreVersion', VERSION);
  storage.set('reduxStore', state);
}

const STATE_CONVERT = {
  1: (state: any) => {
    return {
      selectedScreen: state.selectedScreen || 'task',
      task: {
        future: [],
        past: [],
        lastAction: null,
        present: state.task || {},
      },
    };
  },
} as any;
