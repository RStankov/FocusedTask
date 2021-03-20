import { IStoreState } from './index';

export function getSelectedScreen(store: IStoreState) {
  return store.selectedScreen.screen;
}

export function getSelectedTask(store: IStoreState) {
  return store.tasks.tasks[store.tasks.selected]!;
}

export function getAllTasks(store: IStoreState) {
  return Object.values(store.tasks.tasks);
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

export function getSelectedTaskId(store: IStoreState) {
  return store.tasks.tasks[store.tasks.selected]!.id;
}

export function getTheme(store: IStoreState) {
  return store.theme.theme
}