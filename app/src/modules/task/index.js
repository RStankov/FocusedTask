import { createSlice } from '@reduxjs/toolkit';

import {
  insertAfter,
  move,
  update,
  paste,
  createTodo,
  createBookmark,
} from './utils';

const INITIAL_STATE = {
  title: 'Task',
  todos: [],
  bookmarks: [],
  note: '',
};

export const slice = createSlice({
  name: 'task',
  initialState: INITIAL_STATE,
  reducers: {
    updateTaskTitle: (state, action) => {
      state.title = action.payload;
    },
    newTodo: (state, action) => {
      const after = action.payload && action.payload.after;

      insertAfter(state.todos, after, createTodo({ after }));
    },
    pasteTasks: (state, action) => {
      paste(
        state.todos,
        action,
        (todo, text) => (todo.text = text),
        createTodo,
      );
    },
    toggleTodo: (state, action) => {
      update(
        state.todos,
        action,
        todo => (todo.isCompleted = !todo.isCompleted),
      );
    },
    updateTodoIdent: (state, action) => {
      update(
        state.todos,
        action,
        todo => (todo.ident = Math.max(0, todo.ident + action.payload.by)),
      );
    },
    updateTodoText: (state, action) => {
      update(
        state.todos,
        action,
        todo => (todo.text = action.payload.text || ''),
      );
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    },
    removeTodoAutoFocus: (state, action) => {
      if (action.payload.text) {
        update(state.todos, action, todo =>
          Reflect.deleteProperty(todo, 'autoFocus'),
        );
      } else {
        state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
      }
    },
    moveTodo: (state, action) => {
      move(state.todos, action.payload, action.payload.by);
    },
    removeCompletedTodos: state => {
      state.todos = state.todos.filter(todo => !todo.isCompleted);
    },
    newBookmark: (state, action) => {
      insertAfter(
        state.bookmarks,
        action.payload && action.payload.after,
        createBookmark(),
      );
    },
    pasteBookmarks: (state, action) => {
      paste(
        state.bookmarks,
        action,
        (bookmark, text) => (bookmark.uri = text),
        ({ text }) => createBookmark({ uri: text }),
      );
    },
    updateBookmark: (state, action) => {
      update(
        state.bookmarks,
        action,
        bookmark => (bookmark.uri = action.payload.uri || ''),
      );
    },
    removeBookmarkAutoFocus: (state, action) => {
      if (action.payload.uri) {
        console.log('?');
        update(state.bookmarks, action, bookmark =>
          Reflect.deleteProperty(bookmark, 'autoFocus'),
        );
      } else {
        state.bookmarks = state.bookmarks.filter(
          bookmark => bookmark.id !== action.payload.id,
        );
      }
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        bookmark => bookmark.id !== action.payload.id,
      );
    },
    moveBookmark: (state, action) => {
      move(state.bookmarks, action.payload, action.payload.by);
    },
    updateNote: (state, action) => {
      state.note = action.payload;
    },
    set: (state, action) => ({
      ...INITIAL_STATE,
      ...action.payload,
    }),
  },
});

export const {
  set,
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
