import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Textarea from 'components/Textarea';
import Emoji from 'components/Emoji';
import TaskTitle from 'components/TaskTitle';

import {
  updateNote,
  newTodo,
  toggleTodo,
  updateTodoIdent,
  updateTodoText,
  removeTodo,
  newBookmark,
  updateBookmark,
  removeBookmark,
} from 'modules/task';

function focusOnTodoWithIndex(index) {
  const el = document.getElementById(`todo-text-${index}`);
  el && el.focus();
}

export default function App() {
  const task = useSelector(store => store.task);
  const dispatch = useDispatch();

  return (
    <div>
      <TaskTitle />
      <h2>
        <Emoji emoji="🔜" />
        Todos
      </h2>
      <ul>
        {task.todos.map((todo, i) => (
          <li
            key={todo.id}
            style={{ marginLeft: 20 * todo.ident }}
            onClick={() => focusOnTodoWithIndex(i)}>
            <Emoji
              emoji={todo.isCompleted ? '✅' : '[  ]'}
              onClick={e => {
                e.stopPropagation();
                dispatch(toggleTodo(todo));
              }}
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
                } else if (e.keyCode === 38) {
                  focusOnTodoWithIndex(i - 1);
                } else if (e.keyCode === 40) {
                  focusOnTodoWithIndex(i + 1);
                } else if (
                  e.keyCode === 37 ||
                  (e.metaKey && e.keyCode === 219)
                ) {
                  dispatch(updateTodoIdent({ id: todo.id, by: -1 }));
                } else if (
                  e.keyCode === 39 ||
                  (e.metaKey && e.keyCode === 221)
                ) {
                  dispatch(updateTodoIdent({ id: todo.id, by: 1 }));
                }
              }}
              onChange={e =>
                dispatch(updateTodoText({ id: todo.id, text: e.target.value }))
              }
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
