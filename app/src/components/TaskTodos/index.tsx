import React from 'react';
import Emoji from 'components/Emoji';
import Stack from 'components/Stack';
import styles from './styles.module.css';
import InputTextarea from 'components/InputTextarea';
import keyCodes from 'utils/keyCodes';
import focusOn from 'utils/focusOn';
import useSelector from 'hooks/useSelector';
import useDispatch from 'hooks/useDispatch';
import Sortable from 'components/Sortable';

import {
  getTodos,
  newTodo,
  pasteTasks,
  toggleTodo,
  updateTodoIdent,
  updateTodoText,
  removeTodo,
  moveTodo,
  removeTodoAutoFocus,
} from 'modules/task';

export default function TaskTodos() {
  const todos = useSelector(getTodos);
  const dispatch = useDispatch();

  return (
    <Stack.Column>
      <Sortable.List
        useDragHandle={true}
        onSort={({ oldIndex, newIndex }: any) =>
          dispatch(
            moveTodo({
              id: todos[oldIndex]!.id,
              by: newIndex - oldIndex,
            }),
          )
        }>
        {todos
          .filter(todo => !!todo)
          .map((todo, i) => (
            <Sortable.Item
              index={i}
              align="start"
              as={Stack.Row}
              key={todo.id}
              style={{ paddingLeft: 20 * (todo.ident || 0) }}>
              <Sortable.Handle className={styles.handle} />
              <div className={styles.box}>
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
              </div>
              <InputTextarea
                className={todo.isCompleted ? styles.completed : undefined}
                id={`todo-text-${i}`}
                autoFocus={!!todo.autoFocus}
                multiline={false}
                value={todo.text}
                placeholder="..."
                onChange={e =>
                  dispatch(
                    updateTodoText({
                      id: todo.id,
                      text: e.target.value,
                    }),
                  )
                }
                onPaste={e => {
                  const clipboard = e.clipboardData.getData('Text');

                  if (clipboard.indexOf('\n') === -1) {
                    return;
                  }

                  e.preventDefault();

                  dispatch(pasteTasks({ id: todo.id, clipboard }));
                }}
                onKeyDown={e => {
                  if (
                    e.target.value === '' &&
                    e.keyCode === keyCodes.backspace
                  ) {
                    dispatch(removeTodo(todo));
                    focusOnTodoWithIndex(i - 1);
                  } else if (e.keyCode === keyCodes.enter) {
                    e.preventDefault();
                    dispatch(newTodo({ after: todo }));
                  } else if (e.keyCode === keyCodes.esc) {
                    e.target.blur();
                  } else if (!e.metaKey && e.keyCode === keyCodes.up) {
                    focusOnTodoWithIndex(i - 1);
                  } else if (!e.metaKey && e.keyCode === keyCodes.down) {
                    focusOnTodoWithIndex(i + 1);
                  } else if (e.metaKey && e.keyCode === keyCodes.up) {
                    dispatch(moveTodo({ id: todo.id, by: -1 }));
                  } else if (e.metaKey && e.keyCode === keyCodes.down) {
                    dispatch(moveTodo({ id: todo.id, by: +1 }));
                  } else if (e.metaKey && e.keyCode === keyCodes['[']) {
                    dispatch(updateTodoIdent({ id: todo.id, by: -1 }));
                  } else if (e.metaKey && e.keyCode === keyCodes[']']) {
                    dispatch(updateTodoIdent({ id: todo.id, by: 1 }));
                  } else if (
                    e.metaKey &&
                    e.shiftKey &&
                    e.keyCode === keyCodes.c
                  ) {
                    dispatch(toggleTodo(todo));
                  }
                }}
                onBlur={() => dispatch(removeTodoAutoFocus(todo))}
              />
            </Sortable.Item>
          ))}
      </Sortable.List>
      <div className={styles.actions}>
        <button onClick={() => dispatch(newTodo())}>new task</button>
      </div>
    </Stack.Column>
  );
}

function focusOnTodoWithIndex(index: number) {
  focusOn(`todo-text-${index}`);
}
