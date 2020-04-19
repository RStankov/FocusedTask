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

      const insertAt = after
        ? state.todos.findIndex(t => t.id === action.payload.after.id)
        : -1;

      if (insertAt === -1) {
        state.todos.push(todo);
      } else {
        state.todos.splice(insertAt + 1, 0, todo);
      }
    },
    toggleTodo: (state, action) => {
      state.todos.forEach(todo => {
        if (todo.id === action.payload.id) {
          todo.isCompleted = !todo.isCompleted;
        }
      });
    },
    updateTodoIdent: (state, action) => {
      state.todos.forEach(todo => {
        if (todo.id === action.payload.id) {
          todo.ident = Math.max(0, todo.ident + action.payload.by);
        }
      });
    },
    updateTodoText: (state, action) => {
      state.todos.forEach(todo => {
        if (todo.id === action.payload.id) {
          todo.text = action.payload.text || '';
        }
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    },
    newBookmark: (state, action) => {
      state.bookmarks.push({
        id: uniqueId('bookmark_') + new Date(),
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
    updateNote: (state, action) => {
      state.note = action.payload;
    },
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
} = counterSlice.actions;

export default counterSlice.reducer;
