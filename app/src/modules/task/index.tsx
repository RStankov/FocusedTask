import { createSlice } from '@reduxjs/toolkit';
import * as types from './types';

import {
  createTodo,
  createBookmark,
  find,
  findIndex,
  insertAfter,
  move,
  paste,
} from './utils';

type IWithId = types.IWithId;

export type ITodo = types.ITodo;
export type IBookmark = types.IBookmark;

const INITIAL_STATE = {
  title: 'Focus',
  todos: [],
  bookmarks: [],
  note: '',
} as types.ITask;

type IOptionalPayload<T> = { payload: T | undefined };

export const slice = createSlice({
  name: 'task',
  initialState: INITIAL_STATE,
  reducers: {
    updateTaskTitle: (state, { payload }) => {
      state.title = payload;
    },
    newTodo: (
      state,
      {
        payload = {},
      }: IOptionalPayload<{ after?: { id: string; ident: number } }>,
    ) => {
      const after = payload.after;

      insertAfter(state.todos, after, createTodo({ after }));
    },
    pasteTasks: (state, { payload }) => {
      paste(
        state.todos,
        payload,
        (todo, text) => (todo.text = text),
        (after, text) => createTodo({ after, text }),
      );
    },
    toggleTodo: (state, { payload }) => {
      const index = findIndex(state.todos, payload);

      if (index === -1) {
        return;
      }

      const todo = state.todos[index];

      todo.isCompleted = !todo.isCompleted;
      todo.autoCompleted = false;

      for (let i = index + 1; i < state.todos.length; i += 1) {
        const other = state.todos[i];

        if (other.ident <= todo.ident) {
          break;
        }

        if (todo.isCompleted === other.isCompleted) {
          continue;
        }

        if (todo.isCompleted) {
          other.isCompleted = true;
          other.autoCompleted = true;
        } else if (other.autoCompleted) {
          other.isCompleted = false;
          other.autoCompleted = false;
        }
      }
    },
    updateTodoIdent: (state, { payload }) => {
      const todo = find(state.todos, payload);
      todo.ident = Math.max(0, todo.ident + payload.by);
    },
    updateTodoText: (state, { payload }) => {
      const todo = find(state.todos, payload);
      todo.text = payload.text || '';
    },
    removeTodo: (state, { payload }) => {
      state.todos = state.todos.filter(todo => todo.id !== payload.id);
    },
    removeTodoAutoFocus: (state, { payload }) => {
      const todo = find(state.todos, payload);
      if (!todo) {
        return;
      }

      if (todo.text) {
        Reflect.deleteProperty(todo, 'autoFocus');
      } else {
        state.todos = state.todos.filter(t => t.id !== todo.id);
      }
    },
    moveTodo: (state, { payload }) => {
      move(state.todos, payload, payload.by);
    },
    removeCompletedTodos: state => {
      state.todos = state.todos.filter(todo => !todo.isCompleted);
    },
    newBookmark: (
      state,
      { payload = {} }: IOptionalPayload<{ after?: IWithId; uri?: string }>,
    ) => {
      insertAfter(state.bookmarks, payload.after, createBookmark());
    },
    pasteBookmarks: (state, { payload }) => {
      paste(
        state.bookmarks,
        payload,
        (bookmark, text) => (bookmark.uri = text),
        (_, text) => createBookmark({ uri: text }),
      );
    },
    updateBookmark: (state, { payload }) => {
      const bookmark = find(state.bookmarks, payload);
      bookmark.uri = payload.uri || '';
    },
    removeBookmarkAutoFocus: (state, { payload }) => {
      const bookmark = find(state.bookmarks, payload);
      if (!bookmark) {
        return;
      }

      if (bookmark.uri) {
        Reflect.deleteProperty(bookmark, 'autoFocus');
      } else {
        state.bookmarks = state.bookmarks.filter(b => b.id !== bookmark.id);
      }
    },
    removeBookmark: (state, { payload }) => {
      state.bookmarks = state.bookmarks.filter(
        bookmark => bookmark.id !== payload.id,
      );
    },
    moveBookmark: (state, { payload }) => {
      move(state.bookmarks, payload, payload.by);
    },
    updateNote: (state, { payload }) => {
      state.note = payload;
    },
    set: (_state, { payload }) => ({
      ...INITIAL_STATE,
      ...payload,
    }),
    reset: () => INITIAL_STATE,
  },
});

export const {
  set,
  reset,
  updateTaskTitle,
  removeCompletedTodos,
  newTodo,
  pasteTasks,
  updateNote,
  toggleTodo,
  updateTodoText,
  updateTodoIdent,
  removeTodo,
  moveTodo,
  removeTodoAutoFocus,
  newBookmark,
  updateBookmark,
  removeBookmark,
  pasteBookmarks,
  moveBookmark,
  removeBookmarkAutoFocus,
} = slice.actions;

export default slice.reducer;
