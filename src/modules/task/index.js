import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';
import { insertAfter, update } from './utils';

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
      const todo = {
        id: uniqueId('task_') + new Date(),
        text: '',
        isCompleted: false,
        ident: after ? after.ident : 0,
      };

      insertAfter(state.todos, after, todo);
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
    newBookmark: (state, action) => {
      const bookmark = {
        id: uniqueId('bookmark_') + new Date(),
        uri: '',
      };

      insertAfter(
        state.bookmark,
        action.payload && action.payload.after,
        bookmark,
      );
    },
    updateBookmark: (state, action) => {
      update(
        state.bookmarks,
        action,
        bookmark => (bookmark.uri = action.payload.uri || ''),
      );
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        bookmark => bookmark.id !== action.payload.id,
      );
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
  updateTaskTitle,
  newTodo,
  updateNote,
  toggleTodo,
  updateTodoText,
  updateTodoIdent,
  removeTodo,
  newBookmark,
  updateBookmark,
  removeBookmark,
} = slice.actions;

export default slice.reducer;
