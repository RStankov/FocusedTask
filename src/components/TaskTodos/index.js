import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Emoji from 'components/Emoji';
import Stack from 'components/Stack';
import styles from './styles.module.css';
import classNames from 'classnames';
import InputText from 'components/InputText';

import {
  newTodo,
  toggleTodo,
  updateTodoIdent,
  updateTodoText,
  removeTodo,
} from 'modules/task';

export default function TaskTodos() {
  const todos = useSelector(store => store.task.todos);
  const dispatch = useDispatch();

  return (
    <Stack.Column>
      {todos.map((todo, i) => (
        <Stack.Row
          key={todo.id}
          style={{ marginLeft: 20 * (todo.ident || 0) }}
          onClick={() => focusOnTodoWithIndex(i)}>
          {todo.isCompleted ? (
            <Emoji
              emoji={'✅'}
              onClick={e => {
                e.stopPropagation();
                dispatch(toggleTodo(todo));
              }}
            />
          ) : (
            <div
              className={styles.checkbox}
              onClick={e => {
                e.stopPropagation();
                dispatch(toggleTodo(todo));
              }}
            />
          )}
          <InputText
            className={classNames(
              styles.input,
              todo.isCompleted && styles.completed,
            )}
            id={`todo-text-${i}`}
            type="text"
            autoFocus={true}
            value={todo.text}
            placeholder="..."
            onChange={e =>
              dispatch(updateTodoText({ id: todo.id, text: e.target.value }))
            }
            onKeyDown={e => {
              if (e.target.value === '' && e.keyCode === 8) {
                dispatch(removeTodo(todo));
                focusOnTodoWithIndex(i - 1);
              } else if (e.target.value !== '' && e.keyCode === 13) {
                dispatch(newTodo({ after: todo }));
              } else if (e.keyCode === 27) {
                e.target.blur();
              } else if (e.keyCode === 38) {
                focusOnTodoWithIndex(i - 1);
              } else if (e.keyCode === 40) {
                focusOnTodoWithIndex(i + 1);
              } else if (
                (!e.metaKey && e.keyCode === 37) ||
                (e.metaKey && e.keyCode === 219)
              ) {
                dispatch(updateTodoIdent({ id: todo.id, by: -1 }));
              } else if (
                (!e.metaKey && e.keyCode === 39) ||
                (e.metaKey && e.keyCode === 221)
              ) {
                dispatch(updateTodoIdent({ id: todo.id, by: 1 }));
              }
            }}
          />
        </Stack.Row>
      ))}
      <div className={styles.actions}>
        <button onClick={() => dispatch(newTodo())}>new task</button>
      </div>
    </Stack.Column>
  );
}

function focusOnTodoWithIndex(index) {
  const el = document.getElementById(`todo-text-${index}`);
  el && el.focus();
}
