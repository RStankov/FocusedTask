import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Textarea from './components/Textarea';
import Emoji from './components/Emoji';

import {
  updateNote,
  newTask,
  toggleTodo,
  updateTodo,
  newShortcut,
  updateShortcut,
  removeShortcut,
} from './modules/task';

export default function App() {
  const task = useSelector(store => store.task);
  const dispatch = useDispatch();

  console.log(task);
  return (
    <div>
      <h1>
        <Emoji emoji="📋" /> {task.title}
      </h1>
      <h2>
        <Emoji emoji="🔜" />
        Todos
      </h2>
      <ul>
        {task.todos.map(todo => (
          <li key={todo.id}>
            <Emoji
              emoji={todo.isCompleted ? '✅' : '⏹'}
              onClick={() => dispatch(toggleTodo(todo))}
            />
            <input
              type="text"
              autoFocus={true}
              value={todo.text}
              onChange={e =>
                dispatch(updateTodo({ id: todo.id, text: e.target.value }))
              }
            />
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(newTask())}>new task</button>
      <h2>
        <Emoji emoji="🔗" />
        Shortcuts
        <Emoji emoji="➕" onClick={() => dispatch(newShortcut())} />
      </h2>
      <ul>
        {task.shortcuts.map(shortcut => (
          <li key={shortcut.id}>
            <input
              type="text"
              autoFocus={true}
              value={shortcut.uri}
              onChange={e =>
                dispatch(
                  updateShortcut({ id: shortcut.id, uri: e.target.value }),
                )
              }
            />
            <Emoji
              emoji="🗑"
              onClick={() => dispatch(removeShortcut(shortcut))}
            />
            {!!shortcut.uri.match(/https?:\/\/.+\..+/) && (
              <a href={shortcut.uri} target="_blank">
                <Emoji emoji="↗️" />
              </a>
            )}
          </li>
        ))}
      </ul>
      <h2>
        <Emoji emoji="📝" />
        Notes
      </h2>
      <Textarea
        value={task.note}
        onChange={e => dispatch(updateNote(e.target.value))}
      />
    </div>
  );
}
