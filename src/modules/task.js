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
    addTask: (state, action) => {
      state.todos.push({
        id: uniqueId('task_'),
        text: action.text || '',
        isCompleted: false,
      });
    },
  },
});

export const { addTask } = counterSlice.actions;

export default counterSlice.reducer;
