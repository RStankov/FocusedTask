import { IStoreState } from './index';

export function getTask(store: IStoreState) {
  return store.tasks.tasks[store.tasks.selected]!.present;
}

export function getTitle(store: IStoreState) {
  return getTask(store).title || '';
}

export function getTodos(store: IStoreState) {
  return getTask(store).todos || [];
}

export function getBookmarks(store: IStoreState) {
  return getTask(store).bookmarks || [];
}

export function getNote(store: IStoreState) {
  return getTask(store).note || '';
}
