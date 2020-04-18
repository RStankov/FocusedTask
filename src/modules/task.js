import { createSlice } from '@reduxjs/toolkit';
import { uniqueId } from 'lodash';

export const counterSlice = createSlice({
  name: 'task',
  initialState: {
    title: 'Focused Task',
    todos: [],
    shortcuts: [],
    note: '',
  },
  reducers: {
    newTask: (state, action) => {
      state.todos.push({
        id: uniqueId('task_'),
        text: '',
        isCompleted: false,
      });
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
    newShortcut: (state, action) => {
      state.shortcuts.push({
        id: uniqueId('shortcut_'),
        uri: 'https://',
      });
    },
    updateShortcut: (state, action) => {
      state.shortcuts.forEach(shortcut => {
        if (shortcut.id === action.payload.id) {
          shortcut.uri = action.payload.uri || '';
        }
      });
    },
    removeShortcut: (state, action) => {
      state.shortcuts = state.shortcuts.filter(
        shortcut => shortcut.id !== action.payload.id,
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
  newTask,
  updateNote,
  toggleTodo,
  updateTodo,
  removeTodo,
  newShortcut,
  updateShortcut,
  removeShortcut,
} = counterSlice.actions;

export default counterSlice.reducer;
