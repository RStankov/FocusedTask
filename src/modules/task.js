import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

export const counterSlice = createSlice({
  name: 'task',
  initialState: {
    title: 'Focused Task',
    todos: [],
    bookmarks: [],
    note: '',
  },
  reducers: {
    newTodo: (state, action) => {
      const todo = {
        id: uniqueId('task_'),
        text: '',
        isCompleted: false,
      };

      const insertAt =
        action.payload && action.payload.after
          ? state.todos.findIndex(t => t.id === action.payload.after.id)
          : -1;

      state.todos.splice(insertAt + 1, 0, todo);
    },
    toggleTodo: (state, action) => {
      state.todos.forEach(todo => {
        if (todo.id === action.payload.id) {
          todo.isCompleted = !todo.isCompleted;
        }
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    },
    newBookmark: (state, action) => {
      state.bookmarks.push({
        id: uniqueId('bookmark_'),
        uri: '',
      });
    },
    updateBookmark: (state, action) => {
      state.bookmarks.forEach(bookmark => {
        if (bookmark.id === action.payload.id) {
          bookmark.uri = action.payload.uri || '';
        }
      });
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        bookmark => bookmark.id !== action.payload.id,
      );
    },
    updateTodo: (state, action) => {
      state.todos.forEach(todo => {
        if (todo.id === action.payload.id) {
          todo.text = action.payload.text || '';
        }
      });
    },
    updateNote: (state, action) => {
      state.note = action.payload;
    },
  },
});

export const {
  newTodo,
  updateNote,
  toggleTodo,
  updateTodo,
  removeTodo,
  newBookmark,
  updateBookmark,
  removeBookmark,
} = counterSlice.actions;

export default counterSlice.reducer;
