import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Emoji from 'components/Emoji';
import Stack from 'components/Stack';
import styles from './styles.module.css';
import { updateTaskTitle } from 'modules/task';

export default function TaskTitle() {
  const [editing, setEditing] = React.useState(false);
  const task = useSelector(store => store.task);
  const dispatch = useDispatch();

  return (
    <Stack.Row gap="s" align="start" onDoubleClick={() => setEditing(true)}>
      <Emoji emoji="🎯" size="xxl" />
      {editing ? (
        <input
          autoFocus={true}
          type="text"
          defaultValue={task.title}
          onKeyDown={e => {
            if (e.keyCode === 27) {
              setEditing(false);
            } else if (e.target.value !== '' && e.keyCode === 13) {
              dispatch(updateTaskTitle(e.target.value));
              setEditing(false);
            }
          }}
        />
      ) : (
        <Stack.Expand className={styles.title}>{task.title}</Stack.Expand>
      )}
    </Stack.Row>
  );
}
