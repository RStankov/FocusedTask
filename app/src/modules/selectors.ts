import { IStoreState } from './index';

export function getSelectedTask(store: IStoreState) {
  return store.tasks.tasks[store.tasks.selected]!.present;
}

export function getAllTasks(store: IStoreState) {
  return Object.values(store.tasks.tasks).map(t => t.present);
}

export function getTitle(store: IStoreState) {
  return getSelectedTask(store).title || '';
}

export function getTodos(store: IStoreState) {
  return getSelectedTask(store).todos || [];
}

export function getBookmarks(store: IStoreState) {
  return getSelectedTask(store).bookmarks || [];
}

export function getNote(store: IStoreState) {
  return getSelectedTask(store).note || '';
}
