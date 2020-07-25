import { IStoreState } from './index';

export function getTask(store: IStoreState) {
  return store.tasks.tasks[store.tasks.selected]!;
}
