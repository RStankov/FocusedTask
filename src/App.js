import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Textarea from 'components/Textarea';
import Emoji from 'components/Emoji';

import {
  updateNote,
  newTodo,
  toggleTodo,
  updateTodo,
  removeTodo,
  newBookmark,
  updateBookmark,
  removeBookmark,
} from './modules/task';

export default function App() {
  const task = useSelector(store => store.task);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>
        <Emoji emoji="🎯" /> {task.title}
      </h1>
      <h2>
        <Emoji emoji="🔜" />
        Todos
      </h2>
      <ul>
        {task.todos.map((todo, i) => (
          <li key={todo.id}>
            <Emoji
              emoji={todo.isCompleted ? '✅' : '[  ]'}
              onClick={() => dispatch(toggleTodo(todo))}
            />
            <input
              id={`todo-text-${i}`}
              type="text"
              autoFocus={true}
              value={todo.text}
              onKeyDown={e => {
                if (e.target.value === '' && e.keyCode === 8) {
                  dispatch(removeTodo(todo));
                  const el = document.getElementById(`todo-text-${i - 1}`);
                  el && el.focus();
                } else if (e.target.value !== '' && e.keyCode === 13) {
                  dispatch(newTodo({ after: todo }));
                }
              }}
              onChange={e =>
                dispatch(updateTodo({ id: todo.id, text: e.target.value }))
              }
              onBlur={() => todo.text || dispatch(removeTodo(todo))}
            />
          </li>
        ))}
      </ul>
      <button onClick={() => dispatch(newTodo())}>new task</button>
      <h2>
        <Emoji emoji="📌" />
        Bookmarks
        <Emoji emoji="➕" onClick={() => dispatch(newBookmark())} />
      </h2>
      <ul>
        {task.bookmarks.map(bookmark => (
          <li key={bookmark.id}>
            <input
              type="text"
              autoFocus={true}
              value={bookmark.uri}
              onChange={e =>
                dispatch(
                  updateBookmark({ id: bookmark.id, uri: e.target.value }),
                )
              }
            />
            <Emoji
              emoji="🗑"
              onClick={() => dispatch(removeBookmark(bookmark))}
            />
            {!!bookmark.uri.match(/https?:\/\/.+\..+/) && (
              <a href={bookmark.uri} target="_blank" rel="noopener noreferrer">
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
